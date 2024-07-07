using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using TicketManager.Infrastructure.Persistence.Constants;
using TicketManager.Domain.Aggregates.Users;
using TicketManager.Domain.Aggregates.Users.ValueObjects;
using TicketManager.Domain.Aggregates.Users.Enums;

namespace TicketManager.Infrastructure.Persistence.Configurations
{
    public sealed class UserConfigurations : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .ToTable(TableNames.Users);

            builder
                .HasKey(u => u.Id);

            builder
                .Property(u => u.Id)
                .ValueGeneratedNever()
                .HasConversion(
                    id => id.Value,
                    value => UserId.Create(value));

            builder
                .Property(u => u.FirstName)
                .HasMaxLength(50);

            builder
                .Property(u => u.LastName)
                .HasMaxLength(50);

            builder
                .Property(u => u.Email)
                .HasMaxLength(128);

            builder
                .Property(u => u.Password);

            builder
                .Property(u => u.Role)
                .HasConversion(
                v => v.ToString(),
                v => (UserRole)Enum.Parse(typeof(UserRole), v));
        }
    }
}
