using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
            IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;

        }

        public async Task InvokeAsync(HttpContext context){
            try{
                await _next(context);
                //if no error, skips middleware

            } catch(Exception e) {
                //if error, log exception; creates new response
                _logger.LogError(e, e.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode= (int) HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment() //if in development mode, send through full exception with stacktrace 
                    ? new AppExceptions(context.Response.StatusCode, e.Message, e.StackTrace?.ToString())
                    : new AppExceptions(context.Response.StatusCode, "Server Error");
                
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                var json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}