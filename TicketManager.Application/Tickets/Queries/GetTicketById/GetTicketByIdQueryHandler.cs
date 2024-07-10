using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Tickets.Queries.GetTicketById
{
    public class GetTicketByIdQueryHandler : IRequestHandler<GetTicketByIdQuery, ErrorOr<Ticket>>
    {
        private readonly ITicketRepository _ticketRepository;

        public GetTicketByIdQueryHandler(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }
        public async Task<ErrorOr<Ticket>> Handle(GetTicketByIdQuery request, CancellationToken cancellationToken)
        {
            var ticket = await _ticketRepository.GetByIdAsync(TicketId.Create(request.TicketId));

            if (ticket is null)
            {
                return Errors.Validation.NotFound(nameof(ticket));
            }

            return ticket;
        }
    }
}
