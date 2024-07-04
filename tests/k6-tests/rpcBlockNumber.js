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
  // Valid Request to Fetch Current Block Number
  let res = http.post(
    nodeUrl,
    JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
  check(res, {
    'block number fetched successfully': (r) => r.status === 200,
  });

  // Invalid Method Name
  res = http.post(
    nodeUrl,
    JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_invalidMethod',
      params: [],
      id: 1,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
  check(res, {
    'invalid method name response status is 400': (r) => r.status === 400,
  });

  sleep(1);
}
