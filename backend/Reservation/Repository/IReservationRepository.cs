public interface IReservationRepository 
{
    Task<Reservation> Create(Reservation reservation);
    Task<Reservation?> GetById(int id);
    Task<List<Reservation>> GetByGuest(string id, int page, int size);
    Task<List<Reservation>> GetByHost(string id, int page, int size);
    Task<List<Reservation>> GetByPlaceAndDateBetween(int id, DateTime startDate, DateTime endDate);
    Task<List<Reservation>> GetByPlaceAndDateGreaterThan(int id, DateTime startDate);
    Task<Reservation?> Delete(int id);
}