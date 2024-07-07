using ErrorOr;
using TicketManager.Domain.Aggregates.Users.Enums;
using TicketManager.Domain.Aggregates.Users.Validators;
using TicketManager.Domain.Aggregates.Users.ValueObjects;
using TicketManager.Domain.Common.Models;

namespace TicketManager.Domain.Aggregates.Users
{
    public sealed class User : AggregateRoot<UserId, Guid>
    {
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }
        public UserRole Role { get; private set; }
        public DateTime CreatedDate { get; private set; }

        private User(
         UserId userId,
         string firstName,
         string lastName,
         string email,
         string password,
         DateTime createdDate) : base(userId)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            CreatedDate = createdDate;
        }

        public static ErrorOr<User> Create(
        string firstName,
        string lastName,
        string email,
        string password)
        {
            var errors = UserValidator.Validate(firstName, lastName, email, password);

            if (errors.Count > 0)
            {
                return errors;
            }

            var user = new User(
                UserId.CreateUnique(),
                firstName,
                lastName,
                email,
                password,
                DateTime.UtcNow);

            return user;
        }

        public static ErrorOr<User> CreateAdmin(
            string firstName,
            string lastName,
            string email,
            string password,
            UserRole role)
        {
            var errors = UserValidator.Validate(firstName, lastName, email, password);

            if (errors.Count > 0)
            {
                return errors;
            }

            var user = new User(
                UserId.CreateUnique(),
                firstName,
                lastName,
                email,
                password,
                DateTime.UtcNow);

            user.Role = role;

            return user;
        }

        public ErrorOr<User> Update(
        string firstName,
        string lastName,
        string email,
        string password,
        UserRole role)
        {
            var errors = UserValidator.Validate(firstName, lastName, email, password);

            if (errors.Count > 0)
            {
                return errors;
            }

            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            Role = role;

            return this;
        }
#pragma warning disable CS8618
        private User() { }
#pragma warning restore CS8618
    }
}
