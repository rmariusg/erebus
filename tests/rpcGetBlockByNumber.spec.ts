import { test, expect } from '@playwright/test';
import { getEnvVar } from '../src/config';
import { sendRpcRequest } from '../src/utils/rpcUtils';

const nodeUrl = getEnvVar('SEPOLIA_NODE_URL');

test.describe('eth_getBlockByNumber Method Tests', () => {
  test('Valid Request to Fetch Block Information by Block Number', async ({ request }) => {
    const response = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_getBlockByNumber',
      ['latest', false],
      1,
    );
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.result).toHaveProperty('hash');
    expect(result.result).toHaveProperty('parentHash');
    expect(result.result).toHaveProperty('transactions');
  });

  test('Fetch Block Information with Full Transaction Objects', async ({ request }) => {
    const response = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_getBlockByNumber',
      ['latest', true],
      1,
    );
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.result).toHaveProperty('transactions');
    expect(Array.isArray(result.result.transactions)).toBe(true);
    if (result.result.transactions.length > 0) {
      expect(result.result.transactions[0]).toHaveProperty('hash');
      expect(result.result.transactions[0]).toHaveProperty('from');
      expect(result.result.transactions[0]).toHaveProperty('to');
    }
  });

  test('Fetch Earliest Block Information', async ({ request }) => {
    const response = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_getBlockByNumber',
      ['earliest', false],
      1,
    );
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.result).toHaveProperty('hash');
    expect(result.result).toHaveProperty('parentHash');
  });

  test('Fetch Pending Block Information', async ({ request }) => {
    const response = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_getBlockByNumber',
      ['pending', false],
      1,
    );
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.result).toHaveProperty('hash');
    expect(result.result).toHaveProperty('parentHash');
  });

  test('Invalid Method Name', async ({ request }) => {
    const response = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_invalidMethod',
      ['latest', false],
      1,
    );
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result.message).toBeDefined();
  });

  test('Missing JSON-RPC Version', async ({ request }) => {
    const response = await request.post(nodeUrl, {
      data: {
        method: 'eth_getBlockByNumber',
        params: ['latest', false],
        id: 1,
      },
    });
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result.error).toBeDefined();
  });

  test('Invalid Block Number Format', async ({ request }) => {
    const response = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_getBlockByNumber',
      ['invalidBlockNumber', false],
      1,
    );
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result.error).toBeDefined();
  });

  test('Invalid JSON Structure', async ({ request }) => {
    const response = await request.post(nodeUrl, {
      data: 'invalidJSONStructure',
    });
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result.message).toBeDefined();
  });
});
