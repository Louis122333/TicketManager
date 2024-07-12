namespace TicketManager.Contracts.Users.Responses
{
    public record UserDetailedResponse(
       string UserId,
       string FirstName,
       string LastName,
       string Email,
       string Role,
       DateTime CreatedDate);
}
