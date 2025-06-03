using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CasinoBackend.Models;
using CasinoBackend.Services;

namespace CasinoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _transactionService;
        private readonly UserManager<ApplicationUser> _userManager;

        public TransactionsController(ITransactionService transactionService, UserManager<ApplicationUser> userManager)
        {
            _transactionService = transactionService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetTransactions([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var transactions = await _transactionService.GetUserTransactions(userId, page, pageSize);
            return Ok(transactions);
        }

        [HttpPost("deposit")]
        public async Task<IActionResult> Deposit([FromBody] DepositDto model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            if (model.Amount <= 0)
                return BadRequest("Amount must be greater than 0");

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found");

            // In a real application, you would integrate with a payment processor here
            // For demo purposes, we'll just add the money directly
            user.Balance += model.Amount;
            await _userManager.UpdateAsync(user);

            await _transactionService.CreateTransaction(userId, TransactionType.Deposit, model.Amount, "Deposit via " + model.PaymentMethod);

            return Ok(new { NewBalance = user.Balance, Message = "Deposit successful" });
        }

        [HttpPost("withdraw")]
        public async Task<IActionResult> Withdraw([FromBody] WithdrawDto model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            if (model.Amount <= 0)
                return BadRequest("Amount must be greater than 0");

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound("User not found");

            if (user.Balance < model.Amount)
                return BadRequest("Insufficient balance");

            // In a real application, you would integrate with a payment processor here
            user.Balance -= model.Amount;
            await _userManager.UpdateAsync(user);

            await _transactionService.CreateTransaction(userId, TransactionType.Withdrawal, model.Amount, "Withdrawal to " + model.PaymentMethod);

            return Ok(new { NewBalance = user.Balance, Message = "Withdrawal successful" });
        }

        [HttpGet("balance")]
        public async Task<IActionResult> GetBalance()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var balance = await _transactionService.GetUserBalance(userId);
            return Ok(new { Balance = balance });
        }
    }

    // DTOs
    public class DepositDto
    {
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
    }

    public class WithdrawDto
    {
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
    }
}