using ErrorOr;
using System.Text.RegularExpressions;
using static TicketManager.Domain.Common.Errors.Errors;

namespace TicketManager.Domain.Aggregates.Users.Validators
{
    public class UserValidator
    {
        public static List<Error> Validate(
            string firstName,
            string lastName,
            string email,
            string password)
        {
            var errors = new List<Error>();

            if (string.IsNullOrWhiteSpace(firstName))
            {
                errors.Add(Validation.Required(nameof(firstName)));
            }
            else if (firstName.Length < 2 || firstName.Length > 50)
            {
                errors.Add(Validation.Invalid(nameof(firstName), "First name must be between 2 and 50 characters."));
            }
            else if (!Regex.IsMatch(firstName, @"^[a-zA-Z\-]+$"))
            {
                errors.Add(Validation.Invalid(nameof(firstName), "First name should only contain letters and hyphens."));
            }

            if (string.IsNullOrWhiteSpace(lastName))
            {
                errors.Add(Validation.Required(nameof(lastName)));
            }
            else if (lastName.Length < 2 || lastName.Length > 50)
            {
                errors.Add(Validation.Invalid(nameof(lastName), "Last name must be between 2 and 50 characters."));
            }
            else if (!Regex.IsMatch(lastName, @"^[a-zA-Z\-]+$"))
            {
                errors.Add(Validation.Invalid(nameof(lastName), "Last name should only contain letters and hyphens."));
            }

            if (string.IsNullOrWhiteSpace(email))
            {
                errors.Add(Validation.Required(nameof(email)));
            }
            else if (!IsValidEmail(email))
            {
                errors.Add(Validation.Invalid(nameof(email), "Invalid email format."));
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                errors.Add(Validation.Required(nameof(password)));
            }
            else if (password.Length < 8)
            {
                errors.Add(Validation.Invalid(nameof(password), "Password must be at least 8 characters long."));
            }

            return errors;
        }

        private static bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}
