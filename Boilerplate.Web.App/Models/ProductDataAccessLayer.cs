using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boilerplate.Web.App.Models
{
    public class ProductDataAccessLayer
    {
        SalesDetailsContext db = new SalesDetailsContext();

        //get product details
        public IEnumerable<Product> GetAllProduct()
        {
            try
            {
                return db.Product.ToList();
            }
            catch
            {
                throw;
            }
        }

        //add a product 
        public int AddProduct(Product product)
        {
            try
            {
                db.Product.Add(product);
               return db.SaveChanges();
               
            }
            catch
            {
                throw;
            }
        }

        //Update the product details
        public int UpdateProduct(Product product)
        {
            try
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //delete a product
        public int DeleteProduct(int id)
        {
            try
            {
                Product pdt = db.Product.Find(id);
                db.Product.Remove(pdt);
                return db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }
    }
}
