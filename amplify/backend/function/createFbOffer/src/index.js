reaconst { initializeApp } = require("firebase-admin/app");

initializeApp();
/* Amplify Params - DO NOT EDIT
	API_ROFFERS_GRAPHQLAPIENDPOINTOUTPUT
	API_ROFFERS_GRAPHQLAPIIDOUTPUT
	API_ROFFERS_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  return Promise.resolve('Successfully processed DynamoDB record');
};
