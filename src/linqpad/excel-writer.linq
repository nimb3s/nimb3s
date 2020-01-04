<Query Kind="Statements">
  <Reference>C:\Users\ktabarez\Source\Repos\Gaia\bin\Debug\Gaia.exe</Reference>
  <NuGetReference Version="6.2.0">EntityFramework</NuGetReference>
  <NuGetReference>Microsoft.Office.Interop.Excel</NuGetReference>
  <Namespace>Microsoft.Office.Interop.Excel</Namespace>
  <AppConfig>
    <Content>
      <configuration>
        <configSections>
          <!-- For more information on Entity Framework configuration, visit http://go.microsoft.com/fwlink/?LinkID=237468 -->
          <section name="entityFramework" type="System.Data.Entity.Internal.ConfigFile.EntityFrameworkSection, EntityFramework, Version=6.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" requirePermission="false" />
        </configSections>
        <startup>
          <supportedRuntime version="v4.0" sku=".NETFramework,Version=v4.6.1" />
        </startup>
        <entityFramework>
          <defaultConnectionFactory type="System.Data.Entity.Infrastructure.SqlConnectionFactory, EntityFramework" />
          <providers>
            <provider invariantName="System.Data.SqlClient" type="System.Data.Entity.SqlServer.SqlProviderServices, EntityFramework.SqlServer" />
          </providers>
        </entityFramework>
        <connectionStrings>
          <add name="GaiaEntities" connectionString="metadata=res://*/Model1.csdl|res://*/Model1.ssdl|res://*/Model1.msl;provider=System.Data.SqlClient;provider connection string=&quot;data source=.\SQLEXPRESS;initial catalog=Gaia;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework&quot;" providerName="System.Data.EntityClient" />
        </connectionStrings>
      </configuration>
    </Content>
  </AppConfig>
</Query>

var simpleTemplate = new DirectoryInfo(@"C:\git\nimb3s\templates\simple.xlsx");

Application app = new Application();

Workbook excelWorkbook = null;

