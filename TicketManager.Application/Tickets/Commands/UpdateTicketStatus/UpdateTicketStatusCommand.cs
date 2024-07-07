using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Application.Tickets.Commands.UpdateTicketStatus
{
    public record UpdateTicketStatusCommand(
        Guid TicketId,
        string Status) : IRequest<ErrorOr<Ticket>>;
}
