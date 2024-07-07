using ErrorOr;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Domain.Aggregates.Tickets.Validators
{
    public static class TicketValidator
    {
        public static List<Error> Validate(string title, string description, Guid createdBy)
        {
            var errors = new List<Error>();

            if (string.IsNullOrWhiteSpace(title))
            {
                errors.Add(Errors.Validation.Required(nameof(title)));
            }
            else if (title.Length > 50)
            {
                errors.Add(Errors.Validation.LengthOutOfRange(nameof(title), 1, 50));
            }


            if (string.IsNullOrWhiteSpace(description))
            {
                errors.Add(Errors.Validation.Required(nameof(description)));
            }
            else if (description.Length > 200)
            {
                errors.Add(Errors.Validation.LengthOutOfRange(nameof(description), 1, 200));
            }

            if (createdBy == Guid.Empty)
            {
                errors.Add(Errors.Validation.Required(nameof(createdBy)));
            }

            return errors;
        }
    }
}
