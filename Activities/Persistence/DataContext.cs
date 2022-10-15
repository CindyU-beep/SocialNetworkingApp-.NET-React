using Domain;
using Microsoft.EntityFrameworkCore;
//added DB via cmd: dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 6.0.0

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities{ get;set; } 
    }
}