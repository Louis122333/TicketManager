using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets.Entities;

namespace TicketManager.Application.Tickets.Commands.CreateComment
{
    public record CreateCommentCommand(
       Guid TicketId,
       string Text,
       Guid UserId,
       string Role) : IRequest<ErrorOr<Comment>>;
}
