const sql = require('mssql');
require('dotenv').config({path: '../.env'});

const config = {
  server: 'hs-dwh-ondemand.sql.azuresynapse.net',
  database: 'FCL',
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
  authentication: {
    type: 'azure-active-directory-password',
    options: {
      userName: process.env.USER_NAME,
      password: process.env.PASSWORD,
      clientId: process.env.AZURE_CLIENT_ID,
      tenantId: process.env.AZURE_TENANT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }
  },
  driver: 'msnodesqlv8',
};

async function testConnection() {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(`SELECT TOP (1) [id]
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
		FROM [dbo].[FCLSandbox]`);

    console.log('Connected to the database. Server version:', result.recordset[0].version);

    await pool.close();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testConnection();
