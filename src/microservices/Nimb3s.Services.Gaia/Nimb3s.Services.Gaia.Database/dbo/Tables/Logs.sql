CREATE TABLE [dbo].[Logs](
	[Id] [bigint] IDENTITY(1,1) NOT NULL
	,[LogEntry] [varchar](max) NOT NULL
	,[InsertTimeStamp] datetimeoffset not null constraint [DF_Logs_InsertTimeStamp] default(sysdatetime())

	constraint [CPK_Logs_Id] primary key clustered([Id])
)
