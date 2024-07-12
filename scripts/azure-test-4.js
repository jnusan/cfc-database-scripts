const mssql = require('mssql');
require('dotenv').config({path: '../.env'});

// Configure connection options (update with your details)
const config = {
  server: 'hs-dwh-ondemand.sql.azuresynapse.net',
  connectionOptions: {
    encrypt: true,
    database: 'FCL',
    rejectUnauthorized: false
  },
};

async function connectAndQuery() {
  try {
    // Create connection using AAD credentials (replace with your details)
    await mssql.connect({
      server: config.server,
      options: config.connectionOptions,
      authentication: {
        type: 'azure-active-directory-default',
        options: {
          user: process.env.USER_NAME,
          password: process.env.PASSWORD,
          clientId: process.env.AZURE_CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          tenantId: process.env.AZURE_TENANT_ID
        },
      },
    });

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
		FROM [dbo].[FCLSandbox]`;

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