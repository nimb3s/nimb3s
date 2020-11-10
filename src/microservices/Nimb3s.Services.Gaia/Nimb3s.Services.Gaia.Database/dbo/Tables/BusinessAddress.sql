CREATE TABLE [dbo].[BusinessAddress]
(
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ListingUrl] [varchar](500) NOT NULL,
	[Name] [varchar](250) NOT NULL,
	[BusinessType] [varchar](150) NOT NULL,
	[StreetAddress] [varchar](50) NOT NULL,
	[Language] [varchar](20) NULL,
	[Locality] [varchar](50) NOT NULL,
	[Region] [varchar](5) NOT NULL,
	[ZipCode] [varchar](15) NOT NULL,
	[PhoneNumber] [varchar](14) NULL,
	[Tags] [varchar](500) NOT NULL,
	[IsVerified] [bit] NOT NULL constraint [DF_BusinessAddress_IsVerified] default(0),
	[InsertTimeStamp] datetimeoffset not null constraint [DF_BusinessAddress_InsertTimeStamp] default(sysdatetime())

	constraint [CPK_Address_Id] primary key clustered([Id])
)
