using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Boilerplate.Web.App.Models
{
    public class ProductDataAccessLayer
    {
        private SalesDetailsContext dbContext;

        public ProductDataAccessLayer(SalesDetailsContext db)
        {
            dbContext = db;
        }
        //get product details
        public IEnumerable<Product> GetAllProduct()
        {
            try
            {
                return dbContext.Product.ToList();
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
                dbContext.Product.Add(product);
               return dbContext.SaveChanges();
               
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
                dbContext.Entry(product).State = EntityState.Modified;
                dbContext.SaveChanges();
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
                Product pdt = dbContext.Product.Find(id);
                dbContext.Product.Remove(pdt);
                return dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }
    }
}
