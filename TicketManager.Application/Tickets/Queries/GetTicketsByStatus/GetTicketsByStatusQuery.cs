using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Application.Tickets.Queries.GetTicketsByStatus
{
    public record GetTicketsByStatusQuery(string Status) : IRequest<ErrorOr<IReadOnlyList<Ticket>>>;
}
