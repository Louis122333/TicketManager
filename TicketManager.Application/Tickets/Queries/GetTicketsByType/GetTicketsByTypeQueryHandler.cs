using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets.Enums;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Tickets.Queries.GetTicketsByType
{
    public class GetTicketsByTypeQueryHandler : IRequestHandler<GetTicketsByTypeQuery, ErrorOr<IReadOnlyList<Ticket>>>
    {
        private readonly ITicketRepository _ticketRepository;

        public GetTicketsByTypeQueryHandler(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<ErrorOr<IReadOnlyList<Ticket>>> Handle(GetTicketsByTypeQuery query, CancellationToken cancellationToken)
        {
            if (!Enum.TryParse<TicketType>(query.Type, true, out var ticketType))
            {
                return Errors.Validation.Invalid("ticketType", "Invalid ticket type");
            }

            var tickets = await _ticketRepository.GetByTypeAsync(ticketType);

            return tickets.ToList();
        }
    }
}
