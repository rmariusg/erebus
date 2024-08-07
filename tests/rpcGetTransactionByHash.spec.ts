import { test, expect } from '@playwright/test';
import { getEnvVar } from '../src/config';
import { sendRpcRequest } from '../src/utils/rpcUtils';
import { fetchLatestBlockAndTransactionHash } from '../src/utils/blockchainUtils';

const nodeUrl = getEnvVar('SEPOLIA_NODE_URL');

test.describe('eth_getTransactionByHash Method Tests', () => {
  test('Valid Request to Fetch Transaction by Hash', async ({ request }) => {
    const validTransactionHash = await fetchLatestBlockAndTransactionHash(request);

    const response = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_getTransactionByHash',
      [validTransactionHash],
      1,
    );
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.result).toHaveProperty('hash');
    expect(result.result).toHaveProperty('blockHash');
    expect(result.result).toHaveProperty('from');
    expect(result.result).toHaveProperty('to');
    expect(result.result).toHaveProperty('value');
    expect(result.result).toHaveProperty('gas');
    expect(result.result).toHaveProperty('gasPrice');
  });

  test('Invalid Method Name', async ({ request }) => {
    const validTransactionHash = await fetchLatestBlockAndTransactionHash(request);

    const response = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_invalidMethod',
      [validTransactionHash],
      1,
    );
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result.message).toBeDefined();
  });

  test('Missing JSON-RPC Version', async ({ request }) => {
    const validTransactionHash = await fetchLatestBlockAndTransactionHash(request);

    const response = await request.post(nodeUrl, {
      data: {
        method: 'eth_getTransactionByHash',
        params: [validTransactionHash],
        id: 1,
      },
    });
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result.message).toBeDefined();
  });

  test('Invalid Transaction Hash Format', async ({ request }) => {
    const response = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_getTransactionByHash',
      ['invalidTransactionHash'],
      1,
    );
    expect(response.status()).toBe(400);
    const result = await response.json();
    expect(result.message).toBeDefined();
  });

  test('Non-existent Transaction Hash', async ({ request }) => {
    const nonExistentTransactionHash =
      '0x0000000000000000000000000000000000000000000000000000000000000000';
    const response = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_getTransactionByHash',
      [nonExistentTransactionHash],
      1,
    );
    expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.result).toBeNull();
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
