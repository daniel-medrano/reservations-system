using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ReservationsBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly DataContext _context;

        public ClientsController(DataContext context) 
        {
            _context = context;
        }


        [HttpGet]
        
       /*public async Task<ActionResult<List<Client>>> GetAllClients(string query = "") 
        {
            // Searching
            var result = await _context.Clients
                .Where(client =>
                    client.Id.ToString().Contains(query))
            .ToListAsync();

            return Ok(result);
        }*/
        
        
        [HttpPost]
        public async Task<ActionResult<List<Client>>> CreateClient(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return Ok(client);
        }

        [HttpPut]
        //Check this one
        public async Task<ActionResult<List<Client>>> UpdateClient(Client updatedClient)
        {
            var client = await _context.Clients
                .Include(client => client.FirstName)
                .Include(client => client.LastName)
                .FirstOrDefaultAsync(c => c.Id == updatedClient.Id);
            if (client is null)
                return NotFound("Client not found");
            client.Phone = updatedClient.Phone;
            client.Email = updatedClient.Email;
            await _context.SaveChangesAsync();
            return Ok(client);
        }

        
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Client>>> DeleteClient(int id) 
        {
            var client = await _context.Clients.FindAsync(id);
            if (client is null)
                return NotFound("Client not found. ");
            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
