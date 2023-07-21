using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationsBackend.Services.ReservationsService;

namespace ReservationsBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationsService _reservationsService;
        public ReservationsController(IReservationsService reservationsService)
        {
            _reservationsService = reservationsService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Reservation>>> GetAllReservations()
        {
            return await _reservationsService.GetAllReservations();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetSingleReservation(int id)
        {
            var result = await _reservationsService.GetSingleReservation(id);
            if (result is null)
                return NotFound("Reservation not found.");
            return Ok(result);
        }
        [HttpPost]
        public async Task<ActionResult<List<Reservation>>> CreateReservation(Reservation reservation)
        {
            var result = await _reservationsService.CreateReservation(reservation);
            return Ok(result);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Reservation>>> UpdateReservation(int id, Reservation updatedReservation)
        {
            var result = await _reservationsService.UpdateReservation(id, updatedReservation);
            if (result is null)
                return NotFound("Reservation not found.");
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Reservation>>> DeleteReservation(int id)
        {
            var result = await _reservationsService.DeleteReservation(id);
            if (result is null)
                return NotFound("Reservation not found.");
            return Ok(result);
        }
    }
}
