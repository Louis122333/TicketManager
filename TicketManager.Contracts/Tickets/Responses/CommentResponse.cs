namespace TicketManager.Contracts.Tickets.Responses
{
    public record CommentResponse(
       string CommentId,
       string Text,
       DateTime CreatedDateTime,
       string CreatedBy);
}
