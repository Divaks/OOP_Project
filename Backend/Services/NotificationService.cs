using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using CasinoBackend.Data;
using CasinoBackend.Models;
using CasinoBackend.Hubs;

namespace CasinoBackend.Services
{
    public interface INotificationService
    {
        Task<Notification> CreateNotification(string userId, string title, string message, NotificationType type = NotificationType.Info);
        Task<List<NotificationDto>> GetUserNotifications(string userId, bool unreadOnly = false);
        Task MarkAsRead(int notificationId, string userId);
        Task MarkAllAsRead(string userId);
        Task SendRealTimeNotification(string userId, string title, string message, NotificationType type = NotificationType.Info);
    }

    public class NotificationService : INotificationService
    {
        private readonly CasinoDbContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationService(CasinoDbContext context, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public async Task<Notification> CreateNotification(string userId, string title, string message, NotificationType type = NotificationType.Info)
        {
            var notification = new Notification
            {
                UserId = userId,
                Title = title,
                Message = message,
                Type = type,
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            // Send real-time notification
            await _hubContext.Clients.User(userId).SendAsync("ReceiveNotification", new
            {
                notification.Id,
                notification.Title,
                notification.Message,
                Type = notification.Type.ToString(),
                notification.CreatedAt
            });

            return notification;
        }

        public async Task<List<NotificationDto>> GetUserNotifications(string userId, bool unreadOnly = false)
        {
            var query = _context.Notifications.Where(n => n.UserId == userId);

            if (unreadOnly)
                query = query.Where(n => !n.IsRead);

            var notifications = await query
                .OrderByDescending(n => n.CreatedAt)
                .Take(50)
                .Select(n => new NotificationDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Message = n.Message,
                    Type = n.Type.ToString(),
                    IsRead = n.IsRead,
                    CreatedAt = n.CreatedAt
                })
                .ToListAsync();

            return notifications;
        }

        public async Task MarkAsRead(int notificationId, string userId)
        {
            var notification = await _context.Notifications
                .FirstOrDefaultAsync(n => n.Id == notificationId && n.UserId == userId);

            if (notification != null)
            {
                notification.IsRead = true;
                await _context.SaveChangesAsync();
            }
        }

        public async Task MarkAllAsRead(string userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .ToListAsync();

            foreach (var notification in notifications)
            {
                notification.IsRead = true;
            }

            await _context.SaveChangesAsync();
        }

        public async Task SendRealTimeNotification(string userId, string title, string message, NotificationType type = NotificationType.Info)
        {
            await CreateNotification(userId, title, message, type);
        }
    }

    public class NotificationDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}