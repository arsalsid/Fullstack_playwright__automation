import { test, expect } from '@playwright/test';
import { OBJECTS_API_URL } from '../../Fixtures/constants.ts';

test('GET /objects should return list of objects', async ({ request }) => {
    const response = await request.get(OBJECTS_API_URL);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    //validate a minimal shape for at least one object.
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('name');

})