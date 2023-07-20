namespace ReservationsBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public DateTime CreationDate { get; set; }
        public bool Status { get; set; }
        public required Client Client { get; set; }

    }
}
