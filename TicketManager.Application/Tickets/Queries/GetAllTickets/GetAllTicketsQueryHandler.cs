using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Application.Tickets.Queries.GetAllTickets
{
    public class GetAllTicketsQueryHandler : IRequestHandler<GetAllTicketsQuery, ErrorOr<IReadOnlyList<Ticket>>>
    {
        private readonly ITicketRepository _ticketRepository;

        public GetAllTicketsQueryHandler(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<ErrorOr<IReadOnlyList<Ticket>>> Handle(GetAllTicketsQuery query, CancellationToken cancellationToken)
        {
            var tickets = await _ticketRepository.GetAllAsync();
            return tickets.ToList();
        }
    }
}
