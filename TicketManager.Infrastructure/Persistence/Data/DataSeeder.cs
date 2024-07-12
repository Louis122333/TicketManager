using TicketManager.Application.Common.Interfaces.Authentication;
using TicketManager.Domain.Aggregates.Tickets.Enums;
using TicketManager.Domain.Aggregates.Tickets.Interfaces;
using TicketManager.Domain.Aggregates.Tickets.ValueObjects;
using TicketManager.Domain.Aggregates.Tickets;
using TicketManager.Domain.Aggregates.Users;
using TicketManager.Domain.Aggregates.Users.Enums;
using TicketManager.Domain.Aggregates.Users.Interfaces;
using TicketManager.Domain.Aggregates.Users.ValueObjects;
using ErrorOr;
using TicketManager.Domain.Aggregates.Tickets.Entities;

namespace TicketManager.Infrastructure.Persistence.Data
{
    public class DataSeeder : IDataSeeder
    {
        private readonly IUserRepository _userRepository;
        private readonly ITicketRepository _ticketRepository;
        private readonly IPasswordHasher _passwordHasher;

        public DataSeeder(IUserRepository userRepository, ITicketRepository ticketRepository, IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _ticketRepository = ticketRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task SeedAsync()
        {
            await SeedUsersAsync();
            await SeedTicketsAsync();
        }

        private async Task SeedUsersAsync()
        {
            var users = new List<(string FirstName, string LastName, string Email, string Password, UserRole? Role)>
            {
                ("Admin", "Ticketmanager", "admin@tm.com", "Admin123", UserRole.Administrator),
                ("Walter", "White", "walter@tm.com", "Heisenberg", UserRole.HelpDesk),
                ("Karen", "McDonalds", "karen@mcdonalds.com", "Password123", null)
            };

            var newUsers = new List<User>();

            foreach (var (firstName, lastName, email, password, role) in users)
            {
                var existingUser = await _userRepository.GetByEmailAsync(email);

                if (existingUser is null)
                {
                    var hashedPassword = _passwordHasher.Hash(password);
                    ErrorOr<User> userResult;

                    if (role.HasValue)
                    {
                        userResult = User.CreateAdmin(firstName, lastName, email, hashedPassword, role.Value);
                    }
                    else
                    {
                        userResult = User.Create(firstName, lastName, email, hashedPassword);
                    }

                    if (userResult.IsError)
                    {
                        throw new Exception($"Failed to create user {email}: {userResult.Errors.FirstOrDefault()}");
                    }

                    newUsers.Add(userResult.Value);
                }
            }

            if (newUsers.Count != 0)
            {
                await _userRepository.AddRangeAsync(newUsers);
            }
        }

        private async Task SeedTicketsAsync()
        {
            var karenUser = await _userRepository.GetByEmailAsync("karen@mcdonalds.com");

            if (karenUser is null)
            {
                throw new Exception("Seed users not found");
            }

            var tickets = new List<(ReferenceNumber ReferenceNumber, string Title, string Description, TicketType Type, UserId CreatedBy)>
            {
                (ReferenceNumber.CreateIncident(),
                "Unable to Contact Manager by Email",
                "I am unable to contact your Help Desk Manager by email through Outlook on my mobile device. Immediate assistance is required as this is impacting my ability work.",
                TicketType.Incident,
                UserId.Create(karenUser.Id.Value)),

                (ReferenceNumber.CreateRequest(),
                "Request for New Laptop",
                "I am requesting a new laptop for work purposes. Specifically, I need a model with a minimum of 16GB RAM, 512GB SSD, and an Intel i7 processor or equivalent.",
                TicketType.Request,
                UserId.Create(karenUser.Id.Value))
            };

            foreach (var (referenceNumber, title, description, type, createdBy) in tickets)
            {
                var ticketResult = Ticket.Create(referenceNumber, title, description, type, createdBy);

                if (ticketResult.IsError)
                {
                    throw new Exception($"Failed to create ticket {title}: {ticketResult.Errors.FirstOrDefault()}");
                }

                await _ticketRepository.AddAsync(ticketResult.Value);

                var comment = Comment.Create(
                    "What is your time estimate for this ticket?",
                    UserId.Create(karenUser.Id.Value));

                await AddCommentAsync(ticketResult.Value, comment.Value);
            }
        }

        public async Task AddCommentAsync(Ticket ticket, Comment comment)
        {
            ticket.AddComment(comment);
            await _ticketRepository.AddCommentAsync(ticket, comment);
        }
    }
}
