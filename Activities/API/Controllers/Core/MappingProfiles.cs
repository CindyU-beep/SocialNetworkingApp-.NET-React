using AutoMapper;
using Domain;

namespace API.Controllers.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity,Activity>(); //mapping to activity to activity 

        }
        
    }
}