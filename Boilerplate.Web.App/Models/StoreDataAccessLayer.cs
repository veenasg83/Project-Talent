using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boilerplate.Web.App.Models
{
    public class StoreDataAccessLayer
    {
         SalesDetailsContext db = new SalesDetailsContext();
        //get Store table details
        public IEnumerable<Store> GetAllStore()
        {
            try
            {
                return db.Store.ToList();
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
                db.Store.Add(store);
                return db.SaveChanges();
               
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
                db.Entry(store).State = EntityState.Modified;
                return db.SaveChanges();
                
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
                Store store = db.Store.Find(id);
                db.Store.Remove(store);
                return db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

    }
}
