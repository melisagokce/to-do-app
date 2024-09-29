using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MkeApi.Controllers
{
    public class FileController
    {
        public static bool CreateFolder(string folderPath)
        {
            try
            {
                Directory.CreateDirectory(folderPath);
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }
        public static bool ExistFolder(string folderPath)
        {
            return Directory.Exists(folderPath);
        }
        public static async Task<bool> WriteFile(string taskId, IFormFile[] imageFile)
        {
            try
            {
                Console.WriteLine(taskId,imageFile);
                var folderPath = Path.Combine("task", "task-images", taskId);
                if (!ExistFolder(folderPath))
                {
                    CreateFolder(folderPath);
                }

                foreach (var file in imageFile)
                {
                    if (file.Length > 0)
                    {
                        var filePath = Path.Combine(folderPath, Guid.NewGuid() + "_" + file.FileName);

                        using (var stream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None, 4096, true))
                        {
                            await file.CopyToAsync(stream);
                        }
                    }
                }

                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }

    }
}