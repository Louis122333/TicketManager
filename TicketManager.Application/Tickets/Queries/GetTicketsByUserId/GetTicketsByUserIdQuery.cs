using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Application.Tickets.Queries.GetTicketsByUserId
{
    public record GetTicketsByUserIdQuery(Guid UserId) : IRequest<ErrorOr<IReadOnlyList<Ticket>>>;
}
