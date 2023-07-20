namespace ReservationsBackend.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime CheckOutDate { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CreationDate { get; set; }
        public int AmountAdults { get; set; }
        public int AmountChildren { get; set; }
        public string? Notes { get; set; }
        public bool Status { get; set; }
        public required Hotel Hotel { get; set; }
        public required Client Client { get; set; }
        public required Room Room { get; set; }
    }
}
