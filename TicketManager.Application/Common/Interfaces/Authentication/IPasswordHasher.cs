namespace TicketManager.Application.Common.Interfaces.Authentication
{
    /// <summary>
    /// Interface for hashing and verifying passwords.
    /// </summary>
    public interface IPasswordHasher
    {
        /// <summary>
        /// Hashes the provided password using a cryptographic hash method.
        /// </summary>
        /// <param name="password">The password to hash.</param>
        /// <returns>The hashed password as a string.</returns>
        string Hash(string password);

        /// <summary>
        /// Verifies whether the input password matches the provided hashed password.
        /// </summary>
        /// <param name="passwordHash">The previously hashed password.</param>
        /// <param name="inputPassword">The password to verify.</param>
        /// <returns>True if the input password matches the hashed password; otherwise, false.</returns>
        bool Verify(string passwordHash, string inputPassword);
    }
}
