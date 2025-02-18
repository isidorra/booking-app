
public class ReservationService : IReservationService
{
    private readonly IReservationRepository _reservationRepository;
    private readonly IPlaceRepository _placeRepository;
    public ReservationService(IReservationRepository reservationRepository, IPlaceRepository placeRepository)
    {
        _reservationRepository = reservationRepository;
        _placeRepository = placeRepository;
    }
    public async Task<Reservation> Create(CreateReservationRequest createReservationRequest, string guestId)
    {
        Place place = await _placeRepository.GetById(createReservationRequest.PlaceId);
        Reservation reservation = new Reservation
        {
            CheckInDate = createReservationRequest.CheckInDate,
            CheckOutDate = createReservationRequest.CheckOutDate,
            GuestNumber = createReservationRequest.GuestNumber,
            GuestId = guestId,
            PlaceId = createReservationRequest.PlaceId,
            TotalPrice = place.PricePerNight * (createReservationRequest.CheckOutDate.Date - createReservationRequest.CheckInDate.Date).Days
        };

        return await _reservationRepository.Create(reservation);
    }

    public async Task<Reservation?> Delete(int id)
    {
        return await _reservationRepository.Delete(id);
    }

    public async Task<List<ReservationDto>> GetByGuest(string id, int page, int size)
    {
        var reservations = await _reservationRepository.GetByGuest(id, page, size);
        List<ReservationDto> reservationDtos = new List<ReservationDto>();

        foreach(Reservation reservation in reservations) {
            ReservationDto reservationDto = new ReservationDto {
                Id = reservation.Id,
                GuestNumber = reservation.GuestNumber,
                CheckInDate = reservation.CheckInDate,
                CheckOutDate = reservation.CheckOutDate,
                TotalPrice = reservation.TotalPrice,
                Place = reservation.Place,
                Guest = new UserDto {
                    Id = reservation.Guest?.Id,
                    FirstName = reservation.Guest?.FirstName,
                    LastName = reservation.Guest?.LastName
                }
            };

            reservationDtos.Add(reservationDto);
        }

        return reservationDtos;

    }

    public async Task<List<ReservationDto>> GetByHost(string id, int page, int size)
    {
        var reservations = await _reservationRepository.GetByHost(id, page, size);
        List<ReservationDto> reservationDtos = new List<ReservationDto>();

        foreach(Reservation reservation in reservations) {
            ReservationDto reservationDto = new ReservationDto {
                Id = reservation.Id,
                GuestNumber = reservation.GuestNumber,
                CheckInDate = reservation.CheckInDate,
                CheckOutDate = reservation.CheckOutDate,
                TotalPrice = reservation.TotalPrice,
                Place = reservation.Place,
                Guest = new UserDto {
                    Id = reservation.Guest?.Id,
                    FirstName = reservation.Guest?.FirstName,
                    LastName = reservation.Guest?.LastName
                }
            };

            reservationDtos.Add(reservationDto);
        }

        return reservationDtos;
    }

    public async Task<Reservation?> GetById(int id)
    {
        return await _reservationRepository.GetById(id);
    }

    public async Task<List<Reservation>> GetOverlappingReservations(int placeId, DateTime startDate, DateTime endDate)
    {
        return await _reservationRepository.GetByPlaceAndDateBetween(placeId, startDate, endDate);
    }

    public async Task<List<DateTime>> GetReservedDatesByPlace(int placeId)
    {
        var reservations = await _reservationRepository.GetByPlaceAndDateGreaterThan(placeId, DateTime.Now);
        HashSet<DateTime> dates = new HashSet<DateTime>();

        foreach (Reservation r in reservations) 
        {
            for (DateTime dateTime = r.CheckInDate.Date; dateTime <= r.CheckOutDate.Date; dateTime = dateTime.AddDays(1))
            {
                dates.Add(dateTime);
            }
        }

        return dates.ToList();
    }

}