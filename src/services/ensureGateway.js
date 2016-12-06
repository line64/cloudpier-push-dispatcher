import { buildGatewayId } from '../conventions';

import buildAndroidGateway from './buildAndroidGateway';
import buildIOSGateway from './buildIOSGateway';

export default function(state, params) {

  let { bunyan, gatewayCache } = state;

  bunyan.info('ensuring gateway', params);

  let { senderId, platform } = params;

  bunyan.info('bulding gateway id', { senderId, platform });

  let gatewayId = buildGatewayId(senderId, platform);

  bunyan.info('getting gateway instance from cache', { gatewayId });

  let gateway = gatewayCache[gatewayId];

  if (!gateway) {

    bunyan.warn('gateway not found in cache, creating new instance', { gatewayId });

    switch (platform) {

      case 'android':
        gateway = buildAndroidGateway(state, { gatewayId  });
        break;

      case 'ios':
        gateway = buildIOSGateway(state, { gatewayId });
        break;

      default:
        throw new Error('Cant build gateway for unknown platform');

    }

    bunyan.info('setting gateway instance in cache');

    gatewayCache[gatewayId] = gateway;

  }

  return gateway;

}
