using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.UI.Infrastructure.Services;

namespace WebApp.UI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatsController : Controller
    {
        private readonly IMediator _mediator;
        private readonly IAppStatsService _statsServie;

        public StatsController(IAppStatsService statsServie)
        {
            _statsServie = statsServie;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var stats = await _statsServie.GetAppStats();
            return Json(stats);
        }
    }
}
