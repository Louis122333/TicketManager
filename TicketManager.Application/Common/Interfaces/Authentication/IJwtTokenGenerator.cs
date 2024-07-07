using TicketManager.Domain.Aggregates.Users;

namespace TicketManager.Application.Common.Interfaces.Authentication
{
    /// <summary>
    /// Interface for generating JWT tokens for users.
    /// </summary>
    public interface IJwtTokenGenerator
    {
        /// <summary>
        /// Generates a JWT token for the specified user.
        /// </summary>
        /// <param name="user">The user for whom the token is generated.</param>
        /// <returns>The generated JWT token as a string.</returns>
        string GenerateToken(User user);
    }
}
