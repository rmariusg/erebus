# eth_getBlockByNumber Test Cases

## Test Case 1: Valid Request to Fetch Block Information by Block Number

- **Description:** Send a valid request to `eth_getBlockByNumber` with a valid block number and verify that the response contains detailed information about the block.
- **Expected Result:** Response status is 200. The response contains details such as block hash, parent hash, transactions, timestamp, etc.

## Test Case 2: Fetch Block Information with Full Transaction Objects

- **Description:** Send a request to `eth_getBlockByNumber` with the parameter `'latest'` for the block number and `true` to include full transaction objects. Verify that the response contains transaction objects with properties such as `hash`, `from`, and `to`.
- **Expected Result:** Response status is 200. The response contains detailed transaction objects.

## Test Case 3: Fetch Earliest Block Information

- **Description:** Send a request to `eth_getBlockByNumber` with the parameter `'earliest'` for the block number and `false` to not include transactions. Verify that the response contains basic block information.
- **Expected Result:** Response status is 200. The response contains basic block information.

## Test Case 4: Fetch Pending Block Information

- **Description:** Send a request to `eth_getBlockByNumber` with the parameter `'pending'` for the block number and `false` to not include transactions. Verify that the response contains basic block information.
- **Expected Result:** Response status is 200. The response contains basic block information.

## Test Case 5: Invalid Method Name

- **Description:** Send a request with an invalid method name and verify that the response returns an error.
- **Expected Result:** Response status is 400 or appropriate error status. The response contains an error message.

## Test Case 6: Missing JSON-RPC Version

- **Description:** Send a request missing the `jsonrpc` version and verify that the response returns an error.
- **Expected Result:** Response status is 400 or appropriate error status. The response contains an error message.

## Test Case 7: Invalid Block Number Format

- **Description:** Send a request with an invalid block number format and verify that the response returns an error.
- **Expected Result:** Response status is 400 or appropriate error status. The response contains an error message.

## Test Case 8: Invalid JSON Structure

- **Description:** Send a request with an invalid JSON structure and verify that the response returns an error.
- **Expected Result:** Response status is 400 or appropriate error status. The response contains an error message.
