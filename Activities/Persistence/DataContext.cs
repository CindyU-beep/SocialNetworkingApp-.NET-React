using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
//added DB via cmd: dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 6.0.0

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Activity> Activities{ get;set; } 
        public DbSet<EventAttendee> EventAttendees{ get;set; } //query database for event attendees

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //entity configurations for many to many relationships

            //map app user to activity id 
            builder.Entity<EventAttendee>(x=>x.HasKey(aa=>new{aa.AppUserId,aa.ActivityId})); 

            //define app user relationships 
            builder.Entity<EventAttendee>()
                .HasOne(u=>u.AppUser)
                .WithMany(a => a.Activities)
                .HasForeignKey(aa=>aa.AppUserId);

            //define activity obj relationships 
            builder.Entity<EventAttendee>()
                .HasOne(u=>u.Activity)
                .WithMany(a => a.Attendees)
                .HasForeignKey(aa=>aa.ActivityId);



        }

    }
}