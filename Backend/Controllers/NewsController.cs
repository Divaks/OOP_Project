using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CasinoBackend.Services;

namespace CasinoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetNews([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var news = await _newsService.GetNews(page, pageSize);
            return Ok(news);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNewsById(int id)
        {
            var news = await _newsService.GetNewsById(id);
            if (news == null)
                return NotFound();

            return Ok(news);
        }

        [HttpPost]
        [Authorize] // In a real app, you'd want admin role authorization
        public async Task<IActionResult> CreateNews([FromBody] CreateNewsDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var news = await _newsService.CreateNews(model.Title, model.Content, model.ImageUrl);
            return CreatedAtAction(nameof(GetNewsById), new { id = news.Id }, news);
        }
    }

    public class CreateNewsDto
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }
}