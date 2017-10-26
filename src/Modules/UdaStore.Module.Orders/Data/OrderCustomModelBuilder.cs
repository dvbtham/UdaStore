﻿using Microsoft.EntityFrameworkCore;
using UdaStore.Infrastructure.Data;
using UdaStore.Module.Orders.Models;

namespace UdaStore.Module.Orders.Data
{
    public class OrderCustomModelBuilder : ICustomModelBuilder
    {
        public void Build(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderAddress>(x =>
            {
                x.HasOne(d => d.District)
                    .WithMany()
                    .OnDelete(DeleteBehavior.Restrict);

                x.HasOne(d => d.StateOrProvince)
                    .WithMany()
                    .OnDelete(DeleteBehavior.Restrict);

                x.HasOne(d => d.Country)
                    .WithMany()
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Order>(u =>
            {
                u.HasOne(x => x.ShippingAddress)
                    .WithMany()
                    .HasForeignKey(x => x.ShippingAddressId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Order>(u =>
            {
                u.HasOne(x => x.BillingAddress)
                    .WithMany()
                    .HasForeignKey(x => x.BillingAddressId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
