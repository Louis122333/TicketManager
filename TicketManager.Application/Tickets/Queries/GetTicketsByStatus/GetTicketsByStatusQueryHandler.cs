using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets.Enums;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Tickets.Queries.GetTicketsByStatus
{
    public class GetTicketsByStatusQueryHandler : IRequestHandler<GetTicketsByStatusQuery, ErrorOr<IReadOnlyList<Ticket>>>
    {
        private readonly ITicketRepository _ticketRepository;

        public GetTicketsByStatusQueryHandler(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<ErrorOr<IReadOnlyList<Ticket>>> Handle(GetTicketsByStatusQuery query, CancellationToken cancellationToken)
        {
            if (!Enum.TryParse<TicketStatus>(query.Status, true, out var status))
            {
                return Errors.Validation.Invalid(nameof(status), "Invalid ticket status");
            }

            var tickets = await _ticketRepository.GetByStatusAsync(status);

            if (tickets is null || tickets.Count == 0)
            {
                return Errors.Validation.NotFound(nameof(tickets));
            }

            return tickets.ToList();
        }
    }
}
