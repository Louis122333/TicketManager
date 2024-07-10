using FluentValidation;

namespace TicketManager.Application.Users.Commands.Create
{
    public class CreateUserCommmandValidator : AbstractValidator<CreateUserCommand>
    {
        public CreateUserCommmandValidator()
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

            RuleFor(x => x.Role)
                .NotEmpty();
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
