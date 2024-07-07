using TicketManager.Domain.Aggregates.Users;

namespace TicketManager.Application.Authentication.Common
{
    public record AuthenticationResult(
        User User,
        string Token);
}
