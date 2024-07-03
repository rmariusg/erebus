import { test, expect } from '@playwright/test';
import { getEnvVar } from '../src/config';
import { sendRpcRequest } from '../src/utils/rpcUtils';

const nodeUrl = getEnvVar('SEPOLIA_NODE_URL');

test.describe('Scenario: End-to-End Blockchain Interaction using RPC Methods', () => {
  test('should fetch latest block number, block details, and a transaction details', async ({
    request,
  }) => {
    // Fetch the latest block number
    const blockNumberResponse = await sendRpcRequest(request, nodeUrl, 'eth_blockNumber', [], 1);
    expect(blockNumberResponse.ok()).toBeTruthy();
    const blockNumberResult = await blockNumberResponse.json();
    const latestBlockNumber = blockNumberResult.result;

    console.log(`Latest Block Number: ${latestBlockNumber}`);

    // Fetch the details of the latest block
    const blockDetailsResponse = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_getBlockByNumber',
      [latestBlockNumber, true],
      1,
    );
    expect(blockDetailsResponse.ok()).toBeTruthy();
    const blockDetailsResult = await blockDetailsResponse.json();
    const latestBlockDetails = blockDetailsResult.result;

    console.log(`Latest Block Details: ${JSON.stringify(latestBlockDetails)}`);

    // Check that the block contains transactions
    expect(Array.isArray(latestBlockDetails.transactions)).toBe(true);
    expect(latestBlockDetails.transactions.length).toBeGreaterThan(0);

    // Get the first transaction hash from the latest block
    const transactionHash = latestBlockDetails.transactions[0].hash;

    console.log(`Transaction Hash: ${transactionHash}`);

    // Fetch the details of a transaction from the latest block
    const transactionDetailsResponse = await sendRpcRequest(
      request,
      nodeUrl,
      'eth_getTransactionByHash',
      [transactionHash],
      1,
    );
    expect(transactionDetailsResponse.ok()).toBeTruthy();
    const transactionDetailsResult = await transactionDetailsResponse.json();
    const transactionDetails = transactionDetailsResult.result;

    console.log(`Transaction Details: ${JSON.stringify(transactionDetails)}`);

    // Verify the transaction details
    expect(transactionDetails).toHaveProperty('hash');
    expect(transactionDetails).toHaveProperty('blockHash');
    expect(transactionDetails).toHaveProperty('from');
    expect(transactionDetails).toHaveProperty('to');
    expect(transactionDetails).toHaveProperty('value');
    expect(transactionDetails).toHaveProperty('gas');
    expect(transactionDetails).toHaveProperty('gasPrice');
  });
});
