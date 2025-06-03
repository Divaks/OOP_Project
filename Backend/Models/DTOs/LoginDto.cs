using System.ComponentModel.DataAnnotations; // Додайте, якщо потрібні атрибути валідації

namespace CasinoBackend.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
    }
}