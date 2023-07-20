namespace ReservationsBackend.Models
{
    public class Review
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public required Rating Rating { get; set; }
        public required RoomType RoomType { get; set; }
    }
}
