using ErrorOr;
using MediatR;
using TicketManager.Application.Authentication.Common;

namespace TicketManager.Application.Authentication.Commands.Register
{
    public record RegisterCommand(
       string FirstName,
       string LastName,
       string Email,
       string Password) : IRequest<ErrorOr<AuthenticationResult>>;
}
