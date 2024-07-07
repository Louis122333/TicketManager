using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Aggregates.Users.Interfaces;
using TicketManager.Domain.Aggregates.Users.ValueObjects;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Tickets.Queries.GetTicketsByUserId
{
    public class GetTicketsByUserIdQueryHandler : IRequestHandler<GetTicketsByUserIdQuery, ErrorOr<IReadOnlyList<Ticket>>>
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IUserRepository _userRepository;

        public GetTicketsByUserIdQueryHandler(ITicketRepository ticketRepository, IUserRepository userRepository)
        {
            _ticketRepository = ticketRepository;
            _userRepository = userRepository;
        }

        public async Task<ErrorOr<IReadOnlyList<Ticket>>> Handle(GetTicketsByUserIdQuery query, CancellationToken cancellationToken)
        {
            var userId = UserId.Create(query.UserId);

            var user = await _userRepository.GetByIdAsync(userId);

            if (user is null)
            {
                return Errors.Validation.NotFound(nameof(user));
            }

            var tickets = await _ticketRepository.GetByUserIdAsync(userId);

            return tickets.ToList();
        }
    }
}
