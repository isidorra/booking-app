public interface ITokenService
{
    string CreateToken(AppUser appUser, string role);
}