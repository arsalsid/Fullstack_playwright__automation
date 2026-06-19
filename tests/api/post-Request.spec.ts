import { test, expect } from '@playwright/test';
import fs from 'fs';
import * as dotenv from 'dotenv'
import { POST_REQUEST_API_URL } from '../../Fixtures/constants.ts';
import requestBody from '../../Fixtures/request-body.json';

//load API URL from dotenv file
dotenv.config();

//load request body from Json File
const data = JSON.parse(
    fs.readFileSync('./Fixtures/request-body.json', 'utf8')
  )

test('POST /objects should create a new object', async ({ request }) => {
    const response = await request.post(process.env.POST_REQUEST_API_URL!, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: requestBody,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name', requestBody.name);
    expect(body).toHaveProperty('createdAt');
    expect(body.data).toEqual(requestBody.data);
});
