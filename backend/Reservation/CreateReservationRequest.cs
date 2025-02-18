using System.ComponentModel.DataAnnotations;

public class CreateReservationRequest
{
    [Required]
    public int GuestNumber { get; set; }
    [Required]
    public DateTime CheckInDate { get; set; }
    [Required]
    public DateTime CheckOutDate { get; set; }
    [Required]
    public int PlaceId { get; set; }
}