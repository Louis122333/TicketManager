using TicketManager.Domain.Common.Models;

namespace TicketManager.Domain.Aggregates.Tickets.ValueObjects
{
    public sealed class ReferenceNumber : ValueObject
    {
        public string Value { get; private set; }

        private static int _incidentIncrement = 10001;
        private static int _requestIncrement = 10001;

        private ReferenceNumber(string value)
        {
            Value = value;
        }

        public static ReferenceNumber CreateIncident()
        {
            return new ReferenceNumber($"INC{_incidentIncrement++}");
        }

        public static ReferenceNumber CreateRequest()
        {
            return new ReferenceNumber($"REQ{_requestIncrement++}");
        }

        public override IEnumerable<object> GetEqualityComponents()
        {
            yield return Value;
        }
    }
}
