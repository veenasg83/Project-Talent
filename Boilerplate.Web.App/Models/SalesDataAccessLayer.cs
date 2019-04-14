using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boilerplate.Web.App.Models
{
    public class SalesDataAccessLayer
    {
        private SalesDetailsContext dbContext;

        public SalesDataAccessLayer(SalesDetailsContext db)
        {
            dbContext = db;
        }

        //get sale table details
        public IEnumerable<Sales> GetAllSales()
        {
            try
            {
                return dbContext.Sales.Where(x => x.CustomerId == x.Customer.Id)
                    .Where(y => y.ProductId == y.Product.Id)
                    .Where(z => z.StoreId == z.Store.Id)
                    .Include(c => c.Customer)
                    .Include(p => p.Product)
                    .Include(s => s.Store);
            }
            catch
            {
                throw;
            }
        }

        //add a sale 
        public int AddSales(Sales sales)
        {
            try
            {
                dbContext.Sales.Add(sales);
                dbContext.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Update the sales details
        public int UpdateSales(Sales sales)
        {
            try
            {
                dbContext.Entry(sales).State = EntityState.Modified;
                return dbContext.SaveChanges();

            }
            catch
            {
                throw;
            }
            
        }


        //delete a sales
        public int DeleteSales(int id)
        {
            try
            {
                Sales sales = dbContext.Sales.Find(id);
                dbContext.Sales.Remove(sales);
                return dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

    }
}
