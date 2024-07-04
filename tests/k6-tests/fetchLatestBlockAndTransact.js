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
  // Fetch the latest block number
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

  let blockNumber = JSON.parse(res.body).result;

  // Fetch the details of the latest block
  res = http.post(
    nodeUrl,
    JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [blockNumber, true],
      id: 1,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
  check(res, {
    'block details fetched successfully': (r) => r.status === 200,
  });

  let blockDetails = JSON.parse(res.body).result;

  // Check that the block contains transactions
  if (blockDetails.transactions.length > 0) {
    let transactionHash = blockDetails.transactions[0].hash;

    // Fetch the details of a transaction from the latest block
    res = http.post(
      nodeUrl,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getTransactionByHash',
        params: [transactionHash],
        id: 1,
      }),
      { headers: { 'Content-Type': 'application/json' } },
    );
    check(res, {
      'transaction details fetched successfully': (r) => r.status === 200,
    });
  }

  sleep(1);
}
