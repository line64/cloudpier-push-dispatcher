import gcm from 'node-gcm';

export default function (state, params) {

  let { bunyan, environment } = state;

  let { gatewayId } = params;

  bunyan.info('bulding env var key', params);

  let envKey = `${gatewayId}_APIKEY`;

  bunyan.info('looking for api key env var in state', { envKey });

  let apiKey = environment[envKey];

  bunyan.info('api key found for gateway', { apiKey, gatewayId });

  if(!apiKey) throw new Error('No API Key for sender-gateway found');

  bunyan.info('creating gcm client', { apiKey });

  return new gcm.Sender(apiKey);

}
