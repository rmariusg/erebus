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
  // Valid Request to Fetch Block Information by Block Number
  let res = http.post(
    nodeUrl,
    JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: ['latest', false],
      id: 1,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
  check(res, {
    'block information fetched successfully': (r) => r.status === 200,
  });

  // Fetch Block Information with Full Transaction Objects
  res = http.post(
    nodeUrl,
    JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: ['latest', true],
      id: 1,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
  check(res, {
    'block information with transactions fetched successfully': (r) => r.status === 200,
  });

  sleep(1);
}
