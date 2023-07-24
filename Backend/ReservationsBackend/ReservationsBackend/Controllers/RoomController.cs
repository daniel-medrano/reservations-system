using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ReservationsBackend.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly DataContext _context;

        public RoomController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]  
        public async Task<ActionResult<List<Room>>> GetAllRooms(string query = "", string sortBy = "", int page = 1, int pageSize = 10)
        {

            var result = _context.Rooms
                .Where(room =>
                    room.Id.ToString().Contains(query));

            switch (sortBy)
            {
                case "creationDateAsc":
                    result = result.OrderBy(room => room.CreationDate);
                    break;
                case "creationDateDesc":
                    result = result.OrderByDescending(room => room.CreationDate);
                    break;
                default:
                    result = result.OrderBy(room => room.Id);
                    break;
            }

            result = result.Skip((page - 1) * pageSize).Take(pageSize);
            var rooms = await result.ToListAsync();
            return Ok(result);

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetSingleRooms(int id)
        {
            if (_context.Rooms == null)
            {
                return NotFound();
            }
            var rooms = await _context.Rooms
                .Include(rooms => rooms.Number)
                .Include(rooms => rooms.Status)
                .Include(rooms => rooms.RoomType)

                .FirstOrDefaultAsync(room => room.Id == id);

            if (rooms is null)
            return NotFound("Room not found. ");
            return Ok(rooms);


        }

        [HttpPut]
        public async Task<ActionResult<List<Room>>> UpdateRoom(Room updatedRoom)
        {

            var room = await _context.Rooms
                .Include(room => room.Number)
                .FirstOrDefaultAsync(r => r.Id == updatedRoom.Id);
            if (room is null)
                return NotFound("Room not found.");
            room.Status = updatedRoom.Status;
            await _context.SaveChangesAsync();
            return Ok(room);

        }

        [HttpPost]
        public async Task<ActionResult<Room>> CreateRoom(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
            return Ok(room);
        }

        // DELETE:
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)

            return NotFound("Room not found. ");
            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool RoomsExists(int id)
        {
            return (_context.Rooms?.Any(e => e.Id == id)).GetValueOrDefault();
        }


    }
}

/*
 
 
 */