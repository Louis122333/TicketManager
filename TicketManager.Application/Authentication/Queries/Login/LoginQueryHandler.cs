using ErrorOr;
using MediatR;
using TicketManager.Application.Authentication.Common;
using TicketManager.Application.Common.Interfaces.Authentication;
using TicketManager.Domain.Aggregates.Users;
using TicketManager.Domain.Aggregates.Users.Interfaces;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Application.Authentication.Queries.Login
{
    public class LoginQueryHandler : IRequestHandler<LoginQuery, ErrorOr<AuthenticationResult>>
    {
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;

        public LoginQueryHandler(
            IUserRepository userRepository,
            IJwtTokenGenerator jwtTokenGenerator,
            IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
            _passwordHasher = passwordHasher;
        }

        public async Task<ErrorOr<AuthenticationResult>> Handle(LoginQuery query, CancellationToken cancellationToken)
        {
            if (await _userRepository.GetByEmailAsync(query.Email) is not User user)
            {
                return Errors.Authentication.InvalidCredentials;
            }

            var isPasswordValid = _passwordHasher.Verify(user.Password, query.Password);

            if (!isPasswordValid)
            {
                return new[] { Errors.Authentication.InvalidCredentials };
            }

            var token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthenticationResult(
               user,
               token);
        }
    }
}
