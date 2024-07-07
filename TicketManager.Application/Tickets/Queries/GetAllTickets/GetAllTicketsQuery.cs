using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Application.Tickets.Queries.GetAllTickets
{
    public record GetAllTicketsQuery : IRequest<ErrorOr<IReadOnlyList<Ticket>>>;
}
