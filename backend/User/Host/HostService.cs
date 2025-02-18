
public class HostService : IHostService
{
    private readonly IHostRepository _hostRepository;
    public HostService(IHostRepository hostRepository)
    {
        _hostRepository = hostRepository;
    }

    public Task<Boolean> HostExists(string id)
    {
        return _hostRepository.HostExists(id);
    }
}