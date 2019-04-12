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
        private CustomerDataAccessLayer customerDataAccessLayer = new CustomerDataAccessLayer();


        public ActionResult Index()
        {
            return View();
        }

        //A page to display all data in the Customer table.
        public ActionResult GetAllCustomerDetails()
        {
            var customer = customerDataAccessLayer.GetAllCustomer();
            return Json(customer);
        }

        //Add new customer data
      

        [HttpPost]
        public ActionResult CreateCustomer([FromBody]Customer customer)
        {
            var statusMessage = new StatusMessage();

            try
            {
                int result = customerDataAccessLayer.AddCustomer(customer);
                statusMessage.status = (result > 0) ? "Sucess" : "Failed";
                statusMessage.message = (result > 0) ? "Customer Added Sucessfully": "Failed to add customer";
            }
            catch(Exception e)
            {
                statusMessage.status = "Failed";
                statusMessage.message = e.Message;
            }

            return Json(statusMessage);
                    
        }

        //update a customer details
        [HttpPut]
        public ActionResult EditCustomer([FromBody]Customer customer)
        {
            var statusMessage = new StatusMessage();
            try
            {
                int result = customerDataAccessLayer.UpdateCustomer(customer);
                statusMessage.status = (result > 0) ? "Sucess" : "Failed";
                statusMessage.message = "Customer edited Sucessfully";
            }
            catch (Exception e)
            {
                statusMessage.status = "Failed";
                statusMessage.message = e.Message;
            }

            return Json(statusMessage);

           
        }

        //delete a customer details
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var statusMessage = new StatusMessage();
            try
            {
                int result = customerDataAccessLayer.DeleteCustomer(id);
                statusMessage.status = (result > 0) ? "Sucess" : "Failed";
                statusMessage.message = "Customer Deleted Sucessfully";
            }
            catch (Exception e)
            {
                statusMessage.status = "Failed";
                statusMessage.message = e.Message;
            }

            return Json(statusMessage);
        }

    }
}