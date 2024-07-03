import { APIRequestContext } from '@playwright/test';

export const sendRpcRequest = async (
  request: APIRequestContext,
  nodeUrl: string,
  method: string,
  params: any[] = [],
  id: number = 1,
) => {
  const response = await request.post(nodeUrl, {
    data: {
      jsonrpc: '2.0',
      method,
      params,
      id,
    },
  });
  return response;
};
