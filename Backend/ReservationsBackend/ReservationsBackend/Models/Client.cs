namespace ReservationsBackend.Models
{
    public class Client
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public int Phone { get; set; }
        public DateTime CreationDate { get; set; }
        public string? Email { get; set; }//check if is important
        public int UserId { get; set; }
        public required User User { get; set; }
    }
}
