﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing.Printing;

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
        
       public async Task<ActionResult<List<Client>>> GetAllClients(string query = "", string sortBy= "", int page = 1, int pageSize = 10) 
       {

            var result = _context.Clients
                .Where(client =>
                    client.Id.ToString().Contains(query));

            switch (sortBy)
            {
                case "creationDateAsc":
                    result = result.OrderBy(client => client.CreationDate);
                    break;
                case "creationDateDesc":
                    result = result.OrderByDescending(client => client.CreationDate);
                    break;
                default:
                    result = result.OrderBy(client => client.Id);
                    break;
            }

            result = result.Skip((page - 1) * pageSize).Take(pageSize);
            var clients = await result.ToListAsync();
            return Ok(result);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetSingleClient(int id)
        {
            if (_context.Clients == null)
            {
                return NotFound();
            }
            var clients = await _context.Clients
                .Include(clients => clients.FirstName)
                .Include(clients => clients.LastName)
                .Include(clients => clients.Email)
                .Include(clients => clients.Phone)

                .FirstOrDefaultAsync(client => client.Id == id);

            if (clients is null)
                return NotFound("Client not found. ");
            return Ok(clients);


        }

        [HttpPost]
        public async Task<ActionResult<List<Client>>> CreateClient(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return Ok(client);
        }

        [HttpPut]
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
