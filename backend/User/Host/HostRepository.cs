
using Microsoft.EntityFrameworkCore;

public class HostRepository : IHostRepository
{
    private readonly ApplicationDbContext _context;
    public HostRepository(ApplicationDbContext applicationDbContext)
    {
        _context = applicationDbContext;
    }

    public async Task<Boolean> HostExists(string id)
    {
        return await _context.Hosts.AnyAsync(h => h.Id == id);
    }
}