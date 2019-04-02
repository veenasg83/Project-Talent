using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boilerplate.Web.App.Models
{
    public class SalesDataAccessLayer
    {
        SalesDetailsContext db = new SalesDetailsContext();
        //get sale table details
        public IEnumerable<Sales> GetAllSales()
        {
            try
            {
                return db.Sales.ToList();
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
                db.Sales.Add(sales);
                db.SaveChanges();
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
                db.Entry(sales).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
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
                Sales sales = db.Sales.Find(id);
                db.Sales.Remove(sales);
                return 1;
            }
            catch
            {
                throw;
            }
        }

    }
}
