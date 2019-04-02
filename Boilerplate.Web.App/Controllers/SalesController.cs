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
        private SalesDataAccessLayer objSales = new SalesDataAccessLayer();

        //A page to display all data in the sales table.
        public ActionResult GetAllSalesDetails()
        {
            var sales = objSales.GetAllSales();
            return View(sales);
        }

        //Add new sale data
        [HttpGet]
        public ActionResult CreateSales()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CreateSales(Sales sales)
        {
            objSales.AddSales(sales);
            return View();
        }

        //update a sales details
        [HttpPut]
        public ActionResult EditSales(Sales sales)
        {
            objSales.UpdateSales(sales);
            return View();
        }

        //delete a sales details
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            objSales.DeleteSales(id);
            return View();
        }
    }
}