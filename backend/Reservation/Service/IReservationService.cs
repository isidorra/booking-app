public interface IReservationService
{
    Task<Reservation> Create(CreateReservationRequest createReservationRequest, string guestId);
    Task<List<ReservationDto>> GetByGuest(string id, int page, int size);
    Task<List<ReservationDto>> GetByHost(string id, int page, int size);
    Task<List<Reservation>> GetOverlappingReservations(int placeId, DateTime startDate, DateTime endDate);
    Task<List<DateTime>> GetReservedDatesByPlace(int placeId);
    Task<Reservation?> Delete(int id);
    Task<Reservation?> GetById(int id);
}