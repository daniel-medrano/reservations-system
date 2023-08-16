namespace ReservationsBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required byte[] PasswordHash { get; set; }
        public required byte[] PasswordSalt { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public bool Status { get; set; } = true;

    }
}
