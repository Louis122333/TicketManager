using ErrorOr;
using TicketManager.Domain.Aggregates.Tickets.Validators;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Aggregates.Users.ValueObjects;
using TicketManager.Domain.Common.Models;

namespace TicketManager.Domain.Aggregates.Tickets.Entities
{
    public sealed class Comment : Entity<CommentId>
    {
        public string Text { get; private set; }
        public DateTime CreatedDateTime { get; private set; }
        public UserId CreatedBy { get; private set; }

        private Comment(
            CommentId commentId,
            string text,
            DateTime createdDateTime,
            UserId createdBy) : base(commentId)
        {
            Text = text;
            CreatedDateTime = createdDateTime;
            CreatedBy = createdBy;
        }

        public static ErrorOr<Comment> Create(
            string text,
            UserId createdBy)
        {
            var errors = CommentValidator.Validate(text, createdBy.Value);

            if (errors.Count > 0)
            {
                return errors;
            }

            return new Comment(
                CommentId.CreateUnique(),
                text,
                DateTime.UtcNow,
                createdBy);
        }
#pragma warning disable CS8618
        private Comment() { }
#pragma warning restore CS8618
    }
}
