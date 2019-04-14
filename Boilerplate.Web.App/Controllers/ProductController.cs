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
      

        private SalesDetailsContext dbContext;

        public ProductController(SalesDetailsContext db)
        {
            dbContext = db;
        }

        //A page to display all product in the product table.
        public ActionResult GetAllProductDetails()
        {
              ProductDataAccessLayer productDataAccessLayer = new ProductDataAccessLayer(dbContext);
              var product = productDataAccessLayer.GetAllProduct();
              return Json(product);
        }

        //Add new product data
        [HttpPost]
        public ActionResult CreateProduct([FromBody]Product product)
        {
            var statusMessage = new StatusMessage();

            try
            {
                ProductDataAccessLayer productDataAccessLayer = new ProductDataAccessLayer(dbContext);
                int result = productDataAccessLayer.AddProduct(product); 
                statusMessage.status = (result > 0) ? "Sucess" : "Failed";
                statusMessage.message = (result > 0) ? "Product Added Sucessfuly" : "Failed to add product";
            }
            catch (Exception e)
            {
                statusMessage.status = "Failed";
                statusMessage.message = e.Message;
            }

            return Json(statusMessage);
           
        }

        //update a product details
        [HttpPut]
        public ActionResult EditProduct([FromBody]Product product)
        {
            var statusMessage = new StatusMessage();
            try
            {
                ProductDataAccessLayer productDataAccessLayer = new ProductDataAccessLayer(dbContext);
                int result = productDataAccessLayer.UpdateProduct(product);
                statusMessage.status = (result > 0) ? "Sucess" : "Failed";
                statusMessage.message = "Product edited Sucessfuly";
            }
            catch (Exception e)
            {
                statusMessage.status = "Failed";
                statusMessage.message = e.Message;
            }

            return Json(statusMessage);
         
            
        }

        //Delete a product
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var statusMessage = new StatusMessage();
            try
            {
                ProductDataAccessLayer productDataAccessLayer = new ProductDataAccessLayer(dbContext);
                int result = productDataAccessLayer.DeleteProduct(id);
                statusMessage.status = (result > 0) ? "Sucess" : "Failed";
                statusMessage.message = "Product Deleted Sucessfully";
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