const mssql = require('mssql');
require('dotenv').config({path: '../.env'});

const config = {
  server: 'hs-dwh-ondemand.sql.azuresynapse.net',
  authentication: {
    type: 'azure-active-directory-password',
    options: {
			userName: process.env.USER_NAME,
      password: process.env.PASSWORD,
      clientId:  process.env.AZURE_CLIENT_ID,
    },
  },
  options: {
    encrypt: true,
    database: 'FCL',
  },
};  

async function connectAndQuery() {
  try {
    // Create connection using AAD credentials
    await mssql.connect(config);

    // Define your query
    const query = `SELECT TOP (1) [id]
		,[Source_ID]
		,[created_at]
		,[contact type]
		,[user_email]
		,[user_name]
		,[state_region]
		,[country]
		,[expiry_date]
		,[communication_contact]
		,[user_id]
		,[marketing_lead_status]
		,[course_name]
		,[course_id]
		,[Phone_number]
		,[DOB]
		,[percentage_completed]
		,[program]
		,[completed_at]
		,[Program_contact_status]
		,[expired]
		,[is_free_trial]
		,[address]
		,[postal_code]
		,[completed]
		,[started_at]
		,[activated_at]
		,[updated_at]
		FROM [dbo].[FCLSandbox]`; // Replace with your query

    // Execute the query
    const result = await mssql.query(query);

    // Process the results (example: print to console)
    console.log(result.recordset);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the connection pool (automatic with mssql.query)
  }
}

connectAndQuery();
