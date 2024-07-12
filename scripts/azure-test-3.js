const msal = require('@azure/msal-node');
require('dotenv').config({path: '../.env'});

async function getAccessToken() {
  const config = {
    auth: {
      clientId: process.env.AZURE_CLIENT_ID,
      authority: `https://login.microsoftonline.com/5ab4d2b9-b021-48c1-8dad-b6e3b7e5a12b`,
      clientSecret: process.env.CLIENT_SECRET
    }
  };

  const cca = new msal.ConfidentialClientApplication(config);
  const request = {
    scopes: [
      'https://database.windows.net/.default'
    ]
  };

  try {
    const result = await cca.acquireTokenByClientCredential(request);
    return result.accessToken;
  } catch (error) {
    console.error('Error acquiring access token:', error);
    throw error; // Re-throw for handling in the calling function
  }
}

const sql = require('mssql');

async function connectToDatabase(accessToken) {
  // const accessToken = await getAccessToken();
  const connectionConfig = {
    server: 'hs-dwh-ondemand.sql.azuresynapse.net',
    database: 'FCL',
    options: {
      encrypt: true,
      accessToken
    }
  };

  try {
    const pool = await sql.connect(connectionConfig);
    console.log('Connected to Azure Synapse Analytics SQL Database');
    // Perform database operations here
    await pool.request().query(`SELECT TOP (1) [id]
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
		 FROM [dbo].[FCLSandbox]`);  // Example query
    console.log('Query successful');
  } catch (error) {
    console.error('Error connecting to database:', error);
  } finally {
    await pool.close();
  }
}



(async () => {
  try {
    const token = await getAccessToken();
    await connectToDatabase(token);
  } catch (error) {
    console.log(error);
  }
})();