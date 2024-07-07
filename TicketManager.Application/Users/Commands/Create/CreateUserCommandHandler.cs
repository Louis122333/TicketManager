using ErrorOr;
using MediatR;
using TicketManager.Application.Common.Interfaces.Authentication;
using TicketManager.Domain.Aggregates.Users;
using TicketManager.Domain.Aggregates.Users.Enums;
using TicketManager.Domain.Aggregates.Users.Interfaces;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Users.Commands.Create
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, ErrorOr<User>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;

        public CreateUserCommandHandler(
            IUserRepository userRepository,
            IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task<ErrorOr<User>> Handle(CreateUserCommand command, CancellationToken cancellationToken)
        {
            if (await _userRepository.GetByEmailAsync(command.Email) is not null)
            {
                return Errors.User.DuplicateEmail;
            }
            var passwordHash = _passwordHasher.Hash(command.Password);

            var userRole = Enum.Parse<UserRole>(command.Role, true);

            var createdUserResult = User.CreateAdmin(
                command.FirstName,
                command.LastName,
                command.Email.ToLower(),
                passwordHash,
                userRole);

            if (createdUserResult.IsError)
            {
                return createdUserResult.Errors;
            }

            var user = createdUserResult.Value;

            await _userRepository.AddAsync(user);

            return user;
        }
    }
}
