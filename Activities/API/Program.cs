using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Domain;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args) //async method, returns a task
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope(); //after method complete, scope is disposed of

            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<DataContext>();
                var userManager = services.GetRequiredService<UserManager<AppUser>>();
                await context.Database.MigrateAsync(); //creates the database if not already exist
                await Seed.SeedData(context, userManager); //seeds users into database 
            }
            catch (Exception e)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(e, "Error occured during database migration");
            }

            //run the application
            await host.RunAsync();

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
