import setupBunyanLog from './setupBunyanLog';
import setupReefService from './setupReefService';
import setupEnvironment from './setupEnvironment';
import setupGatewayCache from './setupGatewayCache';

export async function setupStateAsync(config) {

  let bunyan = setupBunyanLog({
    level: config.LOG_LEVEL || 'info',
  	stream: config.stdout
  });

  let reefService = await setupReefService({
    region: config.AWS_REGION,
    accessKeyId: config.AWS_ACCESSKEYID,
    secretAccessKey: config.AWS_SECRETACCESSKEY,
    serviceDomain: 'cloudpier-push-dispatcher',
    serviceLane: config.REEF_SERVICE_LANE
  }, bunyan);

  let environment = setupEnvironment({
    ...config.ENV_VARS
  });

  let gatewayCache = setupGatewayCache();

  return { bunyan, reefService, environment, gatewayCache };

}
