using FluentValidation;

namespace TicketManager.Application.Tickets.Commands.CreateTicket
{
    public class CreateTicketCommandValidator : AbstractValidator<CreateTicketCommand>
    {
        public CreateTicketCommandValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(50);
            RuleFor(x => x.Description)
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(200);
            RuleFor(x => x.Type).NotEmpty();
        }
    }
}
