public class Host : AppUser
{
    public ICollection<Place> Places { get; set; } = new List<Place>();
}