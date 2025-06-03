using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using CasinoBackend.Data;
using CasinoBackend.Models;
using CasinoBackend.Controllers;

namespace CasinoBackend.Services
{
    public interface IGameService
    {
        Task<SlotResult> PlaySlots(string userId, decimal betAmount);
        Task<RouletteResult> PlayRoulette(string userId, decimal betAmount, string betType, string betValue);
        Task<List<GameSessionDto>> GetGameHistory(string userId);
        Task<List<LeaderboardEntry>> GetLeaderboard();
    }

    public class GameService : IGameService
    {
        private readonly CasinoDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITransactionService _transactionService;
        private readonly Random _random;

        public GameService(
            CasinoDbContext context,
            UserManager<ApplicationUser> userManager,
            ITransactionService transactionService)
        {
            _context = context;
            _userManager = userManager;
            _transactionService = transactionService;
            _random = new Random();
        }

        public async Task<SlotResult> PlaySlots(string userId, decimal betAmount)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) throw new ArgumentException("User not found");

            // Generate slot reels (0-9 symbols)
            var reels = new int[] { _random.Next(0, 10), _random.Next(0, 10), _random.Next(0, 10) };

            // Calculate win
            decimal winAmount = 0;
            string winType = "";
            bool isWin = false;

            // Three of a kind
            if (reels[0] == reels[1] && reels[1] == reels[2])
            {
                if (reels[0] == 7) // Lucky 7s
                {
                    winAmount = betAmount * 50;
                    winType = "Jackpot - Triple 7s!";
                }
                else
                {
                    winAmount = betAmount * 10;
                    winType = "Triple Match!";
                }
                isWin = true;
            }
            // Two of a kind
            else if (reels[0] == reels[1] || reels[1] == reels[2] || reels[0] == reels[2])
            {
                winAmount = betAmount * 2;
                winType = "Double Match!";
                isWin = true;
            }

            // Update user balance
            user.Balance -= betAmount;
            if (isWin)
            {
                user.Balance += winAmount;
            }

            await _userManager.UpdateAsync(user);

            // Record game session
            var gameSession = new GameSession
            {
                UserId = userId,
                GameType = GameType.Slots,
                BetAmount = betAmount,
                WinAmount = winAmount,
                GameData = JsonSerializer.Serialize(new { reels, winType }),
                CreatedAt = DateTime.UtcNow
            };

            _context.GameSessions.Add(gameSession);

            // Record transactions
            await _transactionService.CreateTransaction(userId, TransactionType.GameLoss, betAmount, "Slot bet");
            if (isWin)
            {
                await _transactionService.CreateTransaction(userId, TransactionType.GameWin, winAmount, $"Slot win - {winType}");
            }

            await _context.SaveChangesAsync();

            return new SlotResult
            {
                Reels = reels,
                WinAmount = winAmount,
                IsWin = isWin,
                WinType = winType,
                NewBalance = user.Balance
            };
        }

        public async Task<RouletteResult> PlayRoulette(string userId, decimal betAmount, string betType, string betValue)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) throw new ArgumentException("User not found");

            // Generate winning number (0-36)
            var winningNumber = _random.Next(0, 37);
            var winningColor = GetRouletteColor(winningNumber);

            // Calculate win based on bet type
            decimal winAmount = 0;
            bool isWin = false;

            switch (betType.ToLower())
            {
                case "number":
                    if (int.Parse(betValue) == winningNumber)
                    {
                        winAmount = betAmount * 36; // 35:1 payout + original bet
                        isWin = true;
                    }
                    break;
                case "color":
                    if (betValue.ToLower() == winningColor.ToLower())
                    {
                        winAmount = betAmount * 2; // 1:1 payout + original bet
                        isWin = true;
                    }
                    break;
                case "evenodd":
                    bool isEven = winningNumber % 2 == 0 && winningNumber != 0;
                    if ((betValue.ToLower() == "even" && isEven) || (betValue.ToLower() == "odd" && !isEven && winningNumber != 0))
                    {
                        winAmount = betAmount * 2; // 1:1 payout + original bet
                        isWin = true;
                    }
                    break;
            }

            // Update user balance
            user.Balance -= betAmount;
            if (isWin)
            {
                user.Balance += winAmount;
            }

            await _userManager.UpdateAsync(user);

            // Record game session
            var gameSession = new GameSession
            {
                UserId = userId,
                GameType = GameType.Roulette,
                BetAmount = betAmount,
                WinAmount = winAmount,
                GameData = JsonSerializer.Serialize(new { winningNumber, winningColor, betType, betValue }),
                CreatedAt = DateTime.UtcNow
            };

            _context.GameSessions.Add(gameSession);

            // Record transactions
            await _transactionService.CreateTransaction(userId, TransactionType.GameLoss, betAmount, "Roulette bet");
            if (isWin)
            {
                await _transactionService.CreateTransaction(userId, TransactionType.GameWin, winAmount, "Roulette win");
            }

            await _context.SaveChangesAsync();

            return new RouletteResult
            {
                WinningNumber = winningNumber,
                WinningColor = winningColor,
                WinAmount = winAmount,
                IsWin = isWin,
                NewBalance = user.Balance
            };
        }

        public async Task<List<GameSessionDto>> GetGameHistory(string userId)
        {
            var sessions = await _context.GameSessions
                .Where(g => g.UserId == userId)
                .OrderByDescending(g => g.CreatedAt)
                .Take(50)
                .Select(g => new GameSessionDto
                {
                    Id = g.Id,
                    GameType = g.GameType.ToString(),
                    BetAmount = g.BetAmount,
                    WinAmount = g.WinAmount,
                    CreatedAt = g.CreatedAt,
                    GameData = g.GameData
                })
                .ToListAsync();

            return sessions;
        }

        public async Task<List<LeaderboardEntry>> GetLeaderboard()
        {
            var leaderboard = await _context.Users
                .OrderByDescending(u => u.Balance)
                .Take(10)
                .Select(u => new LeaderboardEntry
                {
                    Username = u.FirstName + " " + u.LastName,
                    Balance = u.Balance
                })
                .ToListAsync();

            return leaderboard;
        }

        private string GetRouletteColor(int number)
        {
            if (number == 0) return "green";

            var redNumbers = new[] { 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36 };
            return redNumbers.Contains(number) ? "red" : "black";
        }
    }

    // DTOs
    public class GameSessionDto
    {
        public int Id { get; set; }
        public string GameType { get; set; } = string.Empty;
        public decimal BetAmount { get; set; }
        public decimal WinAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public string GameData { get; set; } = string.Empty;
    }

    public class LeaderboardEntry
    {
        public string Username { get; set; } = string.Empty;
        public decimal Balance { get; set; }
    }
} // ÷ﬂ ƒ”∆ ¿ ¡”À¿ ¬≤ƒ—”“Õﬂ!