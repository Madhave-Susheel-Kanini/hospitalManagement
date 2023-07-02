using HospitalManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagement.Repository
{
    public class PatientRepository:IPatient
    {
        private readonly DoctorPatientContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public PatientRepository(DoctorPatientContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<Patient> CreatePatient([FromForm] Patient patient, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/patient");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            patient.PatImagePath = fileName;

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return patient;
        }

        public async Task<bool> DeletePatient(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Patient> GetPatientById(int id)
        {

            return await _context.Patients.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Patient>> GetPatients()
        {
            return await _context.Patients.ToListAsync();
        }

        public async Task<Patient> UpdatePatient(int id, [FromForm] Patient patient, IFormFile imageFile)
        {
            var existingPatient = await _context.Patients.FindAsync(id);

            if (existingPatient == null)
            {
                throw new ArgumentException("Doctor not found");
            }

            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/patient");

                if (!string.IsNullOrEmpty(existingPatient.PatImagePath))
                {
                    var existingFilePath = Path.Combine(uploadsFolder, existingPatient.PatImagePath);
                    if (File.Exists(existingFilePath))
                    {
                        File.Delete(existingFilePath);
                    }
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                patient.PatImagePath = fileName;
            }
            else
            {
                patient.PatImagePath = existingPatient.PatImagePath;
            }

            existingPatient.FirstName = patient.FirstName;
            existingPatient.Gender = patient.Gender;
            existingPatient.LastName = patient.LastName;
            existingPatient.Email = patient.Email;
            existingPatient.DateOfBirth = patient.DateOfBirth;
            existingPatient.PhoneNumber = patient.PhoneNumber;
            existingPatient.Address = patient.Address;
            existingPatient.PatImagePath = patient.PatImagePath;
            await _context.SaveChangesAsync();
           
            return existingPatient;
        }
    }
}
