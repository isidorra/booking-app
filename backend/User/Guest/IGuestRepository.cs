public interface IGuestRepository
{
    Task<Boolean> GuestExists(string id);
}