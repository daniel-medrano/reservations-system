namespace ReservationsBackend.Models
{
    public class RoomType
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public double Price { get; set; }
        public bool Status { get; set; }
        public List<Review> Reviews { get; set; }
    }
}
