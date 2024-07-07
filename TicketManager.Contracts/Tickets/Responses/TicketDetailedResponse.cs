namespace TicketManager.Contracts.Tickets.Responses
{
    public record TicketDetailedResponse(
        string TicketId,
        string ReferenceNumber,
        string Title,
        string Description,
        string Type,
        string Status,
        string Priority,
        DateTime CreatedDateTime,
        DateTime UpdatedDateTime,
        string CreatedBy,
        string? AssignedTo,
        IReadOnlyList<CommentResponse> Comments);
}
