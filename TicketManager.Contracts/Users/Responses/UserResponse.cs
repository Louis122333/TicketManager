namespace TicketManager.Contracts.Users.Responses
{
    public record UserResponse(
        string Id,
        string FullName,
        string Email,
        string Role);
}
