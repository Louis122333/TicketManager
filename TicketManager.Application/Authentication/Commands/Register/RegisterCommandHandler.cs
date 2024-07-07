using ErrorOr;
using MediatR;
using TicketManager.Application.Authentication.Common;
using TicketManager.Application.Common.Interfaces.Authentication;
using TicketManager.Domain.Aggregates.Users;
using TicketManager.Domain.Aggregates.Users.Interfaces;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Authentication.Commands.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResult>>
    {
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUserRepository _userRepository;


        public RegisterCommandHandler(
            IUserRepository userRepository,
            IJwtTokenGenerator jwtTokenGenerator,
            IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
            _passwordHasher = passwordHasher;
        }

        public async Task<ErrorOr<AuthenticationResult>> Handle(RegisterCommand command, CancellationToken cancellationToken)
        {
            if (await _userRepository.GetByEmailAsync(command.Email) is not null)
            {
                return Errors.User.DuplicateEmail;
            }

            var passwordHash = _passwordHasher.Hash(command.Password);

            var registerResult = User.Create(
                command.FirstName,
                command.LastName,
                command.Email.ToLower(),
                passwordHash);

            if (registerResult.IsError)
            {
                return registerResult.Errors;
            }

            var user = registerResult.Value;

            await _userRepository.AddAsync(user);

            var token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthenticationResult(
                user,
                token);
        }
    }
}
