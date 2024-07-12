using TicketManager.Domain.Aggregates.Users.ValueObjects;

namespace TicketManager.Domain.Aggregates.Users.Interfaces
{
    public interface IUserRepository
    {
        /// <summary>
        /// Adds a new user asynchronously to the repository.
        /// </summary>
        /// <param name="user">The user object to add.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        Task AddAsync(User user);

        Task AddRangeAsync(IReadOnlyList<User> users);

        /// <summary>
        /// Retrieves a user by email address asynchronously.
        /// </summary>
        /// <param name="email">The email address of the user to retrieve.</param>
        /// <returns>
        /// A task that represents the asynchronous operation.
        /// The task result contains the user if found; otherwise, null.
        /// </returns>
        Task<User?> GetByEmailAsync(string email);

        /// <summary>
        /// Retrieves a user by user ID asynchronously.
        /// </summary>
        /// <param name="userId">The unique identifier of the user.</param>
        /// <returns>
        /// A task that represents the asynchronous operation.
        /// The task result contains the user if found; otherwise, null.
        /// </returns>
        Task<User?> GetByIdAsync(UserId userId);

        /// <summary>
        /// Updates an existing user asynchronously in the repository.
        /// </summary>
        /// <param name="user">The user object with updated information.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        Task<User> UpdateAsync(User user);

        /// <summary>
        /// Retrieves all users in the repository asynchronously.
        /// </summary>
        /// <returns>
        /// A task that represents the asynchronous operation.
        /// The task result contains a read-only list of all users in the repository.
        /// </returns>
        Task<IReadOnlyList<User>> GetAllAsync();
    }
}
