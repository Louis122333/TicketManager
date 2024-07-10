using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Application.Tickets.Queries.GetTicketsAssigned
{
    public record GetTicketsAssignedToUserQuery(Guid UserId) : IRequest<ErrorOr<IReadOnlyList<Ticket>>>;
}
