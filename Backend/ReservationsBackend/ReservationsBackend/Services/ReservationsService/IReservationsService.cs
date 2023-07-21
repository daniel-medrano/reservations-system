using ReservationsBackend.Models;

namespace ReservationsBackend.Services.ReservationsService
{
    public interface IReservationsService
    {
        Task<List<Reservation>> GetAllReservations();
        Task<Reservation?> GetSingleReservation(int id);
        Task<List<Reservation>> CreateReservation(Reservation reservation);
        Task<List<Reservation>?> UpdateReservation(int id, Reservation updatedReservation);
        Task<List<Reservation>?> DeleteReservation(int id);
    }
}
