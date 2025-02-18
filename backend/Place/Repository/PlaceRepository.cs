
using Microsoft.EntityFrameworkCore;

public class PlaceRepository : IPlaceRepository
{
    private readonly ApplicationDbContext _context;
    public PlaceRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Count()
    {
        return await _context.Places.CountAsync();
    }

    public async Task<Place> Create(Place place)
    {
        await _context.Places.AddAsync(place);
        await _context.SaveChangesAsync();
        return place;
    }

    public async Task<List<Place>> FilterBy(string? country, string? city, int? guestNumber, double? pricePerNight)
    {
        var query = _context.Places.AsQueryable();
        if (!string.IsNullOrEmpty(country))
            query = query.Where(p => p.Country == country);

        if (!string.IsNullOrEmpty(city))
            query = query.Where(p => p.City == city);

        if (guestNumber.HasValue)
            query = query.Where(p => p.MaxGuestNumber >= guestNumber.Value);

        if (pricePerNight.HasValue)
            query = query.Where(p => p.PricePerNight <= pricePerNight.Value);

        return await query.ToListAsync();
    }


    public async Task<List<PlaceDto>> GetAll(int page, int size)
    {
        var skipNumber = (page - 1) * size; //page = 1, size = 10 -> skipNumber = (1 - 1) * 10 = 0 (start from the first record)
        return await _context.Places
            .Include(p => p.Host)
            .Select(p => new PlaceDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Type = p.Type,
                City = p.City,
                Country = p.Country,
                Lat = p.Lat,
                Lng = p.Lng,
                MaxGuestNumber = p.MaxGuestNumber,
                BedroomNumber = p.BedroomNumber,
                BathroomNumber = p.BathroomNumber,
                PricePerNight = p.PricePerNight,
                IsActive = p.IsActive,
                IsPetFriendly = p.IsPetFriendly,
                HasWifi = p.HasWifi,
                Image = p.Image,
                CreatedAt = p.CreatedAt,
                Host = new UserDto
                {
                    Id = p.Host.Id,
                    FirstName = p.Host.FirstName,
                    LastName = p.Host.LastName
                }
            })
            .Skip(skipNumber)
            .Take(size)
            .ToListAsync();
    }

    public async Task<List<Place>> GetByCityAndCountry(string country, string city)
    {
        return await _context.Places
                .Where(p => p.Country == country && p.City == city)
                .ToListAsync();
    }

    public async Task<List<Place>> GetByCountry(string country)
    {
        return await _context.Places
                .Where(p => p.Country == country)
                .ToListAsync();
    }

    public async Task<List<Place>> GetByHost(string id)
    {
        return await _context.Places.Where(p => p.HostId == id).ToListAsync();
    }

    public async Task<Place> GetById(int id)
    {
        return await _context.Places.Include(p => p.Host).FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<List<Place>> GetByMaxGuestNumberLowerOrEqualThan(int maxGuestNumber)
    {
        return await _context.Places
                .Where(p => p.MaxGuestNumber <= maxGuestNumber)
                .ToListAsync();
    }

    public async Task<List<Place>> GetByPricePerNightLowerOrEqualThan(double pricePerNight)
    {
        return await _context.Places
                .Where(p => p.PricePerNight <= pricePerNight)
                .ToListAsync();
    }

    public async Task<List<Place>> GetByType(int placeType, int page, int size)
    {
        var skipNumber = (page - 1) * size;
        return await _context.Places.Where(p => p.Type == (PlaceType) placeType)
            .Skip(skipNumber)
            .Take(size)
            .ToListAsync();
    }
}