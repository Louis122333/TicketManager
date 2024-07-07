using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Aggregates.Tickets.Enums;
using TicketManager.Infrastructure.Persistence.Constants;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Aggregates.Users.ValueObjects;

namespace TicketManager.Infrastructure.Persistence.Configurations
{
    public sealed class TicketConfigurations : IEntityTypeConfiguration<Ticket>
    {
        public void Configure(EntityTypeBuilder<Ticket> builder)
        {
            ConfigureTicketsTable(builder);
            ConfigureCommentsTable(builder);
        }

        private static void ConfigureTicketsTable(EntityTypeBuilder<Ticket> builder)
        {
            builder
                .ToTable(TableNames.Tickets);

            builder
                .HasKey(t => t.Id);

            builder
                .Property(t => t.Id)
                .ValueGeneratedNever()
                .HasConversion(
                    id => id.Value,
                    value => TicketId.Create(value));
            builder
                .OwnsOne(t => t.Number, nb =>
                {
                    nb.Property(n => n.Value)
                    .HasColumnName("ReferenceNumber")
                    .IsRequired();
                });

            builder
                .Property(t => t.Title)
                .HasMaxLength(50);

            builder
                .Property(t => t.Description)
                .HasMaxLength(200);

            builder
                .Property(t => t.Type)
                .HasConversion(
                v => v.ToString(),
                v => (TicketType)Enum.Parse(typeof(TicketType), v));

            builder
                .Property(t => t.Status)
                .HasConversion(
                v => v.ToString(),
                v => (TicketStatus)Enum.Parse(typeof(TicketStatus), v));

            builder
                .Property(t => t.Priority)
                .HasConversion(
                v => v.ToString(),
                v => (TicketPriority)Enum.Parse(typeof(TicketPriority), v));

            builder
               .Property(t => t.CreatedBy)
               .ValueGeneratedNever()
               .HasConversion(
                   id => id.Value,
                   value => UserId.Create(value));

            builder
            .Property(t => t.AssignedTo)
            .ValueGeneratedNever()
            .HasConversion(
                id => id.Value,
                value => UserId.Create(value));
        }
        private static void ConfigureCommentsTable(EntityTypeBuilder<Ticket> builder)
        {
            builder.OwnsMany(c => c.Comments, cb =>
            {
                cb.ToTable(TableNames.Comments);

                cb.WithOwner()
                .HasForeignKey("TicketId");

                cb.HasKey("Id", "TicketId");

                cb.Property(p => p.Id)
                .HasColumnName("CommentId")
                .ValueGeneratedNever()
                .HasConversion(
                    id => id.Value,
                    value => CommentId.Create(value));

                cb.Property(c => c.Text)
                .HasMaxLength(250);

                cb.Property(c => c.CreatedBy)
                .HasColumnName("CreatedBy")
                .ValueGeneratedNever()
                .HasConversion(
                    id => id.Value,
                    value => UserId.Create(value));

            });
        }
    }
}
