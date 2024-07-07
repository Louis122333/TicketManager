using TicketManager.Domain.Common.Models;

namespace TicketManager.Domain.Aggregates.Tickets.ValueObjects
{
    public class CommentId : AggregateRootId<Guid>
    {
        public override Guid Value { get; protected set; }

        private CommentId(Guid value)
        {
            Value = value;
        }

        public static CommentId CreateUnique()
        {
            return new(Guid.NewGuid());
        }

        public static CommentId Create(Guid value)
        {
            return new(value);
        }

        public override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }
    }
}
