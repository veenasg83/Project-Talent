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
        private StoreDataAccessLayer objStore = new StoreDataAccessLayer();

        //A page to display all data in the Store table.
        public ActionResult GetAllStoreDetails()
        {
            var store = objStore.GetAllStore();
            return View(store);
        }

        //Add new store data
        [HttpGet]
        public ActionResult CreateStore()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CreateStore(Store store)
        {
            objStore.AddStore(store);
            return View();
        }

        //update a store details
        [HttpPut]
        public ActionResult EditStore(Store store)
        {
            objStore.UpdateStore(store);
            return View();
        }

        //delete a store details
        [HttpDelete]
        public ActionResult Delete(int id)
        {
            objStore.DeleteStore(id);
            return View();
        }
    }
}