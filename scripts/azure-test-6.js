const sql = require('mssql');
require('dotenv').config({path: '../.env'});

const config = {
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  server: "hs-dwh-ondemand.sql.azuresynapse.net",
  database: "FCL",
  options: {
    encrypt: true // Important for secure connection
  }
};

sql.connect(config)
  .then(pool => {
    // Perform your database operations here using pool.request()
    console.log("Connected to database");
    return pool.request()
      .query(`SELECT TOP (1) [id]
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
		FROM [dbo].[FCLSandbox]`)
      .then(result => {
        console.log(result.recordset);
      })
  })
  .catch(err => {
    console.error("Error connecting to database:", err);
  });
