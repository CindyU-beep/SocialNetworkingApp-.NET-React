using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Activities.Core;

namespace Application.Activities
//Outputs a list of our activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Activity>>>{}

        public class Handler : IRequestHandler<Query, Result<List<Activity>>> //Interface 
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Activity>>.Success(await _context.Activities.ToListAsync(cancellationToken));
            }
        }
    }
}