using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Users.ValueObjects;

namespace TicketManager.Application.Tickets.Queries.GetTicketsAssigned
{
    public class GetTicketsAssignedToUserQueryHandler : IRequestHandler<GetTicketsAssignedToUserQuery, ErrorOr<IReadOnlyList<Ticket>>>
    {
        private readonly ITicketRepository _ticketRepository;

        public GetTicketsAssignedToUserQueryHandler(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<ErrorOr<IReadOnlyList<Ticket>>> Handle(GetTicketsAssignedToUserQuery query, CancellationToken cancellationToken)
        {
            var tickets = await _ticketRepository.GetByAssignedUserIdAsync(UserId.Create(query.UserId));

            return tickets?.ToList() ?? new();
        }
    }
}
