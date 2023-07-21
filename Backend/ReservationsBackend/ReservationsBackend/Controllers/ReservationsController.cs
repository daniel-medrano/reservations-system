using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;
using ReservationsBackend.Models;

namespace ReservationsBackend.Controllers
{
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
        public async Task<ActionResult<List<Reservation>>> GetAllReservations(string query="", string sortBy="", int page=1, int pageSize=10)
        { 
            // Searching
            var result = _context.Reservations
                .Include(reservation => reservation.Hotel)
                .Include(reservation => reservation.Client)
                .Include(reservation => reservation.Room)
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
            result = result.Skip((page - 1) * pageSize).Take(pageSize);

            var reservations = await result.ToListAsync();
            return Ok(reservations);
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
        public async Task<ActionResult<List<Reservation>>> CreateReservation(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return Ok(reservation);
        }
        [HttpPut]
        public async Task<ActionResult<List<Reservation>>> UpdateReservation(Reservation updatedReservation)
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
