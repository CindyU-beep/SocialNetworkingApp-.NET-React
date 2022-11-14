using Application.Activities.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id); //get activity from database 
                
                if(activity == null){
                    return null;
                }
                _mapper.Map(request.Activity, activity); //map ea property inside req activity to objects from database 

                var result = await _context.SaveChangesAsync() > 0;
                if(!result){
                    return Result<Unit>.Failure("Failed to update activity");
                }
                return Result<Unit>.Success(Unit.Value); //command does not return anything ~technically
            }
        }
    }
}