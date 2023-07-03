using HospitalManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly DoctorPatientContext _context;

        public TokenController(IConfiguration configuration, DoctorPatientContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("patient")]
        public async Task<IActionResult> GenerateUserToken(User userLogin)
        {
            var encryptedPassword = Encrypt(userLogin.Password);
            var user = await GetUser(userLogin.Name, encryptedPassword);

            if (user != null && user.Role == "patient")
            {
                var claims = new[]
                {
            new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
            new Claim("Id", user.Id.ToString()),
            new Claim("Name", user.Name),
            new Claim("Password", encryptedPassword),
            new Claim("role", user.Role)
        };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);

                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            else
            {
                return Unauthorized("Invalid credentials");
            }
        }

        [HttpPost("doctor")]
        public async Task<IActionResult> GenerateAdminToken(User userLogin)
        {
            var encryptedPassword = Encrypt(userLogin.Password);
            var user = await GetUser(userLogin.Name, encryptedPassword);

            if (user != null && user.Role == "doctor" && user.Status == "approved")
            {
                var claims = new[]
                {
            new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
            new Claim("Id", user.Id.ToString()),
            new Claim("Name", user.Name),
            new Claim("role", user.Role)
        };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);

                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            else
            {
                return Unauthorized("Invalid credentials");
            }
        }

        private async Task<User> GetUser(string name, string Password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Name == name && u.Password == Password);
        }

        private string Encrypt(string password)
        {
            // Example key and IV generation using hashing
            string passphrase = "your-passphrase";

            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] key = sha256.ComputeHash(Encoding.UTF8.GetBytes(passphrase));
                byte[] iv = sha256.ComputeHash(Encoding.UTF8.GetBytes(passphrase)).Take(16).ToArray();

                using (Aes aes = Aes.Create())
                {
                    aes.Key = key;
                    aes.IV = iv;

                    ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                        {
                            using (StreamWriter writer = new StreamWriter(cryptoStream))
                            {
                                writer.Write(password);
                            }
                        }

                        byte[] encryptedData = memoryStream.ToArray();
                        return Convert.ToBase64String(encryptedData);
                    }
                }
            }
        }
    }
}
