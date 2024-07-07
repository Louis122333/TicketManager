using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Application.Tickets.Commands.UpdateTicketPriority
{
    public record UpdateTicketPriorityCommand(
       Guid TicketId,
       string Priority) : IRequest<ErrorOr<Ticket>>;
}
