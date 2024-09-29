using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Task = api.Models.Task;
using Microsoft.AspNetCore.Components.Web;
using MkeApi.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("api")]
    public class TaskController : ControllerBase
    {
        private readonly TaskContext taskContext;
        public TaskController(TaskContext taskContext)
        {
            this.taskContext = taskContext;
        }

        [HttpGet]
        public IActionResult WelcomeToMyAPI()
        {
            var welcomeMessage = new WelcomeMessage
            {
                Message = "Welcome To My API",
                Version = "1.0.0"
            };

            return Ok(welcomeMessage);
        }

        [HttpGet]
        [Route("task-list")]
        public IEnumerable<Task> GetTasks()
        {
            var tasks = taskContext.Tasks.ToList();
            var tasksWithFiles = tasks.Select(task =>
            {
                var folderPath = Path.Combine("task", "task-images", task.TaskId);
                var files = Directory.Exists(folderPath)
                    ? Directory.GetFiles(folderPath).Select(f => Path.Combine("/task-images/", task.TaskId, Path.GetFileName(f)))
                    : Enumerable.Empty<string>();

                return new Task
                {
                    TaskId = task.TaskId,
                    Title = task.Title,
                    Description = task.Description,
                    CheckStatus = task.CheckStatus,
                    Images = files
                };
            });

            return tasksWithFiles;
        }

        [HttpPost]
        [Route("task-ekle")]
        public IActionResult AddTask([FromForm] Task task)
        {
            var newTask = new Task(task.Title, task.Description, task.CheckStatus);
            taskContext.Tasks.Add(newTask);
            taskContext.SaveChanges();

            if (task.imageFile.Length > 0)
            {
                var folderPath = Path.Combine("task", "task-images", newTask.TaskId.ToString());
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                foreach (var file in task.imageFile)
                {
                    if (file.Length > 0)
                    {
                        var filePath = Path.Combine(folderPath, Guid.NewGuid() + "_" + file.FileName);
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                }
            }

            return Ok(newTask);
        }

        [HttpDelete]
        [Route("task-sil/{id}")]
        public IActionResult deleteTask([FromRoute] string id)
        {
            var r = taskContext.Tasks.FirstOrDefault(x => x.TaskId == id);
            if (r == null)
            {
                return NotFound();
            }
            taskContext.Remove(r);
            taskContext.SaveChanges();

            return NoContent();
        }

        [HttpPut]
        [Route("task-guncelle/{id}")]
        public IActionResult updateTask(Task task, [FromRoute] string id)
        {
            var existingTask = taskContext.Tasks.FirstOrDefault(x => x.TaskId == id);

            if (existingTask != null)
            {
                existingTask.Title = task.Title;
                existingTask.Description = task.Description;
                existingTask.CheckStatus = task.CheckStatus;
                existingTask.UpdatedAt = DateTime.Now.ToUniversalTime().AddHours(3);
            }
            else
            {
                return NotFound();
            }

            taskContext.SaveChanges();

            return Ok(existingTask);
        }
    }
}
