namespace ReservationsBackend.DTOs
{
    public class ReservationDTO
    {
        public int? Id { get; set; }
        public DateTime CheckOutDate { get; set; }
        public DateTime CheckInDate { get; set; }
        public int AmountAdults { get; set; }
        public int AmountChildren { get; set; }
        public string? Notes { get; set; }
        public bool Status { get; set; }
        public int HotelId { get; set; }
        public int ClientId { get; set; }
        public int RoomTypeId { get; set; }

    }
}
