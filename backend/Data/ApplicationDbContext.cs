using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<AppUser>
{
    public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {

    }

    public DbSet<Guest> Guests { get; set; }
    public DbSet<Host> Hosts { get; set; }
    public DbSet<Place> Places { get; set; }
    public DbSet<Reservation> Reservations { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Guest>().ToTable("Guests");
        builder.Entity<Host>().ToTable("Hosts");
        builder.Entity<Place>().ToTable("Places");
        builder.Entity<Reservation>().ToTable("Reservations");

        base.OnModelCreating(builder);

        //Unique Email
        builder.Entity<AppUser>()
            .HasIndex(u => u.Email)
            .IsUnique();

        //Roles
        var adminRole = new IdentityRole
        {
            Id = "1",
            Name = "Admin",
            NormalizedName = "ADMIN"
        };

        var hostRole = new IdentityRole
        {
            Id = "2",
            Name = "Host",
            NormalizedName = "HOST"
        };

        var guestRole = new IdentityRole
        {
            Id = "3",
            Name = "Guest",
            NormalizedName = "GUEST"
        };

        builder.Entity<IdentityRole>().HasData(adminRole, hostRole, guestRole);


        //Admin
        var adminUser = new AppUser
        {
            Id = "1001",
            FirstName = "Admin",
            LastName = "Doe",
            UserName = "admin@example.com",
            Email = "admin@example.com",
        };

        var passwordHasher = new PasswordHasher<AppUser>();
        adminUser.PasswordHash = passwordHasher.HashPassword(adminUser, "Admin123.");

        builder.Entity<AppUser>().HasData(adminUser);

        var adminUserRole = new IdentityUserRole<string>
        {
            UserId = "1001",
            RoleId = "1"
        };

        builder.Entity<IdentityUserRole<string>>().HasData(adminUserRole);


        //Place
        builder.Entity<Place>()
        .HasOne(p => p.Host)
        .WithMany(h => h.Places)
        .HasForeignKey(p => p.HostId)
        .OnDelete(DeleteBehavior.Cascade);

        // Reservation-Place relationship with cascading delete
        builder.Entity<Reservation>()
            .HasOne(r => r.Place)
            .WithMany(p => p.Reservations)
            .HasForeignKey(r => r.PlaceId)
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete when a Place is deleted

        // Reservation-Guest relationship with cascading delete
        builder.Entity<Reservation>()
            .HasOne(r => r.Guest)
            .WithMany(g => g.Reservations)
            .HasForeignKey(r => r.GuestId)
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete when a Guest is deleted




    }
}