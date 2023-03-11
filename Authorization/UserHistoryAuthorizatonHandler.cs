using Microsoft.AspNetCore.Authorization;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApp.UI.Application.Interfaces;

namespace WebApp.UI.Authorization
{
    public class UserHistoryAuthorizatonHandler : AuthorizationHandler<SameUserRequirement, Guid>
    {
        private readonly IImageRequestRepository _imageRequestRepository;

        public UserHistoryAuthorizatonHandler(IImageRequestRepository imageRequestRepository)
        {
            _imageRequestRepository = imageRequestRepository;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       SameUserRequirement requirement,
                                                       Guid resourceId)
        {

            var image = _imageRequestRepository.GetImageRequestById(resourceId);
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            
            if (image != null && image.UserId == Guid.Parse(userId))
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public class SameUserRequirement : IAuthorizationRequirement { }
}
