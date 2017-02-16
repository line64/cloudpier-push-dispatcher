import dotenv from 'dotenv';
import { version } from '../package.json';

import { setupStateAsync } from './bootstrap';
import { startServiceAsync } from './runtime';

async function start() {

  dotenv.load({ silent: true });

  console.log(`:::::::::::::::: CLOUDPIER PUSH DISPATCHER VERSION ${version} ::::::::::::::::`);

  const config = {
    LOG_LEVEL: process.env.LOG_LEVEL,
    LOG_STREAM: process.stdout,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESSKEYID: process.env.AWS_ACCESSKEYID,
    AWS_SECRETACCESSKEY: process.env.AWS_SECRETACCESSKEY,
    REEF_SERVICE_LANE: process.env.REEF_SERVICE_LANE,
    REEF_CLIENT_LANE: process.env.REEF_CLIENT_LANE,
    JWT_SECRET: process.env.JWT_SECRET,
		ENV_VARS: process.env
  };

  let state = await setupStateAsync(config);

  await startServiceAsync(config, state);

}

start().catch((err) => {
  console.error(err)
  process.exit(1);
});
