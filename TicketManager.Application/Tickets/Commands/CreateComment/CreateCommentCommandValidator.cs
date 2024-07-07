using FluentValidation;

namespace TicketManager.Application.Tickets.Commands.CreateComment
{
    public class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommand>
    {
        public CreateCommentCommandValidator()
        {
            RuleFor(x => x.TicketId).NotEmpty();
            RuleFor(x => x.Text)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(250);
            RuleFor(x => x.UserId).NotEmpty();
        }
    }
}
