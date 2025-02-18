

using Microsoft.IdentityModel.Tokens;

public class PlaceService : IPlaceService
{
    private readonly IPlaceRepository _placeRepository;
    private readonly IReservationRepository _reservationRepository;
    public PlaceService(IPlaceRepository placeRepository, IReservationRepository reservationRepository)
    {
        _placeRepository = placeRepository;
        _reservationRepository = reservationRepository;

    }
    public async Task<Place> Create(CreatePlaceRequest createPlaceRequest, string fileName, string hostId)
    {
        Place place = new Place
        {
            Name = createPlaceRequest.Name,
            Description = createPlaceRequest.Description,
            Type = createPlaceRequest.Type,
            Address = createPlaceRequest.Address,
            City = createPlaceRequest.City,
            Country = createPlaceRequest.Country,
            Lat = createPlaceRequest.Lat,
            Lng = createPlaceRequest.Lng,
            MaxGuestNumber = createPlaceRequest.MaxGuestNumber,
            BedroomNumber = createPlaceRequest.BedroomNumber,
            BathroomNumber = createPlaceRequest.BathroomNumber,
            PricePerNight = createPlaceRequest.PricePerNight,
            IsActive = true,
            IsPetFriendly = createPlaceRequest.IsPetFriendly,
            HasWifi = createPlaceRequest.HasWifi,
            Image = fileName,
            HostId = hostId,
            CreatedAt = DateTime.Now
        };

        return await _placeRepository.Create(place);
    }

    public async Task<List<PlaceDto>> FilterBy(
    string? country, string? city, int? guestNumber, double? pricePerNight,
    DateTime? checkIn, DateTime? checkOut)
    {
        List<Place> filteredPlaces = await _placeRepository.FilterBy(country, city, guestNumber, pricePerNight);
        List<PlaceDto> protectedPlaces = new List<PlaceDto>();

        foreach (Place place in filteredPlaces)
        {
            if (checkIn.HasValue && checkOut.HasValue)
            {
                var reservations = await _reservationRepository.GetByPlaceAndDateBetween(
                    place.Id, checkIn.Value, checkOut.Value);

                if (reservations.IsNullOrEmpty())
                    protectedPlaces.Add(await GetByIdProtected(place.Id));
            }
            else
            {
                protectedPlaces.Add(await GetByIdProtected(place.Id));
            }
        }

        return protectedPlaces;
    }


    public async Task<List<PlaceDto>> GetAll(int page, int size)
    {
        return await _placeRepository.GetAll(page, size);
    }


    public async Task<List<Place>> GetByHost(string id)
    {
        return await _placeRepository.GetByHost(id);
    }

    public async Task<Place> GetById(int id)
    {
        return await _placeRepository.GetById(id);
    }

    public async Task<PlaceDto> GetByIdProtected(int id)
    {
        var place = await _placeRepository.GetById(id);
        if (place == null)
            return null; // This prevents null reference exception

        var placeDto = new PlaceDto
        {
            Id = place.Id,
            Name = place.Name,
            Description = place.Description,
            Type = place.Type,
            City = place.City,
            Country = place.Country,
            Lat = place.Lat,
            Lng = place.Lng,
            MaxGuestNumber = place.MaxGuestNumber,
            BedroomNumber = place.BedroomNumber,
            BathroomNumber = place.BathroomNumber,
            PricePerNight = place.PricePerNight,
            IsActive = place.IsActive,
            IsPetFriendly = place.IsPetFriendly,
            HasWifi = place.HasWifi,
            Image = place.Image,
            CreatedAt = place.CreatedAt,
            Host = place.Host != null ? new UserDto
            {
                Id = place.Host.Id,
                FirstName = place.Host.FirstName,
                LastName = place.Host.LastName
            } : null
        };

        return placeDto;
    }

    public async Task<List<PlaceDto>> GetByType(int placeType, int page, int size)
    {
        var places = await _placeRepository.GetByType(placeType, page, size);
        var placeDtos = new List<PlaceDto>();
        foreach(Place place in places) {
            placeDtos.Add(await GetByIdProtected(place.Id));
        }

        return placeDtos;
    }

    public async Task<string> SaveFile(IFormFile imageFile)
    {
        if (imageFile == null || imageFile.Length == 0)
            throw new Exception("No image file uploaded.");

        var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
        if (!Directory.Exists(uploadDirectory))
        {
            Directory.CreateDirectory(uploadDirectory);
        }

        // Generate a unique file name (you can also use GUID or any other method)
        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(imageFile.FileName)}";
        var filePath = Path.Combine(uploadDirectory, fileName);

        // Save the file
        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            await imageFile.CopyToAsync(fileStream);
        }

        return fileName;
    }
}