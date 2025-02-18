using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("/api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ApplicationDbContext _context;

    public AuthController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
        _context = context;
    }




    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var isEmailTaken = await _userManager.Users.AnyAsync(x => x.Email == registerRequest.Email);
            if (isEmailTaken) return BadRequest("Email is taken.");

            AppUser appUser;

            if (registerRequest.Role == "Guest")
            {
                appUser = new Guest
                {
                    FirstName = registerRequest.FirstName,
                    LastName = registerRequest.LastName,
                    Email = registerRequest.Email,
                    UserName = registerRequest.Email
                };
            }
            else if (registerRequest.Role == "Host")
            {
                appUser = new Host
                {
                    FirstName = registerRequest.FirstName,
                    LastName = registerRequest.LastName,
                    Email = registerRequest.Email,
                    UserName = registerRequest.Email
                };
            }
            else
            {
                return BadRequest("Invalid role input.");
            }

            var createdUser = await _userManager.CreateAsync(appUser, registerRequest.Password);
            if (!createdUser.Succeeded) return StatusCode(500, createdUser.Errors);

            var roleResult = await _userManager.AddToRoleAsync(appUser, registerRequest.Role);
            if (!roleResult.Succeeded) return StatusCode(500, roleResult.Errors);

            var roles = await _userManager.GetRolesAsync(appUser);
            return Ok(new AuthResponse
            {
                FirstName = appUser.FirstName,
                LastName = appUser.LastName,
                Id = appUser.Id,
                Role = roles.FirstOrDefault(),
                Token = _tokenService.CreateToken(appUser, roles.FirstOrDefault())
            });
        }
        catch (Exception e)
        {
            return StatusCode(500, e);
        }
    }




    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginRequest.Email);
        if (user == null)
            return Unauthorized("Invalid credentials.");

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);
        if (!result.Succeeded)
            return Unauthorized("Invalid credentials.");

        var roles = await _userManager.GetRolesAsync(user);

        return Ok(
            new AuthResponse
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Id = user.Id,
                Role = roles.FirstOrDefault(),
                Token = _tokenService.CreateToken(user, roles.FirstOrDefault())
            }
        );
    }

}