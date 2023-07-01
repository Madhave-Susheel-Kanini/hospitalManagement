namespace HospitalManagement.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string? PatientName { get; set; }
        public string? AppointmentDate { get; set; }

        public string? Reason { get; set; }
        public Doctor? Doctor { get; set; }
    }
}