using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Application.Tickets.Queries.GetTicketsByType
{
    public record GetTicketsByTypeQuery(string Type) : IRequest<ErrorOr<IReadOnlyList<Ticket>>>;
}
