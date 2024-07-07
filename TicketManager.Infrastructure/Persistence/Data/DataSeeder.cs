using TicketManager.Application.Common.Interfaces.Authentication;
using TicketManager.Domain.Aggregates.Users;
using TicketManager.Domain.Aggregates.Users.Enums;
using TicketManager.Domain.Aggregates.Users.Interfaces;

namespace TicketManager.Infrastructure.Persistence.Data
{
    public class DataSeeder : IDataSeeder
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;

        public DataSeeder(IUserRepository userRepository, IPasswordHasher passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task SeedAsync()
        {
            var adminEmail = "sys@admin.com";
            var existingUser = await _userRepository.GetByEmailAsync(adminEmail);

            if (existingUser is not null)
            {
                return;
            }

            var hashedPassword = _passwordHasher.Hash("Sysadmin!");

            var adminUser = User.CreateAdmin(
                "System",
                "Administrator",
                adminEmail,
                hashedPassword,
                UserRole.Administrator);

            if (adminUser.IsError)
            {
                throw new Exception($"Failed to create admin user: {adminUser.Errors.FirstOrDefault()}");
            }

            await _userRepository.AddAsync(adminUser.Value);
        }
    }
}
