using HospitalManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagement.Repository
{
    public interface IPatient
    {
        Task<IEnumerable<Patient>> GetPatients();
        Task<Patient> GetPatientById(int id);
        Task<Patient> CreatePatient([FromForm] Patient patient, IFormFile imageFile);
        Task<Patient> UpdatePatient(int id, [FromForm] Patient patient, IFormFile imageFile);
        Task<bool> DeletePatient(int id);
    }
}
