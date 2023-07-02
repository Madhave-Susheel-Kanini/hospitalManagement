using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.Models;
using HospitalManagement.Repository;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctor _doctorRepository;

        public DoctorsController(IDoctor doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> Get()
        {
            var doctors = await _doctorRepository.GetDoctors();
            return Ok(doctors);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> Get(int id)
        {
            var doctor = await _doctorRepository.GetDoctorById(id);
            if (doctor == null)
            {
                return NotFound();
            }
            return Ok(doctor);
        }
        //[Authorize(Roles = "Course")]
        [HttpPost]
        public async Task<ActionResult<Doctor>> Post([FromForm] Doctor doctor, IFormFile imageFile)
        {

            try
            {
                var createdDoctor = await _doctorRepository.CreateDoctor(doctor, imageFile);
                return CreatedAtAction("Get", new { id = createdDoctor.Id }, createdDoctor);

            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }
        //[Authorize(Roles = "Course")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Doctor>> Put(int id, [FromForm] Doctor doctor, IFormFile imageFile)
        {
            try
            {
                var updatedDoc = await _doctorRepository.UpdateDoctor(id, doctor, imageFile);
                return Ok(updatedDoc);
            }
            catch (ArgumentException ex)
            {
                ModelState.AddModelError("", ex.Message);
                return BadRequest(ModelState);
            }
        }
        //[Authorize(Roles = "Course")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _doctorRepository.DeleteDoctor(id);
            if (result)
            {
                return NoContent();
            }
            return NotFound();
        }
    }
}
