namespace ReservationsBackend.Models
{
    public class Hotel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Address { get; set; }
        public required string PostalCode { get; set; }
        public int Phone { get; set; }
        public required string Email { get; set; }
        public bool Status { get; set; }
        public required List<Reservation> Reservations { get; set; }

    }
}
