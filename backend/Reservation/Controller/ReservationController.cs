using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("/api/reservations")]
[ApiController]
public class ReservationController : ControllerBase
{
    private readonly IReservationService _reservationService;
    private readonly IPlaceService _placeService;
    private readonly IGuestService _guestService;
    private readonly IHostService _hostService;

    public ReservationController(IReservationService reservationService, IPlaceService placeService, IGuestService guestService, IHostService hostService)
    {
        _reservationService = reservationService;
        _placeService = placeService;
        _guestService = guestService;
        _hostService = hostService;
    }

    [HttpPost]
    [Authorize(Roles = "Guest")]
    public async Task<IActionResult> Create([FromBody] CreateReservationRequest createReservationRequest)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var logged = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!await _guestService.GuestExists(logged))
            return BadRequest("Guest not found.");

        var place = await _placeService.GetById(createReservationRequest.PlaceId);
        if (place == null)
            return BadRequest("Place not found.");

        if (createReservationRequest.CheckInDate.Date <= DateTime.UtcNow.Date ||
           createReservationRequest.CheckOutDate.Date <= DateTime.UtcNow.Date ||
           createReservationRequest.CheckOutDate <= createReservationRequest.CheckInDate)
            return BadRequest("Invalid date inputs.");

        var overlappingReservations = await _reservationService.GetOverlappingReservations(createReservationRequest.PlaceId, createReservationRequest.CheckInDate, createReservationRequest.CheckOutDate);
        if (overlappingReservations.Any()) 
            return BadRequest("Selected dates already reserved.");
            

        if (createReservationRequest.GuestNumber > place.MaxGuestNumber)
            return BadRequest("Invalid number of guests.");

        var created = await _reservationService.Create(createReservationRequest, logged);
        if (created == null)
            return BadRequest("Error creating reservation.");

        return StatusCode(201, created);
    }

    [HttpGet("guest")]
    [Authorize(Roles = "Guest")]
    public async Task<IActionResult> GetByGuest([FromQuery] int page, [FromQuery] int size)
    {
        var logged = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!await _guestService.GuestExists(logged))
            return BadRequest("Guest not found.");

        return Ok(await _reservationService.GetByGuest(logged, page, size));
    }

    [HttpGet("host")]
    [Authorize(Roles = "Host")]
    public async Task<IActionResult> GetByHost([FromQuery] int page, [FromQuery] int size) 
    {
        var logged = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!await _hostService.HostExists(logged))
            return BadRequest("Host not found.");

        return Ok(await _reservationService.GetByHost(logged, page, size));
    }
    
    [HttpGet("reserved-dates/{placeId}")]
    [Authorize(Roles = "Guest")]
    public async Task<IActionResult> GetReservedDates([FromRoute] int placeId)
    {
        var place = await _placeService.GetById(placeId);
        if (place == null)
            return BadRequest("Place not found.");

        return Ok(await _reservationService.GetReservedDatesByPlace(placeId));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Guest")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var reservation = await _reservationService.GetById(id);
        if (reservation == null)
            return NotFound("Reservation not found.");

        var logged = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!await _guestService.GuestExists(logged))
            return BadRequest("Guest not found.");

        if (reservation.GuestId != logged)
            return BadRequest("Invalid id.");

        if ((reservation.CheckInDate.Date - DateTime.Today).Days < 3 || reservation.CheckOutDate.Date < DateTime.Today)
            return BadRequest("Reservation cannot be deleted anymore.");

        await _reservationService.Delete(id);
        return Ok();



    }

}