using ErrorOr;
using MediatR;
using TicketManager.Application.Common.Interfaces.Authentication;
using TicketManager.Domain.Aggregates.Users;
using TicketManager.Domain.Aggregates.Users.Enums;
using TicketManager.Domain.Aggregates.Users.Interfaces;
using TicketManager.Domain.Aggregates.Users.ValueObjects;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Users.Commands.Update
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, ErrorOr<User>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;

        public UpdateUserCommandHandler(
            IUserRepository userRepository,
            IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task<ErrorOr<User>> Handle(UpdateUserCommand command, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByIdAsync(UserId.Create(command.UserId));

            if (user is null)
            {
                return Errors.Validation.NotFound(nameof(user));
            }

            var existingUser = await _userRepository.GetByEmailAsync(command.Email);

            if (existingUser is not null && existingUser.Id.Value != command.UserId)
            {
                return Errors.User.DuplicateEmail;
            }

            var passwordHash = string.IsNullOrEmpty(command.Password) ? user.Password : _passwordHasher.Hash(command.Password);

            var userRole = Enum.Parse<UserRole>(command.Role, true);

            var updateResult = user.Update(
                command.FirstName,
                command.LastName,
                command.Email.ToLower(),
                passwordHash,
                userRole);

            if (updateResult.IsError)
            {
                return updateResult.Errors;
            }

            return await _userRepository.UpdateAsync(user);
        }
    }
}
