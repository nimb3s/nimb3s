using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Nimb3s.Services.Gaia.Model
{
    public partial class GaiaContext : DbContext
    {
        public GaiaContext()
        {
        }

        public GaiaContext(DbContextOptions<GaiaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AddressStatus> AddressStatus { get; set; }
        public virtual DbSet<BusinessAddress> BusinessAddress { get; set; }
        public virtual DbSet<CleanTerritory> CleanTerritory { get; set; }
        public virtual DbSet<Logs> Logs { get; set; }
        public virtual DbSet<Territory> Territory { get; set; }
        public virtual DbSet<YellowPageAddress> YellowPageAddress { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\sqlexpress;Database=Gaia;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AddressStatus>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AddressId).HasColumnName("addressId");

                entity.Property(e => e.DateVisited)
                    .HasColumnName("dateVisited")
                    .HasColumnType("smalldatetime");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<BusinessAddress>(entity =>
            {
                entity.Property(e => e.BusinessType)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.InsertTimeStamp).HasDefaultValueSql("(sysdatetime())");

                entity.Property(e => e.Language)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ListingUrl)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Locality)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(14)
                    .IsUnicode(false);

                entity.Property(e => e.Region)
                    .IsRequired()
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.StreetAddress)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Tags)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.ZipCode)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CleanTerritory>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasColumnName("city")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Filename)
                    .HasColumnName("filename")
                    .HasMaxLength(350)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .HasColumnName("phoneNumber")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StreetName)
                    .HasColumnName("streetName")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.TerritoryNumber).HasColumnName("territoryNumber");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("type")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ZipCode)
                    .IsRequired()
                    .HasColumnName("zipCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Logs>(entity =>
            {
                entity.Property(e => e.InsertDate).HasDefaultValueSql("(sysdatetime())");

                entity.Property(e => e.LogEntry)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Territory>(entity =>
            {
                entity.ToTable("territory");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.City)
                    .HasColumnName("city")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FileName)
                    .HasColumnName("fileName")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasColumnName("phone")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StreetAddress)
                    .HasColumnName("streetAddress")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StreetName)
                    .HasColumnName("streetName")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Territory1)
                    .HasColumnName("territory")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TerritoryType)
                    .HasColumnName("territoryType")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Zipcode)
                    .HasColumnName("zipcode")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<YellowPageAddress>(entity =>
            {
                entity.Property(e => e.BusinessName)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.BusinessType)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.InsertDate).HasDefaultValueSql("(sysdatetime())");

                entity.Property(e => e.ListingUrl)
                    .IsRequired()
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Locality)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Region)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.StreetAddress)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.Tags).IsUnicode(false);

                entity.Property(e => e.ZipCode)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
