const aws = require('aws-sdk')
const cognito = new aws.CognitoIdentityServiceProvider()
const docClient = new aws.DynamoDB.DocumentClient();
/* Amplify Params - DO NOT EDIT
	API_ROFFERS_GRAPHQLAPIENDPOINTOUTPUT
	API_ROFFERS_GRAPHQLAPIIDOUTPUT
	API_ROFFERS_GRAPHQLAPIKEYOUTPUT
	AUTH_ROFFERS_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    let params = JSON.parse(event.body)
    let name = 'la casa de la ver'
    let date = new Date()

    await docClient.put({
        TableName : process.env.API_ROFFERS_OFFERSTABLE_NAME,
        Item : {
            id : `${params.email}-${name.split(" ").join("")}`,
            name : params.name,
            owner : params.username,
            createdAt : date.toISOString(),
            updatedAt : date.toISOString(),
            _version : 1,
            _lastChangedAt : date.getTime(),
            __typename : 'Offer'
        }
    }).promise()


    return {
        statusCode: 200,
        headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(`created bro`),
    };
};
