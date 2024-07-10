using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Application.Tickets.Queries.GetTicketById
{
    public record GetTicketByIdQuery(Guid TicketId) : IRequest<ErrorOr<Ticket>>;
}
