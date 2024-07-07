using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Application.Tickets.Commands.AssignToUser
{
    public record AssignToUserCommand(
        Guid TicketId, 
        Guid UserId) : IRequest<ErrorOr<Ticket>>;
}
