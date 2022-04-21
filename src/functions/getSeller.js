const aws = require('aws-sdk')
const docClient = new aws.DynamoDB.DocumentClient();
/* Amplify Params - DO NOT EDIT
	API_ROFFERS_GRAPHQLAPIENDPOINTOUTPUT
	API_ROFFERS_GRAPHQLAPIIDOUTPUT
	API_ROFFERS_OFFERTABLE_ARN
	API_ROFFERS_OFFERTABLE_NAME
	API_ROFFERS_SELLERTABLE_ARN
	API_ROFFERS_SELLERTABLE_NAME
	AUTH_ROFFERS_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);


   const user = await docClient.query({
        TableName : process.env.API_ROFFERS_SELLERTABLE_NAME,
        IndexName: 'byOwner',
        KeyConditionExpression: "#own = :ownn",
        ExpressionAttributeNames:{
            "#own": "owner"
        },
        ExpressionAttributeValues: {
            ":ownn": event.body.username
        }
    }).promise()
    console.log('nonde?',user.Items)

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify(user),
    };
};
