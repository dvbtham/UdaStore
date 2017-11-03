using System.Threading.Tasks;
using UdaStore.Module.Core.Models;

namespace UdaStore.Module.Core.Extensions
{
    public interface IWorkContext
    {
         Task<User> GetCurrentUser();
    }
}