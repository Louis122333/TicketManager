using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets;

namespace TicketManager.Application.Tickets.Commands.CreateTicket
{
    public record CreateTicketCommand(
         Guid UserId,
         string Title,
         string Description,
         string Type) : IRequest<ErrorOr<Ticket>>;
}
