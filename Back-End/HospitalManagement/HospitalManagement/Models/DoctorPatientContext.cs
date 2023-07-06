using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace HospitalManagement.Models
{
    public class DoctorPatientContext:DbContext
    {
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Billing> Billings { get; set; }
        public DbSet<Admin> Admins { get; set; }

        public DoctorPatientContext(DbContextOptions<DoctorPatientContext> options) : base(options)
        {

        }
    }
}
