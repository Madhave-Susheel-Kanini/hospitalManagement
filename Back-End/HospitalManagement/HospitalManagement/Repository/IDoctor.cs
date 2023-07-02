using HospitalManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagement.Repository
{
    public interface IDoctor
    {
        Task<IEnumerable<Doctor>> GetDoctors();
        Task<Doctor> GetDoctorById(int id);
        Task<Doctor> CreateDoctor([FromForm] Doctor doctor, IFormFile imageFile);
        Task<Doctor> UpdateDoctor(int id, [FromForm] Doctor doctor, IFormFile imageFile);
        Task<bool> DeleteDoctor(int id);
    }
}
