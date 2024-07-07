using ErrorOr;
using MediatR;
using TicketManager.Application.Authentication.Common;

namespace TicketManager.Application.Authentication.Queries.Login
{
    public record LoginQuery(
     string Email,
     string Password) : IRequest<ErrorOr<AuthenticationResult>>;
}
