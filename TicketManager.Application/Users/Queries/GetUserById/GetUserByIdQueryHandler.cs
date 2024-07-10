using ErrorOr;
using MediatR;
using TicketManager.Domain.Aggregates.Users;
using TicketManager.Domain.Aggregates.Users.Interfaces;
using TicketManager.Domain.Aggregates.Users.ValueObjects;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Users.Queries.GetUserById
{
    public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, ErrorOr<User>>
    {
        private readonly IUserRepository _userRepository;

        public GetUserByIdQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<ErrorOr<User>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByIdAsync(UserId.Create(request.UserId));

            if (user is null)
            {
                return Errors.Validation.NotFound(nameof(user));
            }

            return user;
        }
    }
}
