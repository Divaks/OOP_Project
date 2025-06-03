using Microsoft.EntityFrameworkCore;
using CasinoBackend.Data;
using CasinoBackend.Models;

namespace CasinoBackend.Services
{
    public interface ITransactionService
    {
        Task<Transaction> CreateTransaction(string userId, TransactionType type, decimal amount, string description);
        Task<List<TransactionDto>> GetUserTransactions(string userId, int page = 1, int pageSize = 20);
        Task<decimal> GetUserBalance(string userId);
    }

    public class TransactionService : ITransactionService
    {
        private readonly CasinoDbContext _context;

        public TransactionService(CasinoDbContext context)
        {
            _context = context;
        }

        public async Task<Transaction> CreateTransaction(string userId, TransactionType type, decimal amount, string description)
        {
            var transaction = new Transaction
            {
                UserId = userId,
                Type = type,
                Amount = amount,
                Description = description,
                CreatedAt = DateTime.UtcNow
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return transaction;
        }

        public async Task<List<TransactionDto>> GetUserTransactions(string userId, int page = 1, int pageSize = 20)
        {
            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new TransactionDto
                {
                    Id = t.Id,
                    Type = t.Type.ToString(),
                    Amount = t.Amount,
                    Description = t.Description,
                    CreatedAt = t.CreatedAt
                })
                .ToListAsync();

            return transactions;
        }

        public async Task<decimal> GetUserBalance(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            return user?.Balance ?? 0;
        }
    }

    public class TransactionDto
    {
        public int Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}