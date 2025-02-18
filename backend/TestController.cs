using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("/api/test")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Public()
    {
        return Ok("Hello from public route.");
    }

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public IActionResult AdminProtected()
    {
        var logged = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Ok(new { UserId = logged });
    }

    [HttpGet("guest")]
    [Authorize(Roles = "Guest")]
    public IActionResult GuestProtected()
    {
        var logged = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        return Ok(new { UserId = logged });
    }

    [HttpGet("host")]
    [Authorize(Roles = "Host")]
    public IActionResult HostProtected()
    {
        return Ok("Hello host");
    }

}