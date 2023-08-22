namespace ReservationsBackend.DTOs
{
    public class UserResponseDTO
    {
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        public string Token { get; set; }
    }
}
