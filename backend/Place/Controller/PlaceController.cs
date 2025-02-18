using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("/api/places")]
[ApiController]
public class PlaceController : ControllerBase
{
    private readonly IPlaceService _placeService;
    private readonly IHostService _hostService;
    public PlaceController(IPlaceService placeService, IHostService hostService)
    {
        _placeService = placeService;
        _hostService = hostService;
    }

    [HttpPost]
    [Authorize(Roles = "Host")]
    public async Task<IActionResult> Create([FromForm] CreatePlaceRequest createPlaceRequest)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var logged = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!await _hostService.HostExists(logged))
            return BadRequest("Host not found.");

        string imageName = await _placeService.SaveFile(createPlaceRequest.Image);

        var place = await _placeService.Create(createPlaceRequest, imageName, logged);
        if (place == null)
            return StatusCode(500, "Place not created.");

        return StatusCode(201, place);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int page, [FromQuery] int size)
    {
        return Ok(await _placeService.GetAll(page, size));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdProtected([FromRoute] int id)
    {
        var place = await _placeService.GetByIdProtected(id);
        if (place == null)
            return NotFound("Place not found.");
        return Ok(place);
    }

    [HttpGet("type/{placeType}")]
    public async Task<IActionResult> GetByPlace([FromRoute] int placeType, [FromQuery] int page, [FromQuery] int size) {
        return Ok(await _placeService.GetByType(placeType, page, size));
    }


    [HttpGet("host")]
    [Authorize(Roles = "Host")]
    public async Task<IActionResult> GetByHost()
    {
        var logged = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!await _hostService.HostExists(logged))
            return BadRequest("Host not found.");
        return Ok(await _placeService.GetByHost(logged));
    }

    [HttpGet("search")]
    public async Task<IActionResult> FilterBy(
    [FromQuery] string? country,
    [FromQuery] string? city,
    [FromQuery] int? guestNumber,
    [FromQuery] double? pricePerNight,
    [FromQuery] string? checkIn,
    [FromQuery] string? checkOut)
    {
        DateTime? checkInDate = null;
        DateTime? checkOutDate = null;

        if (!string.IsNullOrEmpty(checkIn))
            checkInDate = DateTime.Parse(checkIn);

        if (!string.IsNullOrEmpty(checkOut))
            checkOutDate = DateTime.Parse(checkOut);

        var placeDtos = await _placeService.FilterBy(country, city, guestNumber, pricePerNight, checkInDate, checkOutDate);
        return Ok(placeDtos);
    }

}