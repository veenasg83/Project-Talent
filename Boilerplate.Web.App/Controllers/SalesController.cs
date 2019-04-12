using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Web.App.Controllers
{
    public class SalesController : Controller
    {
        private SalesDataAccessLayer salesDataAccessLayer = new SalesDataAccessLayer();

        //A page to display all data in the sales table.
        public ActionResult GetAllSalesDetails()
        {
            var sales = salesDataAccessLayer.GetAllSales();
            return Json(sales);
        }

        //Add new sale data
        
        [HttpPost]
        public ActionResult CreateSales([FromBody]Sales sales)
        {
            var statusMessage = new StatusMessage();

            try
            {
                int result = salesDataAccessLayer.AddSales(sales); ;
                statusMessage.status = (result > 0) ? "Sucess" : "Failed";
                statusMessage.message = (result > 0) ? "Sales Added Sucessfully" : "Failed to add sale";
            }
            catch (Exception e)
            {
                statusMessage.status = "Failed";
                statusMessage.message = e.Message;
            }

            return Json(statusMessage);
            
            
        }

        //update a sales details
        [HttpPut]
        public ActionResult EditSales([FromBody]Sales sales)
        {

            var statusMessage = new StatusMessage();
            try
            {
                int result = salesDataAccessLayer.UpdateSales(sales);
                statusMessage.status = (result > 0) ? "Sucess" : "Failed";
                statusMessage.message = "Sales edited Sucessfully";
            }
            catch (Exception e)
            {
                statusMessage.status = "Failed";
                statusMessage.message = e.Message;
            }

            return Json(statusMessage);
         
        }

        //delete a sales details
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            salesDataAccessLayer.DeleteSales(id);
            return View();
        }
    }
}