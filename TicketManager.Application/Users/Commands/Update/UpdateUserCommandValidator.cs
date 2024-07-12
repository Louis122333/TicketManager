using FluentValidation;

namespace TicketManager.Application.Users.Commands.Update
{
    public class UpdateUserCommmandValidator : AbstractValidator<UpdateUserCommand>
    {
        //public UpdateUserCommmandValidator()
        //{
        //    RuleFor(x => x.Password)
        //        .NotEmpty()
        //        .MinimumLength(8);
        //}
    }
}
