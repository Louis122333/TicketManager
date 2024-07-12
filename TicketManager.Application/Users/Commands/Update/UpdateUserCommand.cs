using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Users;

namespace TicketManager.Application.Users.Commands.Update
{
    public record UpdateUserCommand(
        Guid UserId,
        string Role) : IRequest<ErrorOr<User>>;
}
