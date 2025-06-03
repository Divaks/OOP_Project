using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using CasinoBackend.Models;

namespace CasinoBackend.Data
{
    public class CasinoDbContext : IdentityDbContext<ApplicationUser>
    {
        public CasinoDbContext(DbContextOptions<CasinoDbContext> options) : base(options) { }

        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<GameSession> GameSessions { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure relationships
            builder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<GameSession>()
                .HasOne(g => g.User)
                .WithMany(u => u.GameSessions)
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure decimal precision
            builder.Entity<Transaction>()
                .Property(t => t.Amount)
                .HasColumnType("decimal(18,2)");

            builder.Entity<GameSession>()
                .Property(g => g.BetAmount)
                .HasColumnType("decimal(18,2)");

            builder.Entity<GameSession>()
                .Property(g => g.WinAmount)
                .HasColumnType("decimal(18,2)");

            builder.Entity<ApplicationUser>()
                .Property(u => u.Balance)
                .HasColumnType("decimal(18,2)");

            // Seed data
            builder.Entity<News>().HasData(
                new News
                {
                    Id = 1,
                    Title = "Welcome to Our Casino!",
                    Content = "We're excited to have you join our casino family. Enjoy your games and good luck!",
                    ImageUrl = "/images/welcome.jpg",
                    IsPublished = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new News
                {
                    Id = 2,
                    Title = "New Slot Machine Available",
                    Content = "Try our brand new slot machine with exciting bonus rounds and big jackpots!",
                    ImageUrl = "/images/new-slot.jpg",
                    IsPublished = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            );
        }
    }
}