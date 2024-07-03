import axios from 'axios';
import { getEnvVar } from '../config';

const apiKey = getEnvVar('API_KEY');
const baseURL = 'https://deep-index.moralis.io/api/v2';

export const getWalletNFTs = async (walletAddress: string, chain: string = 'eth') => {
  const url = `${baseURL}/${walletAddress}/nft`;
  const response = await axios.get(url, {
    headers: {
      'X-API-Key': apiKey,
    },
    params: {
      chain,
    },
  });
  return response.data;
};
