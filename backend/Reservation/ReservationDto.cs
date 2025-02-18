public class ReservationDto 
{
    public int Id { get; set; }
    public int GuestNumber { get; set; }
    public DateTime CheckInDate { get; set; }
    public DateTime CheckOutDate { get; set; }
    public double TotalPrice { get; set; }
    public Place? Place { get; set; }
    public UserDto? Guest { get; set; }
}