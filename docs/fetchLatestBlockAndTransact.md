# Test Case: Fetch Latest Block and Transaction Details

## Description

This test case performs an end-to-end interaction with the blockchain using three RPC methods: `eth_blockNumber`, `eth_getBlockByNumber`, and `eth_getTransactionByHash`. The test fetches the latest block number, retrieves the block details, and then gets details of a transaction from the latest block.

## Steps

1. **Fetch the latest block number using `eth_blockNumber`:**

   - Send a request to `eth_blockNumber` to get the latest block number.
   - Verify that the response is successful and extract the block number.

2. **Fetch the details of the latest block using `eth_getBlockByNumber`:**

   - Send a request to `eth_getBlockByNumber` with the latest block number and the parameter `true` to include full transaction objects.
   - Verify that the response is successful and extract the block details.
   - Check that the block contains transactions and get the hash of the first transaction.

3. **Fetch the details of a transaction from the latest block using `eth_getTransactionByHash`:**
   - Send a request to `eth_getTransactionByHash` with the transaction hash.
   - Verify that the response is successful and extract the transaction details.
   - Check that the transaction details include essential properties such as `hash`, `blockHash`, `from`, `to`, `value`, `gas`, and `gasPrice`.

## Expected Results

1. The latest block number should be fetched successfully.
2. The details of the latest block should be fetched successfully.
3. The details of a transaction from the latest block should be fetched successfully.
