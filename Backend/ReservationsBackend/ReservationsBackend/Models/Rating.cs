namespace ReservationsBackend.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public int Value { get; set; }
        public required string Description { get; set; }
        public required List<Review> Reviews { get; set; }
    }
}
