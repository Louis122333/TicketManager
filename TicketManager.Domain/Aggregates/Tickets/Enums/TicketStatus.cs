namespace TicketManager.Domain.Aggregates.Tickets.Enums
{
    public enum TicketStatus
    {
        AwaitingApproval,
        Approved,
        WorkInProgress,
        ClosedComplete,
        ClosedIncomplete,
        Canceled
    }
}
