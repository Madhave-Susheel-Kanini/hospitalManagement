namespace HospitalManagement.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Specialization { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? DocImagePath { get; set; }
        public ICollection<Appointment>? Appointments { get; set; }
    }
}
