CREATE TABLE [dbo].[BusinessAddress]
(
	[Id] bigint NOT NULL identity(1,1)
	,[ListingUrl] varchar(500) not null
	,[Name] varchar(250) not null
	,[BusinessType] varchar(150) not null
	,[StreetAddress] varchar(50) not null
	,[Locality] varchar(50) not null
	,[Region] varchar(5) not null
	,[ZipCode] varchar(15) not null
	,[PhoneNumber] varchar(14)
	,[Tags] varchar(500) not null
	,[InsertTimeStamp] datetimeoffset not null constraint [DF_Address_InsertTimeStamp] default(sysdatetime())

	constraint [CPK_Address_Id] primary key clustered([Id])
)
