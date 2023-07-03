using HospitalManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagement.Repository
{
    public class DoctorRepository:IDoctor
    {
        private readonly DoctorPatientContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public DoctorRepository(DoctorPatientContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IEnumerable<Doctor>> GetDoctors()
        {
            return await _context.Doctors.ToListAsync();
        }

        public async Task<Doctor> GetDoctorById(int id)
        {

            return await _context.Doctors.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Doctor> CreateDoctor([FromForm] Doctor doctor, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/doctor");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            doctor.DocImagePath = fileName;

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return doctor;
        }

        public async Task<Doctor> UpdateDoctor(int id, [FromForm] Doctor doctor, IFormFile imageFile)
        {
            var existingDoctor = await _context.Doctors.FindAsync(id);

            if (existingDoctor == null)
            {
                throw new ArgumentException("Doctor not found");
            }

            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/doctor");

                if (!string.IsNullOrEmpty(existingDoctor.DocImagePath))
                {
                    var existingFilePath = Path.Combine(uploadsFolder, existingDoctor.DocImagePath);
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

                doctor.DocImagePath = fileName;
            }
            else
            {
                doctor.DocImagePath = existingDoctor.DocImagePath;
            }

            existingDoctor.FirstName = doctor.FirstName;
            existingDoctor.LastName = doctor.LastName;
            existingDoctor.Specialization = doctor.Specialization;
            existingDoctor.Email = doctor.Email;
            existingDoctor.PhoneNumber = doctor.PhoneNumber;
            existingDoctor.Email = doctor.Email;
            existingDoctor.Address = doctor.Address;
            existingDoctor.DocImagePath = doctor.DocImagePath;

        await _context.SaveChangesAsync();

            return existingDoctor;
        }

        public async Task<bool> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return false;
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
