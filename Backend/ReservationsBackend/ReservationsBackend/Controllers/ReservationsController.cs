using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;
using ReservationsBackend.DTOs;
using ReservationsBackend.Models;

namespace ReservationsBackend.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly DataContext _context;
        public ReservationsController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<ReservationsResponseDTO>> GetAllReservations(string query="", string sortBy="", int pageIndex=1, int pageSize=10)
        { 
            // Searching
            var result = _context.Reservations
                .Include(reservation => reservation.Hotel)
                .Include(reservation => reservation.Client)
                .Include(reservation => reservation.Room)
                .ThenInclude(room => room.RoomType)
                .Where(reservation =>
                    reservation.Room!.RoomType.Name.Contains(query) ||
                    reservation.Room!.Number.ToString().Contains(query));
            // Sorting
            switch (sortBy)
            {
                case "-creationDate":
                    result = result.OrderByDescending(reservation => reservation.CreationDate);
                    break;
                case "checkinDate":
                    result = result.OrderBy(reservation => reservation.CheckInDate);
                    break;
                case "checkoutDate":
                    result = result.OrderBy(reservation => reservation.CheckOutDate);
                    break;
                default:
                    result = result.OrderBy(reservation => reservation.CreationDate);
                    break;
            }
            // Offset pagination.
            result = result.Skip((pageIndex - 1) * pageSize).Take(pageSize);

            var reservations = await result.ToListAsync();

            var response = new ReservationsResponseDTO
            {
                Reservations = reservations,
                TotalCount = _context.Reservations.Count()
            };

            return Ok(response);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetSingleReservation(int id)
        {
            var reservation = await _context.Reservations
                .Include(reservation => reservation.Hotel)
                .Include(reservation => reservation.Client)
                .Include(reservation => reservation.Room)
                .FirstOrDefaultAsync(reservation => reservation.Id == id);
            if (reservation is null)
                return NotFound("Reservation not found.");
            return Ok(reservation);
        }
        [HttpPost]
        public async Task<ActionResult<Reservation>> CreateReservation(ReservationDTO reservationRequest)
        {
            // TODO: Find available rooms according to room type.
            var newReservation = new Reservation
            {
                CheckOutDate = reservationRequest.CheckOutDate,
                CheckInDate = reservationRequest.CheckInDate,
                AmountAdults = reservationRequest.AmountAdults,
                AmountChildren = reservationRequest.AmountChildren,
                Notes = reservationRequest?.Notes,
                Status = reservationRequest.Status,
                HotelId = reservationRequest.HotelId,
                ClientId = reservationRequest.ClientId,
                RoomId = 1
            };
           _context.Reservations.Add(newReservation);
            await _context.SaveChangesAsync();
            return Ok(newReservation);
        }
        [HttpPut]
        public async Task<ActionResult<List<Reservation>>> UpdateReservation(ReservationDTO updatedReservation)
        {
            var reservation = await _context.Reservations
                .Include(reservation => reservation.Hotel)
                .Include(reservation => reservation.Client)
                .Include(reservation => reservation.Room)
                .FirstOrDefaultAsync(r => r.Id == updatedReservation.Id);
            if (reservation is null)
                return NotFound("Reservation not found.");
            reservation.CheckInDate = updatedReservation.CheckInDate;
            reservation.CheckOutDate = updatedReservation.CheckOutDate;
            reservation.AmountAdults = updatedReservation.AmountAdults;
            reservation.AmountChildren = updatedReservation.AmountChildren;
            reservation.Notes = updatedReservation.Notes;
            reservation.Status = updatedReservation.Status;
            reservation.ClientId = updatedReservation.ClientId;
            reservation.HotelId = updatedReservation.HotelId;
            await _context.SaveChangesAsync();
            return Ok(reservation);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Reservation>>> DeleteReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation is null)
                return NotFound("Reservation not found.");
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
