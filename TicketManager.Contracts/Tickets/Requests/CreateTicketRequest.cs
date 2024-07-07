namespace TicketManager.Contracts.Tickets.Requests
{
    public record CreateTicketRequest(
      string Title,
      string Description,
      string Type);
}
