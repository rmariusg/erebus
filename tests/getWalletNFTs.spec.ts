import { test, expect } from '@playwright/test';
import { getWalletNFTs } from '../src/utils/nftUtils';
import { getEnvVar } from '../src/config';

test.describe('Functional Tests for getWalletNFTs Endpoint', () => {
  const walletAddress = getEnvVar('WALLET_ADDRESS');

  test('Valid wallet address should return NFTs', async () => {
    const nfts = await getWalletNFTs(walletAddress);
    expect(nfts).toBeDefined();
    expect(nfts).toHaveProperty('result');
    expect(Array.isArray(nfts.result)).toBe(true);
  });

  test('Invalid wallet address should return an error', async () => {
    try {
      const walletAddress = 'invalid_wallet_address';
      await getWalletNFTs(walletAddress);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test('Valid wallet address with invalid chain should return an error', async () => {
    try {
      await getWalletNFTs(walletAddress, 'invalid_chain');
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test('Valid wallet address with valid chain should return NFTs', async () => {
    const nfts = await getWalletNFTs(walletAddress, 'bsc');
    expect(nfts).toBeDefined();
    expect(nfts).toHaveProperty('result');
    expect(Array.isArray(nfts.result)).toBe(true);
  });
});
