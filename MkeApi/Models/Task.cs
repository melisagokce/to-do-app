using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class Task
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? TaskId { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public bool CheckStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        [NotMapped]
        public IEnumerable<string>? Images { get; set; }
        [NotMapped]
        public IFormFile[]? imageFile { get; set; }

        public Task(string title, string description, bool checkStatus)
        {
            TaskId = Guid.NewGuid().ToString();
            Title = title;
            Description = description;
            CheckStatus = checkStatus;
            CreatedAt = DateTime.Now.ToUniversalTime().AddHours(3); // Türkiye saati
            UpdatedAt = DateTime.Now.ToUniversalTime().AddHours(3); // Türkiye saati
        }

        public Task() { }
    }
}
