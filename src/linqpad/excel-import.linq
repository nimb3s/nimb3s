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

//https://stackoverflow.com/questions/18993735/how-to-read-single-excel-cell-value
// Get-Process | Where-Object {$_.Path -like "*excel*"} | stop-process -force  -processname {$_.ProcessName}  
var territoryDir = new DirectoryInfo(@"C:\sandbox\Territorio Southport\Territorios");

Application app = new Application();

foreach (var fileInfo in territoryDir.EnumerateFiles("*.xls", SearchOption.AllDirectories))
//territoryDir.EnumerateFiles("*.xls", SearchOption.AllDirectories).AsParallel().ForAll(async fileInfo =>
{
	Workbook excelWorkbook = null;
	
	try
	{
		excelWorkbook = app.Workbooks.Open(fileInfo.FullName);
		using (var db = new Gaia.GaiaEntities())
		{
			Console.WriteLine($"Working on: {fileInfo.FullName}");

			//console.WriteLine("first sheet");

			Sheets excelSheets = excelWorkbook.Worksheets;
			Worksheet excelWorksheet = (Worksheet)excelSheets[1];

			//		//console.WriteLine("first page");

			var territory = (string)(excelWorksheet.Cells[1, 1] as Range).Value;
			var city = (string)(excelWorksheet.Cells[1, 7] as Range).Value;
			var zipCode = (string)(excelWorksheet.Cells[4, 2] as Range).Value;
			var firstStreetName = (string)(excelWorksheet.Cells[7, 2] as Range).Value;

			territory = territory.Replace("Territorio: ", "");
			zipCode = zipCode.Replace("Zip code: ", "");
			//console.WriteLine($"territory: {territory}");
			//console.WriteLine($"city: {city}");
			//console.WriteLine($"zipcode: {zipCode}");
			//console.WriteLine($"street: {firstStreetName}");

			for (int i = 8; i < 47; i++)
			{
				//street name and address
				string address = null;
				string streetName = null;
				bool isStreetName = false;

				Range addressCell = excelWorksheet.Cells[i, 2] as Range;

				if (String.IsNullOrEmpty(addressCell.Text.ToString()) || String.IsNullOrWhiteSpace(addressCell.Text.ToString()))
					continue;

				for (int index = 1; index <= addressCell.Text.ToString().Length; index++)
				{
					Characters ch = addressCell.get_Characters(index, 1);
					bool bold = (bool)ch.Font.Bold;
					if (bold)
					{
						isStreetName = true;
						firstStreetName = addressCell.Text.ToString();
					}
					
					break;
				}

				if (!isStreetName)
				{
					address = addressCell.Text.ToString();
				}
				
				if(address != null)
				{
					//phone
					var phone = (excelWorksheet.Cells[i, 3] as Range).Text.ToString();
					var status = (excelWorksheet.Cells[i, 4] as Range).Text.ToString();
					
					bool isPhoneInvalid = false;
					bool isStatusInvalid = false;

					var gaia = new Gaia.territory
					{
						territory1 = territory.Trim(),
						fileName = fileInfo.FullName.Trim(),
						city = city.Trim(),
						zipcode = zipCode.Trim(),
						streetName = firstStreetName.Trim(),
						streetAddress = address.Trim(),
						phone = phone.Trim(),
					};
					
					gaia.phone = phone.Trim();
					gaia.status = status.Trim();
					
					if (status.Any(char.IsDigit) && status.Any())
					{
						isStatusInvalid = true;
						gaia.phone = status.Trim();
						gaia.status = null;
					}

					if (!phone.Any(char.IsDigit) && phone.Any())
					{
						gaia.status = phone.Trim();
						gaia.phone = null;
					}

					if (String.IsNullOrEmpty(gaia.phone) || String.IsNullOrWhiteSpace(gaia.phone))
						gaia.phone = null;

					if (String.IsNullOrEmpty(gaia.status) || String.IsNullOrWhiteSpace(gaia.status))
						gaia.status = null;

					db.territories.Add(gaia);
				}
			}

			//console.WriteLine("second sheet");

			var ssTerritory = (string)(excelWorksheet.Cells[1, 10] as Range).Value;
			var ssSheetCity = (string)(excelWorksheet.Cells[1, 12] as Range).Value;
			var ssSheetZipCode = (string)(excelWorksheet.Cells[4, 11] as Range).Value;
			var ssFirstStreetName = (string)(excelWorksheet.Cells[7, 11] as Range).Value;

			ssTerritory = ssTerritory.Replace("Territorio: ", "");
			ssSheetZipCode = ssSheetZipCode.Replace("Zip code: ", "");
			//console.WriteLine($"territory: {ssTerritory}");
			//console.WriteLine($"city: {ssSheetCity}");
			//console.WriteLine($"zipcode: {ssSheetZipCode}");
			//console.WriteLine($"street: {ssFirstStreetName}");

			for (int i = 8; i < 47; i++)
			{
				//street name and address

				string address = null;
				string streetName = null;
				bool isStreetName = false;

				Range addressCell = excelWorksheet.Cells[i, 11] as Range;

				if (String.IsNullOrEmpty(addressCell.Text.ToString()) || String.IsNullOrWhiteSpace(addressCell.Text.ToString()))
					continue;

				for (int index = 1; index <= addressCell.Text.ToString().Length; index++)
				{
					Characters ch = addressCell.get_Characters(index, 1);
					bool bold = (bool)ch.Font.Bold;
					if (bold)
					{
						isStreetName = true;
						ssFirstStreetName = addressCell.Text.ToString();
					}
					
					break;
				}

				if (!isStreetName)
				{
					address = addressCell.Text.ToString();
				}

				if (address != null)
				{
					//phone
					var phone = (excelWorksheet.Cells[i, 12] as Range).Text.ToString();
					var status = (excelWorksheet.Cells[i, 13] as Range).Text.ToString();

					bool isPhoneInvalid = false;
					bool isStatusInvalid = false;

					var gaia = new Gaia.territory
					{
						territory1 = ssTerritory.Trim(),
						fileName = fileInfo.FullName.Trim(),
						city = ssSheetCity.Trim(),
						zipcode = ssSheetZipCode.Trim(),
						streetName = ssFirstStreetName.Trim(),
						streetAddress = address.Trim(),
					};

					gaia.phone = phone.Trim();
					gaia.status = status.Trim();

					if (status.Any(char.IsDigit) && status.Any())
					{
						isStatusInvalid = true;
						gaia.phone = status.Trim();
						gaia.status = null;
					}

					if (!phone.Any(char.IsDigit) && phone.Any())
					{
						gaia.status = phone.Trim();
						gaia.phone = null;
					}

					if (String.IsNullOrEmpty(gaia.phone) || String.IsNullOrWhiteSpace(gaia.phone))
						gaia.phone = null;

					if (String.IsNullOrEmpty(gaia.status) || String.IsNullOrWhiteSpace(gaia.status))
						gaia.status = null;

					db.territories.Add(gaia);
				}
			}

			await db.SaveChangesAsync();
			excelWorkbook.Close();
		}
	}
	catch (Exception ex)
	{

		Console.WriteLine($"FAILED: {fileInfo.FullName} {ex.Message}");
		if(excelWorkbook != null)
		{
			excelWorkbook.Close();	
		}
	}
}
//);