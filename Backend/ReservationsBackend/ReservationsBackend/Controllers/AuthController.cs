using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReservationsBackend.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ReservationsBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DataContext _context;

        public AuthController(IConfiguration configuration, DataContext context) 
        {
            _configuration = configuration;
            _context = context;
        }
        [HttpPost("sign-up")]
        public async Task<ActionResult<User>> SignUp(UserDTO userDTO)
        {
            if (_context.Users.Any(user => user.Email == userDTO.Email))
            {
                return Conflict("Email already exists.");
            }

            byte[][] passwordData = CreatePasswordHash(userDTO.Password);

            Role? role = await _context.Roles.FirstOrDefaultAsync(role => role.Name == "Client");
            
            User user = new User
            {
                Email = userDTO.Email,
                PasswordHash = passwordData[0],
                PasswordSalt = passwordData[1],
                Roles = new List<Role> { role }
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);

        }

        [HttpPost("sign-in")]
        public async Task<ActionResult<string>> SignIn(UserDTO userDTO)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(user => user.Email == userDTO.Email);

            if (user == null || !VerifyPasswordHash(userDTO.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Incorrect email or password.");
            }
            string token = CreateToken(user);
            return Ok(token);
        }
        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Roles.FirstOrDefault()!.Name)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: credentials);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        private byte[][] CreatePasswordHash(string password)
        {
            byte[] passwordHash;
            byte[] passwordSalt;
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return new byte[][] { passwordHash, passwordSalt };
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
