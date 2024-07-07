using TicketManager.Domain.Common.Models;

namespace TicketManager.Domain.Aggregates.Tickets.ValueObjects
{
    public class TicketId : AggregateRootId<Guid>
    {
        public override Guid Value { get; protected set; }

        private TicketId(Guid value)
        {
            Value = value;
        }

        public static TicketId CreateUnique()
        {
            return new(Guid.NewGuid());
        }

        public static TicketId Create(Guid value)
        {
            return new(value);
        }

        public override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }
    }
}
