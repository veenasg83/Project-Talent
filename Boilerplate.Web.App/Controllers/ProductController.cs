using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Web.App.Controllers
{
    public class ProductController : Controller
    {
        private ProductDataAccessLayer objProduct = new ProductDataAccessLayer();
        //A page to display all product in the product table.
        public ActionResult GetAllProductDetails()
        {
            var product = objProduct.GetAllProduct();
            return View(product);
        }

        //Add new product data
        [HttpGet]
        public ActionResult CreateProduct()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CreateProduct(Product product)
        {
            objProduct.AddProduct(product);
            return View();
        }

        //update a product details
        [HttpPut]
        public ActionResult EditProduct(Product product)
        {
            objProduct.UpdateProduct(product);
            return View();
        }

        //Delete a product
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            objProduct.DeleteProduct(id);
            return View();
        }
    }
}