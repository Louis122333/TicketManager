using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets.Enums;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Tickets.Commands.UpdateTicketStatus
{
    public class UpdateTicketStatusCommandHandler : IRequestHandler<UpdateTicketStatusCommand, ErrorOr<Ticket>>
    {
        private readonly ITicketRepository _ticketRepository;

        public UpdateTicketStatusCommandHandler(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<ErrorOr<Ticket>> Handle(UpdateTicketStatusCommand command, CancellationToken cancellationToken)
        {
            var ticket = await _ticketRepository.GetByIdAsync(TicketId.Create(command.TicketId));

            if (ticket is null)
            {
                return Errors.Validation.NotFound(nameof(ticket));
            }

            var ticketStatus = Enum.Parse<TicketStatus>(command.Status, true);

            var updateResult = ticket.UpdateStatus(ticketStatus);

            if (updateResult.IsError)
            {
                return updateResult.Errors;
            }

            return await _ticketRepository.UpdateStatusAsync(ticket, ticketStatus);
        }
    }
}
