public class PlaceDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public PlaceType Type { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public double Lat { get; set; }
    public double Lng { get; set; }
    public int MaxGuestNumber { get; set; }
    public int BedroomNumber { get; set; }
    public int BathroomNumber { get; set; }
    public double PricePerNight { get; set; }
    public Boolean IsActive { get; set; }
    public Boolean IsPetFriendly { get; set; }
    public Boolean HasWifi { get; set; }
    public string? Image { get; set; }
    public DateTime CreatedAt { get; set; }
    public UserDto Host { get; set; } = null!;
}