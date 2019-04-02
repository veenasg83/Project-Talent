using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boilerplate.Web.App.Models
{
    public class CustomerDataAccessLayer
    {
        SalesDetailsContext db = new SalesDetailsContext();

        //get customer table details
        public IEnumerable<Customer> GetAllCustomer()
        {
            try
            {
                return db.Customer.ToList();
            }
            catch
            {
                throw;
            }
        }

        //add a customer 
        public int AddCustomer(Customer customer)
        {
            try
            {
                db.Customer.Add(customer);
                db.SaveChanges();
                return 1;
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
                db.Entry(customer).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
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
                Customer customer = db.Customer.Find(id);
                db.Customer.Remove(customer);
                return 1;
            }
            catch
            {
                throw;
            }
        }

    }
}
