using HospitalManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace HospitalManagement.Repository
{
    public interface IAppointment
    {
        Task<ActionResult<IEnumerable<Appointment>>> GetAppointments();
        Task<ActionResult<Appointment>> GetAppointment(int id);
        Task<IActionResult> PutAppointment(int id, Appointment appointment);
        Task<ActionResult<Appointment>> PostAppointment(Appointment appointment);
        Task<IActionResult> DeleteAppointment(int id);
    }
}
