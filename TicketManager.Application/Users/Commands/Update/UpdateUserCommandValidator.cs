using FluentValidation;

namespace TicketManager.Application.Users.Commands.Update
{
    public class UpdateUserCommmandValidator : AbstractValidator<UpdateUserCommand>
    {
        public UpdateUserCommmandValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(50);

            RuleFor(x => x.LastName)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(50);

            RuleFor(x => x.Email)
                .EmailAddress()
                .NotEmpty()
                .MaximumLength(128);

            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(8);
        }
    }
}
