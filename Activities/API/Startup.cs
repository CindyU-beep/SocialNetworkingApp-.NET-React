using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;
using MediatR;
using Application.Activities;
//added via cmd: dotnet add package Microsoft.EntityFrameworkCore.Design --version 6.0.0

namespace API
{
    public class Startup
    {
        private readonly IConfiguration config;
        public Startup(IConfiguration config){
            this.config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
            
            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlite(this.config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>{ //required when accessing resource from different domain. 
            //API on localhost: 5000, Domain on localhost: 3000. hence CORS policy required. 
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(List.Handler).Assembly); //tells mediator where to find handlers
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }

           // app.UseHttpsRedirection();

            app.UseRouting(); //route to appropriate API controller\\

            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
