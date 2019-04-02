using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Web.App.Controllers
{
    public class CustomerController : Controller
    {
        private CustomerDataAccessLayer objCustomer = new CustomerDataAccessLayer();

        //A page to display all data in the Customer table.
        public ActionResult GetAllCustomerDetails()
        {
            var customer = objCustomer.GetAllCustomer();
            return View(customer);
        }

        //Add new customer data
        [HttpGet]
        public ActionResult CreateCustomer()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CreateCustomer(Customer customer)
        {
            objCustomer.AddCustomer(customer);
            return View();
        }

        //update a customer details
        [HttpPut]
        public ActionResult EditCustomer(Customer customer)
        {
            objCustomer.UpdateCustomer(customer);
            return View();
        }

        //delete a customer details
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            objCustomer.DeleteCustomer(id);
            return View();
        }

    }
}