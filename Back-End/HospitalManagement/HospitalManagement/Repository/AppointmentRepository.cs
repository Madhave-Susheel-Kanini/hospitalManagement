using HospitalManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HospitalManagement.Repository
{
    public class AppointmentRepository:IAppointment
    {
        private readonly DoctorPatientContext _context;

        public AppointmentRepository(DoctorPatientContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            return await _context.Appointments.Include(x => x.Doctor).ToListAsync();
        }

        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return new NotFoundResult();
            }

            return appointment;
        }

        public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
        {
            if (id != appointment.Id)
            {
                return new BadRequestResult();
            }

            var appoint = await _context.Doctors.FindAsync(appointment.Doctor.Id);
            appointment.Doctor = appoint;
            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
                {
                    return new NotFoundResult();
                }
                else
                {
                    throw;
                }
            }

            return new NoContentResult();
        }

        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            if (appointment.Doctor != null)
            {
                var appoint = await _context.Doctors.FindAsync(appointment.Doctor.Id);
                appointment.Doctor = appoint;
            }
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return new CreatedAtActionResult("GetAppointment", "Appointments", new { id = appointment.Id }, appointment);
        }

        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return new NotFoundResult();
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return new NoContentResult();
        }

        private bool AppointmentExists(int id)
        {
            return _context.Appointments.Any(a => a.Id == id);
        }
    }
}
