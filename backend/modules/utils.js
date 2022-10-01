const {BigQuery} = require('@google-cloud/bigquery');

const options = {
  keyFilename: '/Users/prashanth/.config/gcloud/application_default_credentials.json',
  projectId: 'cmpe255-363307',
};

const bigquery = new BigQuery(options);

async function query(table_name) {
// Queries the U.S. given names dataset for the state of Texas.
	const project_id = 'cmpe255-363307';
	const dataset_id = 'hw_chicago_trips';
    const query = `SELECT *
      FROM \`${project_id}.${dataset_id}.${table_name}\`
    `;

    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    const options = {
      query: query,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'US',
    };

    // Run the query as a job
    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);

    // Wait for the query to finish
    const [rows] = await job.getQueryResults();
    return rows;
}

module.exports = {
	query
}