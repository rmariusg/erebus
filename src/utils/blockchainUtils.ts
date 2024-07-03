import { APIRequestContext } from '@playwright/test';
import { getEnvVar } from '../config';
import { sendRpcRequest } from './rpcUtils';

const nodeUrl = getEnvVar('SEPOLIA_NODE_URL');

export const fetchLatestBlockAndTransactionHash = async (
  request: APIRequestContext,
): Promise<string> => {
  // Fetch the latest block number
  const blockNumberResponse = await sendRpcRequest(request, nodeUrl, 'eth_blockNumber', [], 1);
  if (!blockNumberResponse.ok()) {
    throw new Error('Failed to fetch the latest block number');
  }
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
  if (!blockDetailsResponse.ok()) {
    throw new Error('Failed to fetch the latest block details');
  }
  const blockDetailsResult = await blockDetailsResponse.json();
  const latestBlockDetails = blockDetailsResult.result;

  // Check that the block contains transactions
  if (
    !Array.isArray(latestBlockDetails.transactions) ||
    latestBlockDetails.transactions.length === 0
  ) {
    throw new Error('No transactions found in the latest block');
  }

  // Get the first transaction hash from the latest block
  const transactionHash = latestBlockDetails.transactions[0].hash;

  return transactionHash;
};
