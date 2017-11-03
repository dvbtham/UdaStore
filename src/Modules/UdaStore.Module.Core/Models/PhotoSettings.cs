using System.IO;
using System.Linq;

namespace UdaStore.Module.Core.Models
{
    public class PhotoSettings
    {
        public int MaxBytes { get; set; }
        public string[] AcceptedFileTypes { get; set; }

        public bool IsSupported(string fileName) {
            return AcceptedFileTypes.Any(f => f == Path.GetExtension(fileName).ToLower());
        }
    }
    public class FileSettings
    {
        public int MaxBytes { get; set; }
        public string[] AcceptedFileTypes { get; set; }

        public bool IsSupported(string fileName) {
            return AcceptedFileTypes.Any(f => f == Path.GetExtension(fileName).ToLower());
        }
    }
}