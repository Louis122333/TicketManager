namespace TicketManager.Contracts.Users.Requests
{
    public record UpdateUserRequest(
        string FirstName,
        string LastName,
        string Email,
        string Password,
        string Role);
}
