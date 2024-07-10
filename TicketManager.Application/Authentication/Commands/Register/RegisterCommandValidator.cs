using FluentValidation;

namespace TicketManager.Application.Authentication.Commands.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(50)
                .Must(StartWithUppercase).WithMessage("First name must start with an uppercase letter.");

            RuleFor(x => x.LastName)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(50)
                .Must(StartWithUppercase).WithMessage("Last name must start with an uppercase letter.");

            RuleFor(x => x.Email)
                .EmailAddress()
                .NotEmpty()
                .MaximumLength(128);

            RuleFor(x => x.Password)
                .NotEmpty()
                .MinimumLength(8);
        }

        private bool StartWithUppercase(string nameProperty)
        {
            if (string.IsNullOrEmpty(nameProperty))
            {
                return false;
            }

            return char.IsUpper(nameProperty[0]);
        }
    }
}
