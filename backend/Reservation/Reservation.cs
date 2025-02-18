public class Reservation
{
    public int Id { get; set; }
    public int GuestNumber { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public double TotalPrice { get; set; }
    public int PlaceId { get; set; }
    public Place? Place { get; set; }
    public string? GuestId { get; set; }
    public Guest? Guest { get; set; }
}