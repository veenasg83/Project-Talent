using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;

namespace Boilerplate.Web.App.Controllers
{
    public class StoreController : Controller
    {

        private SalesDetailsContext dbContext;

        public StoreController(SalesDetailsContext db)
        {
            dbContext = db;
        }
        //A page to display all data in the Store table.
        public ActionResult GetAllStoreDetails()
        {
            StoreDataAccessLayer storeDataAccessLayer = new StoreDataAccessLayer(dbContext);
            var store = storeDataAccessLayer.GetAllStore();
            return Json(store);
        }

        //Add new store data
        [HttpPost]
        public ActionResult CreateStore([FromBody]Store store)
        {
            var statusMessage = new StatusMessage();

            try
            {
                StoreDataAccessLayer storeDataAccessLayer = new StoreDataAccessLayer(dbContext);
                int result = storeDataAccessLayer.AddStore(store);
                statusMessage.status = (result > 0) ? "Sucess" : "Failed";
                statusMessage.message = (result > 0) ? "Store Added Sucessfuly" : "Failed to add Store";
            }
            catch (Exception e)
            {
                statusMessage.status = "Failed";
                statusMessage.message = e.Message;
            }

            return Json(statusMessage);


        }

        //update a store details
        [HttpPut]
        public ActionResult EditStore([FromBody]Store store)
        {

            var statusMessage = new StatusMessage();
            try
            {
                StoreDataAccessLayer storeDataAccessLayer = new StoreDataAccessLayer(dbContext);
                int result = storeDataAccessLayer.UpdateStore(store);
                statusMessage.status = (result > 0) ? "Sucess" : "Failed";
                statusMessage.message = "Customer edited Sucessfuly";
            }
            catch (Exception e)
            {
                statusMessage.status = "Failed";
                statusMessage.message = e.Message;
            }

            return Json(statusMessage);


        }

        //delete a store details
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var statusMessage = new StatusMessage();
            try
            {
                StoreDataAccessLayer storeDataAccessLayer = new StoreDataAccessLayer(dbContext);
                int result = storeDataAccessLayer.DeleteStore(id);
                statusMessage.status = (result > 0) ? "Sucess" : "Failed";
                statusMessage.message = "Store Deleted Sucessfully";
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