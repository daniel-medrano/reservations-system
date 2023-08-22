using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationsBackend.Data;
using ReservationsBackend.DTOs;
using ReservationsBackend.Models;

namespace ReservationsBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly DataContext _context;

        public HotelsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<HotelsResponseDTO>> GetAllHotels(string query = "", string sortBy = "", int page = 1, int pageSize = 10)
        {
            var result = _context.Hotels
                .Where(hotel =>
                    hotel.Name.Contains(query));

            switch (sortBy)
            {
                case "name":
                    result = result.OrderBy(hotel => hotel.Name);
                    break;
                case "-name":
                    result = result.OrderByDescending(hotel => hotel.Name);
                    break;
                default:
                    result = result.OrderBy(hotel => hotel.Id);
                    break;
            }

            result = result.Skip((page - 1) * pageSize).Take(pageSize);
            var hotels = await result.ToListAsync();

            var response = new HotelsResponseDTO
            {
                Hotels = hotels,
                TotalCount = _context.Hotels.Count()
            };
            return Ok(response);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetSingleHotel(int id)
        {
            var hotel = await _context.Hotels
                .FirstOrDefaultAsync(hotel => hotel.Id == id);

            if (hotel is null)
                return NotFound("Hotel not found.");
            return Ok(hotel);
        }

        [HttpPut]
        public async Task<ActionResult<List<Hotel>>> UpdateHotel(Hotel updatedHotel)
        {

            var hotel = await _context.Hotels
                .FirstOrDefaultAsync(h => h.Id == updatedHotel.Id);
            if (hotel is null)
                return NotFound("Hotel not found.");
            hotel.Name = updatedHotel.Name;
            hotel.Description = updatedHotel.Description;
            hotel.Address = updatedHotel.Address;
            hotel.Phone = updatedHotel.Phone;
            hotel.Email = updatedHotel.Email;
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
            return Ok();
        }

        private bool HotelExists(int id)
        {
            return (_context.Hotels?.Any(e => e.Id == id)).GetValueOrDefault();
        }


    }
}
        