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
       

        public UpdateUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
         
        }

        public async Task<ErrorOr<User>> Handle(UpdateUserCommand command, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByIdAsync(UserId.Create(command.UserId));

            if (user is null)
            {
                return Errors.Validation.NotFound(nameof(user));
            }
            var userRole = Enum.Parse<UserRole>(command.Role, true);

            var updateResult = user.Update(userRole);

            if (updateResult.IsError)
            {
                return updateResult.Errors;
            }

            return await _userRepository.UpdateAsync(user);
        }
    }
}
