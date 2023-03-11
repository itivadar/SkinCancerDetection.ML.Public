using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.UI.Domain.Requests;
using WebApp.UI.Domain.InputModels;
using WebApp.UI.Domain.Interfaces;
using WebApp.UI.Infrastructure.Hubs;
using Microsoft.AspNetCore.Authorization;
using WebApp.UI.DomaninModel;
using WebApp.UI.Application.Interfaces;
using System.Security.Claims;
using WebApp.UI.Application.Requests;

namespace WebApp.UI.Controllers
{
	[ApiController]
    [Authorize]
    public class ImageController : Controller
	{
		private readonly IMediator _mediator;
		private readonly IImageRequestRepository _imageRequestRepository;
        private readonly IAuthorizationService _authorizationHandler;
        
        public ImageController(IMediator mediator, IImageRequestRepository imageRequestRepository, IAuthorizationService authorizationHandler)
        {
            _mediator = mediator;
            _imageRequestRepository = imageRequestRepository;
            _authorizationHandler = authorizationHandler;
        }

        [Route("[controller]/upload/")]
        [HttpPost]
        [RequestSizeLimit(5 * 1024 * 1024)]
        public async Task<ActionResult> Upload([FromForm] ImageInputModel imageInputModel)
        {
            var userId = new Guid(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var imageContent = imageInputModel.ImageContent.OpenReadStream();

            var response = await _mediator.Send(new UploadImageRequest(
                userId,
                imageInputModel.ImageType,
                imageContent,
                imageInputModel.Reference,
                imageInputModel.BodyPart));

            return Json(response);
        }

        [Route("[controller]/history/{filter?}")]
		[HttpGet]
        public  ActionResult GetHistory(string filter)
        {
            var userId = new Guid(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return Json(_imageRequestRepository.GetRequestsHistory(userId, filter));
        }

        [Route("[controller]/delete/{imageId}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteImage(Guid imageId)
        {
            var userAuthorization = await _authorizationHandler.AuthorizeAsync(User, imageId, "AccessPolicy");

            if (!userAuthorization.Succeeded)
            {
                return Unauthorized();
            }

            var result = _mediator.Send(new DeleteImageRequest(imageId));

            return Json(result);
        }

        [Route("[controller]/overview")]
        [HttpGet]
        public ActionResult GetOverview()
        {
            var userId = new Guid(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var result = _imageRequestRepository.GetOverviewRequestsByUserId(userId);

            return Json(result);
        }

        [Route("[controller]/{imageId}")]
        [HttpGet]
        public async Task<ActionResult> GetImageDetails(Guid imageId)
        {   
            var userAuthorization = await _authorizationHandler.AuthorizeAsync(User, imageId, "AccessPolicy");

            if (!userAuthorization.Succeeded)
            {
                return Unauthorized();
            }

            return Json(_imageRequestRepository.GetImageDetails(imageId));
        }
	}
}
