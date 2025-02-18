public class Guest : AppUser
{
    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}