public interface IHostRepository
{
    Task<Boolean> HostExists(string id);
}