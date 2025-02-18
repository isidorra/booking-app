public interface IPlaceRepository
{
    Task<Place> Create(Place place);
    Task<List<PlaceDto>> GetAll(int page, int size);
    Task<List<Place>> GetByHost(string id);
    Task<Place> GetById(int id);
    Task<List<Place>> GetByType(int placeType, int page, int size);
    Task<List<Place>> FilterBy(string? country, string? city, int? guestNumber, double? pricePerNight);
    Task<int> Count(); 

}