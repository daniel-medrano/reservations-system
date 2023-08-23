namespace ReservationsBackend.Models
{
    public class Room
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public bool Status { get; set; }
        public DateTime CreationDate { get; set; }
        public required RoomType RoomType { get; set; }

    }
}
