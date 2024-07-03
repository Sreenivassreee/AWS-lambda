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
     
        const documents = await col.find().sort({ CreatedAt: 1 }).toArray(); 
        
        console.log(documents)
        await client.close();
        console.log("DisConnected..........................", JSON.stringify(event.body))

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: documents
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
