import * as nearAPI from "near-api-js";

import { config } from "./config";

const { connect, WalletConnection } = nearAPI;

export const getNear = async () => {
  const near = await connect(config);
  return near;
};

export const getWallet = async () => {
  const near = await getNear();
  const wallet = new WalletConnection(near, null);
  return wallet;
};
