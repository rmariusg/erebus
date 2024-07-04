import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 }, // ramp up to 20 users
    { duration: '1m', target: 20 }, // stay at 20 users
    { duration: '30s', target: 0 }, // ramp down to 0 users
  ],
};

const apiUrl = 'https://deep-index.moralis.io/api/v2';
const walletAddress = `${__ENV.WALLET_ADDRESS}`;
const apiKey = `${__ENV.MORALIS_API_KEY}`;

export default function () {
  let res = http.get(`${apiUrl}/${walletAddress}/nft`, {
    headers: { 'X-API-Key': apiKey },
  });
  check(res, {
    'NFTs fetched successfully': (r) => r.status === 200,
  });

  sleep(1);
}
