using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Aggregates.Users.Interfaces;
using TicketManager.Domain.Aggregates.Users.ValueObjects;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Tickets.Commands.AssignToUser
{
    public class AssignToUserCommandHandler : IRequestHandler<AssignToUserCommand, ErrorOr<Ticket>>
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IUserRepository _userRepository;

        public AssignToUserCommandHandler(
            ITicketRepository ticketRepository,
            IUserRepository userRepository)
        {
            _ticketRepository = ticketRepository;
            _userRepository = userRepository;
        }

        public async Task<ErrorOr<Ticket>> Handle(AssignToUserCommand command, CancellationToken cancellationToken)
        {
            var ticket = await _ticketRepository.GetByIdAsync(TicketId.Create(command.TicketId));

            if (ticket is null)
            {
                return Errors.Validation.NotFound(nameof(ticket));
            }

            var userId = UserId.Create(command.UserId);

            var user = await _userRepository.GetByIdAsync(userId);

            if (user is null)
            {
                return Errors.Validation.NotFound(nameof(user));
            }

            return await _ticketRepository.AssignToUserAsync(ticket, userId);
        }
    }
}
