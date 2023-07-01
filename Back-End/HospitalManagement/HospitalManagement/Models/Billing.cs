namespace HospitalManagement.Models
{
    public class Billing
    {
        public int Id { get; set; }
        public string? PatientFirstName { get; set; }
        public string? PatientEmail { get; set; }
        public string? Service { get; set;}
        public string? Total { get; set; }

    }
}
