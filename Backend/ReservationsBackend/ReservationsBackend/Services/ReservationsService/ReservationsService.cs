namespace ReservationsBackend.Services.ReservationsService
{
    public class ReservationsService : IReservationsService
    {
        private readonly DataContext _context;
        public ReservationsService(DataContext context) 
        {
            _context = context;
        }
        public async Task<List<Reservation>> CreateReservation(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return await _context.Reservations
                .Include(c => c.Hotel)
                .Include(c => c.Client)
                .Include(c => c.Room)
                .ToListAsync();
        }

        public async Task<List<Reservation>?> DeleteReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation is null)
                return null;
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return await _context.Reservations
                .Include(c => c.Hotel)
                .Include(c => c.Client)
                .Include(c => c.Room)
                .ToListAsync();
        }

        public async Task<List<Reservation>> GetAllReservations()
        {
            var reservations = await _context.Reservations
                .Include(c => c.Hotel)
                .Include(c => c.Client)
                .Include(c => c.Room)
                .ToListAsync();
            return reservations;
        }

        public async Task<Reservation?> GetSingleReservation(int id)
        {
            var reservation = await _context.Reservations
                .Include(c => c.Hotel)
                .Include(c => c.Client)
                .Include(c => c.Room)
                .FirstOrDefaultAsync(reservation => reservation.Id == id);
            if (reservation is null)
                return null;
            return reservation;

        }

        public async Task<List<Reservation>?> UpdateReservation(int id, Reservation updatedReservation)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation is null)
                return null;
            reservation.CheckInDate = updatedReservation.CheckInDate;
            reservation.CheckOutDate = updatedReservation.CheckOutDate;
            reservation.AmountAdults = updatedReservation.AmountAdults;
            reservation.AmountChildren = updatedReservation.AmountChildren;
            reservation.Notes = updatedReservation.Notes;
            reservation.Status = updatedReservation.Status;
            await _context.SaveChangesAsync();
            return await _context.Reservations
                .Include(c => c.Hotel)
                .Include(c => c.Client)
                .Include(c => c.Room)
                .ToListAsync();
        }
    }
}
