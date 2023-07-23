using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationsBackend.Data;
using ReservationsBackend.Models;

namespace ReservationsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly DataContext _context;

        public HotelsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Hotels
        [HttpGet]
        public async Task<ActionResult<List<Hotel>>> GetHotels()
        {
          if (_context.Hotels == null)
          {
              return NotFound();
          }
            return await _context.Hotels.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetSingleHotel(int id)
        {
          if (_context.Hotels == null)
          {
              return NotFound();
          }
            var hotel = await _context.Hotels
                .Include(hotel => hotel.Name)
                .Include(hotel => hotel.Description)
                .Include(hotel => hotel.Address)
                .Include(hotel => hotel.PostalCode)
                //.Include(hotel => hotel.Email)
                .FirstOrDefaultAsync(hotel => hotel.Id == id);

            if (hotel is null)
            {
                return NotFound("Hotel not found. ");
            return Ok(hotel);
            }

        }

        [HttpPut]
        public async Task<ActionResult<List<Hotel>>> UpdateHotel(Hotel updatedHotel)
        {

            var hotel = await _context.Hotels
                .Include(Hotel => Hotel.Description)
                .Include(Hotel => Hotel.Address)
                .Include(Hotel => Hotel.Name)
                .FirstOrDefaultAsync(h => h.Id == updatedHotel.Id);
            if (hotel is null)
                return NotFound("Hotel not found.");
            hotel.Phone = updatedHotel.Phone;
            hotel.Status = updatedHotel.Status;
            await _context.SaveChangesAsync();
            return Ok(hotel);

        }

        [HttpPost]
        public async Task<ActionResult<Hotel>> CreateHotel(Hotel hotel)
        {
            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();
            return Ok(hotel);
        }

        // DELETE:
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null)
            
                return NotFound("Hotel not found. ");
                _context.Hotels.Remove(hotel);
                await _context.SaveChangesAsync();
                return NoContent();
        }

        private bool HotelExists(int id)
        {
            return (_context.Hotels?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
