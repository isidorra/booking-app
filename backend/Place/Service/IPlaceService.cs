public interface IPlaceService
{
    Task<Place> Create(CreatePlaceRequest createPlaceRequest, string fileName, string hostId);
    Task<List<PlaceDto>> GetAll(int page, int size);
    Task<string> SaveFile(IFormFile imageFile);
    Task<List<Place>> GetByHost(string id);
    Task<Place> GetById(int id);
    Task<List<PlaceDto>> GetByType(int placeType, int page, int size);
    Task<PlaceDto> GetByIdProtected(int id);
    Task<List<PlaceDto>> FilterBy(string? country, string? city, int? guestNumber, double? pricePerNight, DateTime? checkIn, DateTime? checkOut);
}