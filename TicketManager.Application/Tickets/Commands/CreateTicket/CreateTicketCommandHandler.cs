using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets.Enums;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Aggregates.Users.ValueObjects;

namespace TicketManager.Application.Tickets.Commands.CreateTicket
{
    public class CreateTicketCommandHandler : IRequestHandler<CreateTicketCommand, ErrorOr<Ticket>>
    {
        private readonly ITicketRepository _ticketRepository;

        public CreateTicketCommandHandler(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<ErrorOr<Ticket>> Handle(CreateTicketCommand command, CancellationToken cancellationToken)
        {
            var ticketType = Enum.Parse<TicketType>(command.Type, true);

            ReferenceNumber referenceNumber = await CreateUniqueReferenceNumber(ticketType);

            var createTicketResult = Ticket.Create(
                referenceNumber,
                command.Title,
                command.Description,
                ticketType,
                UserId.Create(command.UserId));

            if (createTicketResult.IsError)
            {
                return createTicketResult.Errors;
            }

            var ticket = createTicketResult.Value;

            await _ticketRepository.AddAsync(ticket);

            return ticket;
        }

        private async Task<ReferenceNumber> CreateUniqueReferenceNumber(TicketType ticketType)
        {
            ReferenceNumber referenceNumber;
            do
            {
                referenceNumber = ticketType == TicketType.Incident
                    ? ReferenceNumber.CreateIncident()
                    : ReferenceNumber.CreateRequest();
            }

            while (await _ticketRepository.ExistsByReferenceNumberAsync(referenceNumber));
            return referenceNumber;
        }
    }
}
