using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CasinoBackend.Models;
using CasinoBackend.Services;
using System.Text.Json;

namespace CasinoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GamesController : ControllerBase
    {
        private readonly IGameService _gameService;
        private readonly UserManager<ApplicationUser> _userManager;

        public GamesController(IGameService gameService, UserManager<ApplicationUser> userManager)
        {
            _gameService = gameService;
            _userManager = userManager;
        }

        [HttpPost("slots/spin")]
        public async Task<IActionResult> SpinSlot([FromBody] SlotSpinDto model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found");

            if (user.Balance < model.BetAmount)
                return BadRequest("Insufficient balance");

            var result = await _gameService.PlaySlots(userId, model.BetAmount);
            return Ok(result);
        }

        [HttpPost("roulette/spin")]
        public async Task<IActionResult> SpinRoulette([FromBody] RouletteSpinDto model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found");

            if (user.Balance < model.BetAmount)
                return BadRequest("Insufficient balance");

            var result = await _gameService.PlayRoulette(userId, model.BetAmount, model.BetType, model.BetValue);
            return Ok(result);
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetGameHistory()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var history = await _gameService.GetGameHistory(userId);
            return Ok(history);
        }

        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard()
        {
            var leaderboard = await _gameService.GetLeaderboard();
            return Ok(leaderboard);
        }
    }

    // DTOs
    public class SlotSpinDto
    {
        public decimal BetAmount { get; set; }
    }

    public class RouletteSpinDto
    {
        public decimal BetAmount { get; set; }
        public string BetType { get; set; } = string.Empty; // "number", "color", "even/odd"
        public string BetValue { get; set; } = string.Empty; // "1-36", "red/black", "even/odd"
    }

    // Game result DTOs
    public class SlotResult
    {
        public int[] Reels { get; set; } = new int[3];
        public decimal WinAmount { get; set; }
        public bool IsWin { get; set; }
        public string WinType { get; set; } = string.Empty;
        public decimal NewBalance { get; set; }
    }

    public class RouletteResult
    {
        public int WinningNumber { get; set; }
        public string WinningColor { get; set; } = string.Empty;
        public decimal WinAmount { get; set; }
        public bool IsWin { get; set; }
        public decimal NewBalance { get; set; }
    }
}