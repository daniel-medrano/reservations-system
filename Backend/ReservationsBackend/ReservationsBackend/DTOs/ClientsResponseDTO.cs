namespace ReservationsBackend.DTOs
{
    public class ClientsResponseDTO
    {
        public List<ClientDTO> Clients { get; set; }
        public int TotalCount { get; set; }
    }
}
