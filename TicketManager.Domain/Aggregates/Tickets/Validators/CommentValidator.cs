using ErrorOr;
using TicketManager.Domain.Common.Errors;

namespace TicketManager.Domain.Aggregates.Tickets.Validators
{
    public static class CommentValidator
    {
        public static List<Error> Validate(string text, Guid createdBy)
        {
            var errors = new List<Error>();

            if (string.IsNullOrWhiteSpace(text))
            {
                errors.Add(Errors.Validation.Required(nameof(text)));
            }
            else if (text.Length > 250)
            {
                errors.Add(Errors.Validation.LengthOutOfRange(nameof(text), 1, 250));
            }

            if (createdBy == Guid.Empty)
            {
                errors.Add(Errors.Validation.Required(nameof(createdBy)));
            }

            return errors;
        }
    }
}
