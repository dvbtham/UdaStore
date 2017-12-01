using System.Collections.Generic;

namespace UdaStore.Module.Core.Resources
{
    public class LoginResource
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Fullname { get; set; }

        public IList<string> Roles { get; set; } = new List<string>();
    }
}