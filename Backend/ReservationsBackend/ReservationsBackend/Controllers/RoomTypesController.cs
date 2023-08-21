using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReservationsBackend.Models
{
    [Route("[controller]")]
    [ApiController]
    public class RoomTypesController : ControllerBase
    {

        private readonly DataContext _context;

        public RoomTypesController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<RoomType>>> GetAllRoomTypes(string query = "", string sortBy = "", int page = 1, int pageSize = 10)
        {

            var result = _context.RoomTypes 
                .Where(room_type =>
                    room_type.Id.ToString().Contains(query));

            switch (sortBy)
            {
                case "NameAsc":
                    result = result.OrderBy(room_type => room_type.Name);
                    break;
                case "NameDesc":
                    result = result.OrderByDescending(room_type => room_type.Name);
                    break;
                default:
                    result = result.OrderBy(room_type => room_type.Id);
                    break;
            }

            result = result.Skip((page - 1) * pageSize).Take(pageSize);
            var room_type = await result.ToListAsync();
            return Ok(result);

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<RoomType>> GetSingleRoomTypes(int id)
        {
            if (_context.RoomTypes == null)
            {
                return NotFound();
            }
            var room_type = await _context.RoomTypes
                .Include(room_type => room_type.Name)
                .Include(room_type => room_type.Description)
                .Include(room_type => room_type.Price) 
                .Include(room_type => room_type.Status)
                .FirstOrDefaultAsync(room_type => room_type.Id == id);

            if (room_type is null)
            return NotFound("Room type not found. ");
            return Ok(room_type);
            

        }

        [HttpPut]
        public async Task<ActionResult<List<RoomType>>> UpdateRoomTypes(RoomType updatedRoomTypes)
        {

            var room_type = await _context.RoomTypes
               .Include(room_type => room_type.Name)
               .FirstOrDefaultAsync(rt => rt.Id == updatedRoomTypes.Id);
            if (room_type is null)
                return NotFound("Room type not found.");
            room_type.Description = updatedRoomTypes.Description;
            room_type.Price = updatedRoomTypes.Price;
            room_type.Status = updatedRoomTypes.Status;
            await _context.SaveChangesAsync();
            return Ok(room_type);
        }

        [HttpPost]
        public async Task<ActionResult<RoomType>> CreateRoomType(RoomType room_type)
        {
            _context.RoomTypes.Add(room_type);
            await _context.SaveChangesAsync();
            return Ok(room_type);
        }

        // DELETE:
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomType(int id)
        {
            var room_type = await _context.RoomTypes.FindAsync(id);
            if (room_type == null)

                return NotFound("Room type not found. ");
            _context.RoomTypes.Remove(room_type);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool RoomTypesExists(int id)
        {
            return (_context.RoomTypes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    
    }

}

/*
        

*/