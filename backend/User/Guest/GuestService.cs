
public class GuestService : IGuestService
{
    private readonly IGuestRepository _guestRepository;

    public GuestService(IGuestRepository guestRepository)
    {
        _guestRepository = guestRepository;
    }

    public async Task<bool> GuestExists(string id)
    {
        return await _guestRepository.GuestExists(id);
    }
}