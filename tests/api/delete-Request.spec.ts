import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import requestBody from '../../Fixtures/request-body.json';

dotenv.config();

test('DELETE /objects/{id} should delete an object', async ({ request }) => {
    const createResponse = await request.post(process.env.POST_REQUEST_API_URL!, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: requestBody,
    });

    expect(createResponse.ok()).toBeTruthy();
    const createdObject = await createResponse.json();
    const objectId = createdObject.id;

    const deleteUrl = process.env.DELETE_REQUEST_API_URL!.replace('{id}', objectId);
    const response = await request.delete(deleteUrl);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    console.log('Response : ', response);

    const responseBody = await response.json();
    console.log('Response Body : ', responseBody);

    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toContain(objectId);
});
