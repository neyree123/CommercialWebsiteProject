using System;

namespace Core.Entities.OrderAggregate;

public class ProductItemOrdered : BaseEntity
{
    public int ProductId { get; set; }
    public required string ProductName { get; set; } 
    public required string PictureUrl { get; set; }
}
