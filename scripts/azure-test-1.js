(async () => {
	require('dotenv').config({path: '../.env'});
	const sql = require('mssql')
	try {
		await sql.connect(process.env.CONNECTION_STRING);
		const result = await sql.query(`SELECT TOP (1) [id]
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
		console.dir(result)
	} catch (err) {
		console.log(`err`);
		console.log(err);
	}
})();