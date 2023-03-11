using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace WebApp.UI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VersionController : Controller
    {

        [HttpGet]
        public ActionResult Get()
        {
            return Json(new Version("1.0"));
        }
    }
}