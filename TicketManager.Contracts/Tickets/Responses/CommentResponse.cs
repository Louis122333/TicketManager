namespace TicketManager.Contracts.Tickets.Responses
{
    public record CommentResponse(
       string Text,
       DateTime CreatedDateTime,
       string CreatedBy);
}
