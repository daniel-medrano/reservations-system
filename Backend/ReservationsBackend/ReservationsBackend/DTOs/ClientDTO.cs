namespace ReservationsBackend.DTOs
{
    public class ClientDTO
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public int Phone { get; set; }
        public DateTime CreationDate { get; set; }
        public string Email { get; set; }
    }
}
