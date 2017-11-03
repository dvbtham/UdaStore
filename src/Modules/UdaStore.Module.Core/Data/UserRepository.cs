using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UdaStore.Module.Core.Models;
using UdaStore.Module.Core.Persistence;

namespace UdaStore.Module.Core.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly UdaStoreDbContext _context;
        public UserRepository(UdaStoreDbContext context)
        {
            _context = context;
        }

        public void Add(User user)
        {
            _context.Add(user);
        }

        public void Delete(User user)
        {
            _context.Remove(user);
        }

        public async Task<User> Get(string id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<List<User>> List()
        {
           return await _context.Users.ToListAsync();
        }
    }
}