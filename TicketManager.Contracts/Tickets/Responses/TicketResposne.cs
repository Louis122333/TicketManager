namespace TicketManager.Contracts.Tickets.Responses
{
    public record TicketResponse(
      string TicketId,
      string ReferenceNumber,
      string Title,
      string Status,
      string? AssignedTo,
      IReadOnlyList<CommentResponse> Comments);
}
