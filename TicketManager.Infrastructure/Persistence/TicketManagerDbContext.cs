using Microsoft.EntityFrameworkCore;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Aggregates.Users;

namespace TicketManager.Infrastructure.Persistence
{
    public class TicketManagerDbContext : DbContext
    {

        public TicketManagerDbContext(DbContextOptions<TicketManagerDbContext> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(TicketManagerDbContext).Assembly);


            base.OnModelCreating(modelBuilder);
        }
    }
}
