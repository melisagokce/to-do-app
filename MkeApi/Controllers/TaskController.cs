using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Task = api.Models.Task;
using Microsoft.AspNetCore.Components.Web;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly TaskContext taskContext;
        public TaskController(TaskContext taskContext)
        {
            this.taskContext = taskContext;
        }

        [HttpGet]
        public IEnumerable<Task> GetTasks()
        {
            var tasks = taskContext.Tasks.ToList();
            return tasks;
        }

        [HttpPost]
        public void addTask(Task task)
        {
            var t = new Task(task.Id, task.Title,task.Description,task.CheckStatus);
            taskContext.Tasks.Add(t);
            taskContext.SaveChanges();
        }

        [HttpDelete]
        [Route("{id}")]
         public IActionResult deleteTask([FromRoute] string id)
        {
            var r = taskContext.Tasks.FirstOrDefault(x => x.Id == id);
            if(r == null){
                return NotFound();
            }
            taskContext.Remove(r);
            taskContext.SaveChanges();

            return NoContent();
        }
    }
}
