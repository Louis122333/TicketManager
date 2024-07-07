using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets.Enums;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Tickets.Commands.UpdateTicketPriority
{
    public class UpdateTicketPriorityCommandHandler : IRequestHandler<UpdateTicketPriorityCommand, ErrorOr<Ticket>>
    {
        private readonly ITicketRepository _ticketRepository;

        public UpdateTicketPriorityCommandHandler(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<ErrorOr<Ticket>> Handle(UpdateTicketPriorityCommand command, CancellationToken cancellationToken)
        {
            var ticket = await _ticketRepository.GetByIdAsync(TicketId.Create(command.TicketId));

            if (ticket is null)
            {
                return Errors.Validation.NotFound(nameof(ticket));
            }

            var ticketPriority = Enum.Parse<TicketPriority>(command.Priority, true);

            var updateResult = ticket.UpdatePriority(
                ticketPriority);

            if (updateResult.IsError)
            {
                return updateResult.Errors;
            }

            return await _ticketRepository.UpdatePriorityAsync(ticket, ticketPriority);
        }
    }
}
