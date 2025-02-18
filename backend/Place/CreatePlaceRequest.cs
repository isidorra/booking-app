using System.ComponentModel.DataAnnotations;

public class CreatePlaceRequest 
{
    [Required]
    public string? Name { get; set; }

    [Required]
    public string? Description { get; set; }

    [Required]
    public PlaceType Type { get; set; }

    [Required]
    public string? Address { get; set; }

    [Required]
    public string? City { get; set; }

    [Required]
    public string? Country { get; set; }

    [Required]
    public double Lat { get; set; }

    [Required]
    public double Lng { get; set; }

    [Required]
    [Range(1, 20, ErrorMessage = "Guest number must be between 1 and 20.")]
    public int MaxGuestNumber { get; set; }

    [Required]
    [Range(0, 100, ErrorMessage = "Bedroom number must be between 0 and 100.")]
    public int BedroomNumber { get; set; }

    [Required]
    [Range(0, 100, ErrorMessage = "Bathroom number must be between 0 and 100.")]

    public int BathroomNumber { get; set; }

    [Required]
    [Range(1, 10000, ErrorMessage = "Price per night must be between 1 and 10000.")]
    public double PricePerNight { get; set; }

    [Required]
    public Boolean IsPetFriendly { get; set; }

    [Required]
    public Boolean HasWifi { get; set; }

    [Required]
    public IFormFile? Image { get; set; }
    
}