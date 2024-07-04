import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 }, // ramp up to 20 users
    { duration: '1m', target: 20 }, // stay at 20 users
    { duration: '30s', target: 0 }, // ramp down to 0 users
  ],
};

const nodeUrl = `${__ENV.SEPOLIA_NODE_URL}`;

export default function () {
  // Fetch a valid transaction hash using a predefined function or an actual transaction hash
  // Sample hash
  let validTransactionHash = '0xd4b2e80202cc55517c328412a7792772e1bdd925ac1a2120aeafe84316206ad3';

  // Valid Request to Fetch Transaction by Hash
  let res = http.post(
    nodeUrl,
    JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getTransactionByHash',
      params: [validTransactionHash],
      id: 1,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
  check(res, {
    'transaction fetched successfully': (r) => r.status === 200,
  });

  sleep(1);
}
