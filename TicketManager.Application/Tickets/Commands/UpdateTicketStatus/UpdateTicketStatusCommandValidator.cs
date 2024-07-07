using FluentValidation;

namespace TicketManager.Application.Tickets.Commands.UpdateTicketStatus
{
    public class UpdateTicketStatusCommmandValidator : AbstractValidator<UpdateTicketStatusCommand>
    {
        public UpdateTicketStatusCommmandValidator()
        {
            RuleFor(x => x.TicketId).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
        }
    }
}
