using System.IO;
using UdaStore.Infrastructure;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Core.Models;

namespace UdaStore.Module.Core.Services
{
    public class MediaService : IMediaService
    {
        private const string MediaRootFolder = "uploads";

        private IRepository<Media> _mediaRespository;

        public MediaService(IRepository<Media> mediaRespository)
        {
            this._mediaRespository = mediaRespository;
        }

        public string GetMediaUrl(Media media)
        {
            if (media != null)
            {
                return $"/{MediaRootFolder}/{media.FileName}";
            }

            return $"/{MediaRootFolder}/no-image.png";
        }

        public string GetMediaUrl(string fileName)
        {
            return $"/{MediaRootFolder}/{fileName}";
        }

        public string GetThumbnailUrl(Media media)
        {
            return GetMediaUrl(media);
        }

        public void SaveMedia(Stream mediaBinaryStream, string fileName, string mimeType = null)
        {
            var filePath = Path.Combine(GlobalConfiguration.WebRootPath, MediaRootFolder, fileName);
            using (var output = new FileStream(filePath, FileMode.Create))
            {
                mediaBinaryStream.CopyTo(output);
            }
        }

        public void DeleteMedia(Media media)
        {
            _mediaRespository.Remove(media);
            DeleteMedia(media.FileName);
        }

        public void DeleteMedia(string fileName)
        {
            var filePath = Path.Combine(GlobalConfiguration.WebRootPath, MediaRootFolder, fileName);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }
    }
}