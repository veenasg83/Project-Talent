using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boilerplate.Web.App.Models
{
    public class StoreDataAccessLayer
    {
        private SalesDetailsContext dbContext;


        public StoreDataAccessLayer(SalesDetailsContext db)
        {
            dbContext = db;
        }

        //get Store table details
        public IEnumerable<Store> GetAllStore()
        {
            try
            {
                return dbContext.Store.ToList();
            }
            catch
            {
                throw;
            }
        }

        //add a store 
        public int AddStore(Store store)
        {
            try
            {
                dbContext.Store.Add(store);
                return dbContext.SaveChanges();
               
            }
            catch
            {
                throw;
            }
        }

        //Update the store details
        public int UpdateStore(Store store)
        {
            try
            {
                dbContext.Entry(store).State = EntityState.Modified;
                return dbContext.SaveChanges();
                
            }
            catch
            {
                throw;
            }
        }
        ////delete a store
        public int DeleteStore(int id)
        {
            try
            {
                Store store = dbContext.Store.Find(id);
                dbContext.Store.Remove(store);
                return dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

    }
}
