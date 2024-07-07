namespace TicketManager.Contracts.Authentication.Responses
{
    public record AuthenticationResponse(
        Guid Id,
        string FirstName,
        string LastName,
        string Email,
        string Role,
        string Token);
}
