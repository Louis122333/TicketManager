using ErrorOr;
using TicketManager.Domain.Aggregates.Tickets.Entities;
using TicketManager.Domain.Aggregates.Tickets.Enums;
using TicketManager.Domain.Aggregates.Tickets.Validators;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Aggregates.Users.ValueObjects;
using TicketManager.Domain.Common.Models;

namespace TicketManager.Domain.Aggregates.Tickets
{
    public sealed class Ticket : AggregateRoot<TicketId, Guid>
    {
        public ReferenceNumber Number { get; private set; }
        public string Title { get; private set; }
        public string Description { get; private set; }
        public TicketType Type { get; private set; }
        public TicketStatus Status { get; private set; }
        public TicketPriority Priority { get; private set; }
        public DateTime CreatedDateTime { get; private set; }
        public DateTime UpdatedDateTime { get; private set; }
        public UserId CreatedBy { get; }
        public UserId? AssignedTo { get; private set; }

        private readonly List<Comment> _comments = new();
        public IReadOnlyList<Comment> Comments => _comments.AsReadOnly();


        private Ticket(
            TicketId ticketId,
            ReferenceNumber number,
            string title,
            string description,
            TicketType type,
            UserId createdBy,
            TicketStatus status,
            TicketPriority priority,
            DateTime createdDateTime,
            DateTime updatedDateTime) : base(ticketId)
        {
            Number = number;
            Title = title;
            Description = description;
            Type = type;
            CreatedBy = createdBy;
            Status = status;
            Priority = priority;
            CreatedDateTime = createdDateTime;
            UpdatedDateTime = updatedDateTime;
        }

        public static ErrorOr<Ticket> Create(
            ReferenceNumber number,
            string title,
            string description,
            TicketType type,
            UserId createdBy)
        {
            var errors = TicketValidator.Validate(title, description, createdBy.Value);

            if (errors.Count > 0)
            {
                return errors;
            }

            return new Ticket(
                TicketId.CreateUnique(),
                number,
                title,
                description,
                type,
                createdBy,
                TicketStatus.AwaitingApproval,
                TicketPriority.Low,
                DateTime.UtcNow,
                DateTime.UtcNow);
        }

        public ErrorOr<Ticket> AssignToUser(UserId assignedTo)
        {
            AssignedTo = assignedTo;
            UpdatedDateTime = DateTime.UtcNow;

            return this;
        }

        public ErrorOr<Ticket> AddComment(Comment comment)
        {
            _comments.Add(comment);
            UpdatedDateTime = DateTime.UtcNow;

            return this;
        }

        public ErrorOr<Ticket> UpdateStatus(TicketStatus status)
        {
            Status = status;
            UpdatedDateTime = DateTime.UtcNow;

            return this;
        }

        public ErrorOr<Ticket> UpdatePriority(TicketPriority priority)
        {
            Priority = priority;
            UpdatedDateTime = DateTime.UtcNow;

            return this;
        }

#pragma warning disable CS8618
        private Ticket() { }
#pragma warning restore CS8618
    }
}
