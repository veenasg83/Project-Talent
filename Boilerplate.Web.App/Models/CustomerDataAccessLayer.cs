using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boilerplate.Web.App.Models
{
    public class CustomerDataAccessLayer
    {
        private SalesDetailsContext dbContext;//= new SalesDetailsContext();

        public CustomerDataAccessLayer(SalesDetailsContext db)
        {
            dbContext = db;
        }

        //get customer table details
        public IEnumerable<Customer> GetAllCustomer()
        {
            try
            {
                return dbContext.Customer.ToList();
            }
            catch
            {
                throw;
            }
        }

        //add a customer 
        public int AddCustomer( Customer customer)
        {
            try
            {
                dbContext.Customer.Add(customer);
                return dbContext.SaveChanges();
              
            }
            catch
            {
                throw;
            }
        }

        //Update the customer details
        public int  UpdateCustomer(Customer customer)
        {
            try
            {
                dbContext.Entry(customer).State = EntityState.Modified;
                return  dbContext.SaveChanges();
                
            }
            catch
            {
                throw;
            }
        }
        //delete a customer
        public int DeleteCustomer(int id)
        {
            try
            {
                Customer customer = dbContext.Customer.Find(id);
                dbContext.Customer.Remove(customer);
                return dbContext.SaveChanges();

            }
            catch
            {
                throw;
            }
        }

    }
}
