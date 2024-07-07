using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Users;
using TicketManager.Domain.Aggregates.Users.Interfaces;

namespace TicketManager.Application.Users.Queries.GetAllUsers
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, ErrorOr<IReadOnlyList<User>>>
    {
        private readonly IUserRepository _userRepository;

        public GetAllUsersQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ErrorOr<IReadOnlyList<User>>> Handle(GetAllUsersQuery query, CancellationToken cancellationToken)
        {
            var users = await _userRepository.GetAllAsync();

            return users.ToList();
        }
    }
}
