## Test Cases

### 1. Valid Wallet Address Should Return NFTs

**Description:**
This test checks if the `getWalletNFTs` endpoint returns a list of NFTs for a valid wallet address.

**Steps:**

1. Use a valid wallet address.
2. Call the `getWalletNFTs` endpoint with the valid wallet address.

**Expected Result:**

- The response should contain a `result` property.
- The `result` property should be an array.
- The array should contain NFT objects.

### 2. Invalid Wallet Address Should Return an Error

**Description:**
This test checks if the `getWalletNFTs` endpoint returns an error for an invalid wallet address.

**Steps:**

1. Use an invalid wallet address (e.g., 'invalid_wallet_address').
2. Call the `getWalletNFTs` endpoint with the invalid wallet address.

**Expected Result:**

- The response should return a status code of 400.
- An error message should be included in the response indicating the invalid wallet address.

### 3. Valid Wallet Address with Invalid Chain Should Return an Error

**Description:**
This test checks if the `getWalletNFTs` endpoint returns an error when called with a valid wallet address but an invalid chain parameter.

**Steps:**

1. Use a valid wallet address.
2. Call the `getWalletNFTs` endpoint with the valid wallet address and an invalid chain parameter (e.g., 'invalid_chain').

**Expected Result:**

- The response should return a status code of 400.
- An error message should be included in the response indicating the invalid chain parameter.

### 4. Valid Wallet Address with Valid Chain Should Return NFTs

**Description:**
This test checks if the `getWalletNFTs` endpoint returns a list of NFTs for a valid wallet address and a valid chain parameter.

**Steps:**

1. Use a valid wallet address.
2. Call the `getWalletNFTs` endpoint with the valid wallet address and a valid chain parameter (e.g., 'bsc').

**Expected Result:**

- The response should contain a `result` property.
- The `result` property should be an array.
- The array should contain NFT objects.
