using FluentValidation;

namespace TicketManager.Application.Tickets.Commands.UpdateTicketPriority
{
    public class UpdateTicketPriorityCommmandValidator : AbstractValidator<UpdateTicketPriorityCommand>
    {
        public UpdateTicketPriorityCommmandValidator()
        {
            RuleFor(x => x.TicketId).NotEmpty();
            RuleFor(x => x.Priority).NotEmpty();
        }
    }
}
