namespace ReservationsBackend.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime CheckOutDate { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public int AmountAdults { get; set; }
        public int AmountChildren { get; set; }
        public string? Notes { get; set; }
        public bool Status { get; set; }
        public int HotelId { get; set; }
        public Hotel? Hotel { get; set; }
        public int ClientId { get; set; }
        public Client? Client { get; set; }
        public int RoomId { get; set; }
        public Room? Room { get; set; }
    }
}
