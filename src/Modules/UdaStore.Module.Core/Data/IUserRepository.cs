using System.Collections.Generic;
using System.Threading.Tasks;
using UdaStore.Module.Core.Models;

namespace UdaStore.Module.Core.Data
{
    public interface IUserRepository
    {
        Task<List<User>> List();
         void Add(User user);
         void Delete(User user);
         Task<User> Get(string id);
    }
}