try
{
	List<Gaia.territory> items = new List<Gaia.territory>();
	using (var ge = new Gaia.GaiaEntities())
	{
		items.AddRange((from t in ge.territories
						where t.territoryType == "DoorToDoor"
						select t).OrderBy(i => i.id).ToList());
	}

	var territories = items.GroupBy(i => new
	{
		i.territory1,
	}).Select(i => new 
	{
		Territory = i.Key.territory1,
		Streets = i.ToList()
	}).ToList();


	excelWorkbook = app.Workbooks.Open(simpleTemplate.FullName);
	Sheets excelSheets = excelWorkbook.Worksheets;
	Worksheet excelWorksheet = (Worksheet)excelSheets[1];

	int maxAddressCountPerSheet = 42;
	
	foreach (var territory in territories)
	{
		Console.WriteLine($"started territory #{territory}");
		
		var cities = territory.Streets.GroupBy(i => new
		{
			i.city,
			i.zipcode
		}).Select(i => new
		{
			City = i.Key.city,
			ZipCode = i.Key.zipcode,
			Streets = i.ToList()
		}).ToList();
		
		foreach (var city in cities)
		{
			var sheets = city.Streets
				.Select((str, index) => new { str, index })
				.GroupBy(x => x.index / maxAddressCountPerSheet)
				.Select(g => g.Select(x => x.str).ToList())
				.ToList();

			int sheetCounter = 0;
			int firstPageNumber = 0;
			int secondPageNumber = 0;
			foreach (var sheet in sheets)
			{
				sheetCounter++;		
				
				//first page
				if(sheetCounter % 2 == 1)
				{
					firstPageNumber = sheetCounter;
					
					(excelWorksheet.Cells[1, 1] as Range).Value = "Territorio";
					(excelWorksheet.Cells[1, 4] as Range).Value = territory.Territory;
					(excelWorksheet.Cells[1, 5] as Range).Value = "Localidad";
					(excelWorksheet.Cells[1, 8] as Range).Value = city.City;
					(excelWorksheet.Cells[1, 12] as Range).Value = "Zip Code";
					(excelWorksheet.Cells[1, 15] as Range).Value = city.ZipCode;
					(excelWorksheet.Cells[1, 17] as Range).Value = "Pagina";
					(excelWorksheet.Cells[1, 19] as Range).Value = firstPageNumber;
					(excelWorksheet.Cells[1, 20] as Range).Value = "de";
					(excelWorksheet.Cells[1, 21] as Range).Value = sheets.Count;
					
					(excelWorksheet.Cells[2, 1] as Range).Value = (excelWorksheet.Cells[2, 1] as Range).Value.ToString().Replace("{type}", "TERRITORIO DE CASA EN CASA");
					
					(excelWorksheet.Cells[4, 1] as Range).Value = "fecha:";

					(excelWorksheet.Cells[49, 1] as Range).Value = (excelWorksheet.Cells[49, 22] as Range).Value.ToString().Replace("{revisedTitle}", "Revisado en");
					(excelWorksheet.Cells[49, 1] as Range).Value = (excelWorksheet.Cells[49, 22] as Range).Value.ToString().Replace("{dateRevised}", DateTime.Now.ToString("d/M/yyyy"));
					
					(excelWorksheet.Cells[6, 1] as Range).Value = sheet.First().streetName;
					
					var previousStreetName = sheet.First().streetName;
					for (int i = 1; i <= maxAddressCountPerSheet ; i++)
					{
						if (i > sheet.Count)
						{
							//clear the rest of the excel fields
							(excelWorksheet.Cells[i + 6, 1] as Range).Font.Bold = false;
							(excelWorksheet.Cells[i + 6, 1] as Range).Value = "";
							(excelWorksheet.Cells[i + 6, 6] as Range).Value = "";
						}
						else if (!previousStreetName.Equals(sheet[i -1].streetName))
						{
							(excelWorksheet.Cells[i + 6, 1] as Range).Font.Bold = true;
							(excelWorksheet.Cells[i + 6, 1] as Range).Value = sheet[i - 1].streetName;
							previousStreetName = sheet[i - 1].streetName;
						}
						else
						{
							(excelWorksheet.Cells[i + 6, 1] as Range).Font.Bold = false;
							(excelWorksheet.Cells[i + 6, 1] as Range).Value = sheet[i - 1].streetAddress;
							(excelWorksheet.Cells[i + 6, 6] as Range).Value = sheet[i - 1].status;
						}
					}
				}
				//second page
				else if(sheetCounter % 2 == 0)
				{
					secondPageNumber = sheetCounter;
					
					(excelWorksheet.Cells[1, 22] as Range).Value = "Territorio";
					(excelWorksheet.Cells[1, 26] as Range).Value = territory.Territory;
					(excelWorksheet.Cells[1, 27] as Range).Value = "Localidad";
					(excelWorksheet.Cells[1, 30] as Range).Value = city.City;
					(excelWorksheet.Cells[1, 34] as Range).Value = "Zip Code";
					(excelWorksheet.Cells[1, 37] as Range).Value = city.ZipCode;
					(excelWorksheet.Cells[1, 39] as Range).Value = "Pagina";
					(excelWorksheet.Cells[1, 41] as Range).Value = secondPageNumber;
					(excelWorksheet.Cells[1, 42] as Range).Value = "de";
					(excelWorksheet.Cells[1, 43] as Range).Value = sheets.Count;

					(excelWorksheet.Cells[2, 22] as Range).Value = (excelWorksheet.Cells[2, 1] as Range).Value.ToString().Replace("{type}", "TERRITORIO DE CASA EN CASA");

					(excelWorksheet.Cells[4, 22] as Range).Value = "fecha:";
					
					
					(excelWorksheet.Cells[49, 22] as Range).Value = (excelWorksheet.Cells[49, 22] as Range).Value.ToString().Replace("{revisedTitle}", "Revisado en");
					(excelWorksheet.Cells[49, 22] as Range).Value = (excelWorksheet.Cells[49, 22] as Range).Value.ToString().Replace("{dateRevised}", DateTime.Now.ToString("d/M/yyyy"));

					(excelWorksheet.Cells[6, 23] as Range).Value = sheet.First().streetName;
					
					var previousStreetName = sheet.First().streetName;
					for (int i = 1; i <= maxAddressCountPerSheet; i++)
					{
						if (i > sheet.Count)
						{
							//clear the rest of the excel fields
							(excelWorksheet.Cells[i + 6, 23] as Range).Font.Bold = false;
							(excelWorksheet.Cells[i + 6, 23] as Range).Value = "";
							(excelWorksheet.Cells[i + 6, 28] as Range).Value = "";
						}
						else if(!previousStreetName.Equals(sheet[i - 1].streetName))
						{
							(excelWorksheet.Cells[i + 6, 23] as Range).Font.Bold = true;
							(excelWorksheet.Cells[i + 6, 23] as Range).Value = sheet[i - 1].streetName;
							previousStreetName = sheet[i - 1].streetName;
						}
						else
						{
							(excelWorksheet.Cells[i + 6, 23] as Range).Font.Bold = false;
							(excelWorksheet.Cells[i + 6, 23] as Range).Value = sheet[i - 1].streetAddress;
							(excelWorksheet.Cells[i + 6, 28] as Range).Value = sheet[i - 1].status;
						}
					}
				}
				
				if (sheetCounter % 2 == 0 || sheetCounter == sheets.Count)
				{
					if (sheetCounter % 2 == 0)
					{
						excelWorkbook.SaveCopyAs(Path.Combine(simpleTemplate.Parent.FullName, $"Territorio-{territory.Territory}.{firstPageNumber}_{secondPageNumber}.xlsx"));
					}
					else
					{
						//clear last page
						(excelWorksheet.Cells[1, 22] as Range).Value = "";
						(excelWorksheet.Cells[1, 26] as Range).Value = "";
						(excelWorksheet.Cells[1, 27] as Range).Value = "";
						(excelWorksheet.Cells[1, 30] as Range).Value = "";
						(excelWorksheet.Cells[1, 34] as Range).Value = "";
						(excelWorksheet.Cells[1, 37] as Range).Value = "";
						(excelWorksheet.Cells[1, 39] as Range).Value = "";
						(excelWorksheet.Cells[1, 41] as Range).Value = "";
						(excelWorksheet.Cells[1, 42] as Range).Value = "";
						(excelWorksheet.Cells[1, 43] as Range).Value = "";

						(excelWorksheet.Cells[2, 22] as Range).Value = (excelWorksheet.Cells[2, 1] as Range).Value.ToString().Replace("{type}", "");

						(excelWorksheet.Cells[4, 22] as Range).Value = "fecha:";

						(excelWorksheet.Cells[49, 22] as Range).Value = "";

						for (int i = 1; i <= maxAddressCountPerSheet; i++)
						{
							//clear the rest of the excel fields
							(excelWorksheet.Cells[i + 6, 23] as Range).Font.Bold = false;
							(excelWorksheet.Cells[i + 6, 23] as Range).Value = "";
							(excelWorksheet.Cells[i + 6, 28] as Range).Value = "";
						}

						excelWorkbook.SaveCopyAs(Path.Combine(simpleTemplate.Parent.FullName, $"Territorio-{territory.Territory}.{firstPageNumber}.xlsx"));
					}
				}
			}
		}
	}

	excelWorkbook.Close();
	app.Quit();
}
catch (Exception ex)
{
	excelWorkbook.Close();
	Console.WriteLine(ex.Message);
}