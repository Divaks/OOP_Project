using Microsoft.EntityFrameworkCore;
using CasinoBackend.Data;
using CasinoBackend.Models;

namespace CasinoBackend.Services
{
    public interface INewsService
    {
        Task<List<NewsDto>> GetNews(int page = 1, int pageSize = 10);
        Task<NewsDto?> GetNewsById(int id);
        Task<News> CreateNews(string title, string content, string imageUrl = "");
    }

    public class NewsService : INewsService
    {
        private readonly CasinoDbContext _context;

        public NewsService(CasinoDbContext context)
        {
            _context = context;
        }

        public async Task<List<NewsDto>> GetNews(int page = 1, int pageSize = 10)
        {
            var news = await _context.News
                .Where(n => n.IsPublished)
                .OrderByDescending(n => n.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(n => new NewsDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Content = n.Content,
                    ImageUrl = n.ImageUrl,
                    CreatedAt = n.CreatedAt
                })
                .ToListAsync();

            return news;
        }

        public async Task<NewsDto?> GetNewsById(int id)
        {
            var news = await _context.News
                .Where(n => n.Id == id && n.IsPublished)
                .Select(n => new NewsDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Content = n.Content,
                    ImageUrl = n.ImageUrl,
                    CreatedAt = n.CreatedAt
                })
                .FirstOrDefaultAsync();

            return news;
        }

        public async Task<News> CreateNews(string title, string content, string imageUrl = "")
        {
            var news = new News
            {
                Title = title,
                Content = content,
                ImageUrl = imageUrl,
                IsPublished = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.News.Add(news);
            await _context.SaveChangesAsync();

            return news;
        }
    }

    public class NewsDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}