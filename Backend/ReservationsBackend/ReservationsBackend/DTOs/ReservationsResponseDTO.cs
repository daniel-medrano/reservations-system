namespace ReservationsBackend.DTOs
{
    public class ReservationsResponseDTO
    {
        public List<Reservation> Reservations { get; set; }
        public int TotalCount { get; set; }
    }
}
