

using Microsoft.EntityFrameworkCore;

public class ReservationRepository : IReservationRepository
{
    private readonly ApplicationDbContext _context;

    public ReservationRepository(ApplicationDbContext applicationDbContext)
    {
        _context = applicationDbContext;
    }

    public async Task<Reservation> Create(Reservation reservation)
    {
        await _context.Reservations.AddAsync(reservation);
        await _context.SaveChangesAsync();
        return reservation;
    }

    public async Task<Reservation?> Delete(int id)
    {
        var reservation = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id);
        if (reservation == null)
            return null;
        _context.Reservations.Remove(reservation);
        await _context.SaveChangesAsync();
        return reservation;
    }

    public async Task<List<Reservation>> GetByGuest(string id, int page, int size)
    {
        var skipNumber = (page - 1) * size;
        return await _context.Reservations
                .Where(r => r.GuestId == id)
                .Include(p => p.Place)
                .Include(r => r.Guest)
                .OrderByDescending(r => r.CheckInDate)
                .Skip(skipNumber).Take(size)
                .ToListAsync();
    }

    public async Task<List<Reservation>> GetByHost(string id, int page, int size)
    {
        var skipNumber = (page - 1) * size;
        return await _context.Reservations
                .Where(r => r.Place.HostId == id)
                .Include(r => r.Place)
                .Include(r => r.Guest)
                .OrderByDescending(r => r.CheckInDate)
                .Skip(skipNumber).Take(size)
                .ToListAsync();
    }

    public async Task<Reservation?> GetById(int id)
    {
        return await _context.Reservations.FindAsync(id);
    }

    public async Task<List<Reservation>> GetByPlaceAndDateBetween(int id, DateTime startDate, DateTime endDate)
    {
        return await _context.Reservations
            .Where(r => r.PlaceId == id &&
               r.CheckInDate.Date < endDate.Date &&
               r.CheckOutDate.Date > startDate.Date)
            .ToListAsync();
    }

    public async Task<List<Reservation>> GetByPlaceAndDateGreaterThan(int id, DateTime startDate)
    {
        return await _context.Reservations
            .Where(r => r.PlaceId == id && r.CheckInDate.Date > startDate.Date)
            .ToListAsync();
    }
}