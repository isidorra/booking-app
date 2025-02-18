public interface IHostService 
{
    Task<Boolean> HostExists(string id);
}