using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;
using ReservationsBackend.Services.ReservationsService;

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
        public async Task<ActionResult<List<Reservation>>> GetAllReservations()
        {
            var reservations = await _context.Reservations
                .Include(c => c.Hotel)
                .Include(c => c.Client)
                .Include(c => c.Room)
                .ToListAsync();
            return reservations;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetSingleReservation(int id)
        {
            var reservation = await _context.Reservations
                .Include(c => c.Hotel)
                .Include(c => c.Client)
                .Include(c => c.Room)
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
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Reservation>>> UpdateReservation(int id, Reservation updatedReservation)
        {
            var reservation = await _context.Reservations
                .Include(c => c.Hotel)
                .Include(c => c.Client)
                .Include(c => c.Room)
                .FirstOrDefaultAsync(reservation => reservation.Id == id);
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
