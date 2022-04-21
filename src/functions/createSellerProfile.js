const aws = require('aws-sdk')
const cognito = new aws.CognitoIdentityServiceProvider();
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
    let params = JSON.parse(event.body)
    let date = new Date()
    let profile = {
        id : `${params.username}-${params.name.split(" ").join("")}`,
        name : params.name,
        owner : params.username,
        verified : false,
        createdAt : date.toISOString(),
        updatedAt : date.toISOString(),
        _version : 1,
        _lastChangedAt : date.getTime(),
        __typename : 'Seller'
    }

    await cognito.adminAddUserToGroup({
        GroupName : 'seller',
        Username : params.username,
        UserPoolId : process.env.AUTH_ROFFERS_USERPOOLID
    }).promise()

    await docClient.put({
                TableName : process.env.API_ROFFERS_SELLERTABLE_NAME,
                Item : profile
            }).promise()

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
        headers: {
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(profile),
    };
};
