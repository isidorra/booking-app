
using Microsoft.EntityFrameworkCore;

public class GuestRepository : IGuestRepository
{
    private readonly ApplicationDbContext _context;

    public GuestRepository(ApplicationDbContext applicationDbContext)
    {
        _context = applicationDbContext;
    }

    public async Task<Boolean> GuestExists(string id)
    {
        return await _context.Guests.AnyAsync(g => g.Id == id);
    }
}