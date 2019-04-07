using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boilerplate.Web.App.Models
{
    public partial class Sales
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        [Column(TypeName = "date")]
        public DateTime? DateSold { get; set; }

        [ForeignKey("CustomerId")]
        [InverseProperty("Sales")]
        public Customer Customer { get; set; }
        [ForeignKey("ProductId")]
        [InverseProperty("Sales")]
        public Product Product { get; set; }
        [ForeignKey("StoreId")]
        [InverseProperty("Sales")]
        public Store Store { get; set; }
    }
}
