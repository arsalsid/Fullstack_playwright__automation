import { test, expect } from '@playwright/test';
import { OBJECTS_API_URL } from '../../Fixtures/constants.ts';
import * as dotenv from 'dotenv'

//load API URL from dotenv file
dotenv.config();

test('GET /objects should return list of objects', async ({ request }) => {
    const response = await request.get(process.env.OBJECTS_API_URL!);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    console.log("Response : ",response);

    const responseBody = await response.json();
    console.log("Response Body : ",responseBody);
    
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);

    //validate a minimal shape for at least one object.
    expect(responseBody[0]).toHaveProperty('id');
    expect(responseBody[0]).toHaveProperty('name');

})