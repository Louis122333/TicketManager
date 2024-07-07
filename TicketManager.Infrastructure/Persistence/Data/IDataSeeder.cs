namespace TicketManager.Infrastructure.Persistence.Data
{
    /// <summary>
    /// Interface for seeding initial data into the application's database.
    /// </summary>
    public interface IDataSeeder
    {
        /// <summary>
        /// Asynchronously seeds initial data into the database.
        /// </summary>
        /// <returns>A task representing the asynchronous operation.</returns>
        Task SeedAsync();
    }
}
