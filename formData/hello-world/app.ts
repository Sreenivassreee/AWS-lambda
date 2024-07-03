import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
import { Document, MongoClient } from 'mongodb';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        const uri = 'mongodb+srv://Admin:Admin@ispace.vvqupbz.mongodb.net/?retryWrites=true&w=majority&appName=ISpace'
        const client = new MongoClient(uri);
        await client.connect();
        console.log("Connected..........................")
        const db = client.db("submittions");
        const col = db.collection("submittions");
        const body=JSON.parse(event.body||'')
        const data={... body,"CreatedAt":new Date()};
        console.log(data)

        const document = await col.insertOne(data)
        console.log(document)
        await client.close();
        console.log("DisConnected..........................", JSON.stringify(event.body))

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: event.body
            }),
        };

    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
