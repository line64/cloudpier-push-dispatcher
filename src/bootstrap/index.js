import setupBunyanLog from './setupBunyanLog';
import setupReefService from './setupReefService';
import setupEnvironment from './setupEnvironment';
import setupGatewayCache from './setupGatewayCache';
import { CLOUDPIER_PUSH_DOMAIN } from '../conventions';

export async function setupStateAsync(config) {

  let bunyan = setupBunyanLog({
    name: CLOUDPIER_PUSH_DOMAIN,
    level: config.LOG_LEVEL || 'info',
  	stream: config.stdout
  });

  let reefService = await setupReefService({
    region: config.AWS_REGION,
    accessKeyId: config.AWS_ACCESSKEYID,
    secretAccessKey: config.AWS_SECRETACCESSKEY,
    serviceDomain: CLOUDPIER_PUSH_DOMAIN,
    serviceLane: config.REEF_SERVICE_LANE,
  }, bunyan);

  let environment = setupEnvironment({
    ...config.ENV_VARS
  });

  let gatewayCache = setupGatewayCache();

  return { bunyan, reefService, environment, gatewayCache };

}
