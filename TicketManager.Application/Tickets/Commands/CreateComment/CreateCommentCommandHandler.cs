using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets.Entities;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Aggregates.Users.Enums;
using TicketManager.Domain.Aggregates.Users.ValueObjects;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Tickets.Commands.CreateComment
{
    public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, ErrorOr<Comment>>
    {
        private readonly ITicketRepository _ticketRepository;

        public CreateCommentCommandHandler(ITicketRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<ErrorOr<Comment>> Handle(CreateCommentCommand command, CancellationToken cancellationToken)
        {
            var ticket = await _ticketRepository.GetByIdAsync(TicketId.Create(command.TicketId));

            if (ticket is null)
            {
                return Error.NotFound("Ticket not found");
            }

            var userId = UserId.Create(command.UserId);

            if (command.Role == UserRole.Guest.ToString() && ticket.CreatedBy != userId)
            {
                return Errors.Authorization.Unauthorized;
            }

            var result = Comment.Create(
                command.Text,
                userId);

            if (result.IsError)
            {
                return result.Errors;
            }

            var comment = result.Value;

            await _ticketRepository.AddCommentAsync(ticket, comment);

            return comment;
        }
    }
}
