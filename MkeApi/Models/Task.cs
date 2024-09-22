using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class Task
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool CheckStatus { get; set; }
        public Task(string id, string title, string description, bool checkStatus)
        {
            Id = id;
            Title = title;
            Description = description;
            CheckStatus = checkStatus;
        }
    }
}