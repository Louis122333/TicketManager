using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Users;

namespace TicketManager.Application.Users.Commands.Update
{
    public record UpdateUserCommand(
     Guid UserId,
     string FirstName,
     string LastName,
     string Email,
     string Password,
     string Role) : IRequest<ErrorOr<User>>;
}
