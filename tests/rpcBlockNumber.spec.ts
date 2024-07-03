import { test, expect } from '@playwright/test';
import { getEnvVar } from '../src/config';
import { sendRpcRequest } from '../src/utils/rpcUtils';

const nodeUrl = getEnvVar('SEPOLIA_NODE_URL');

test.describe('eth_blockNumber Method Tests', () => {
  test('Valid Request to Fetch Current Block Number', async ({ request }) => {
    const response = await sendRpcRequest(request, nodeUrl, 'eth_blockNumber', [], 1);
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.result).toMatch(/^0x[0-9a-fA-F]+$/);
  });

  test('Invalid Method Name', async ({ request }) => {
    const response = await sendRpcRequest(request, nodeUrl, 'eth_invalidMethod', [], 1);
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result.message).toBeDefined();
  });

  test('Missing JSON-RPC Version', async ({ request }) => {
    const response = await request.post(nodeUrl, {
      data: {
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      },
    });
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result.message).toBeDefined();
  });

  test('Invalid Parameters', async ({ request }) => {
    const response = await sendRpcRequest(request, nodeUrl, 'eth_blockNumber', ['invalidParam'], 1);
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result.message).toBeDefined();
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
