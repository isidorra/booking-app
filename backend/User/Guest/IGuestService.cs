public interface IGuestService
{
    Task<Boolean> GuestExists(string id);
}