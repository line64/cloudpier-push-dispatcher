import {
  ensureGateway,
  sendAndroidNotification,
  sendIOSNotification
} from '../services';

export default function(state, params) {

    let {
      bunyan
    } = state;

    bunyan.info('processing PUSH_NOTIFICATION command', params);

    let {
      devicePlatform: platform,
      sender: senderId,
      ...customPayload
    } = params;

    bunyan.info('ensuring gateway', { senderId, platform });

    let gateway = ensureGateway(state, { senderId, platform });

    bunyan.info('sending notification');

    try {

      switch (platform) {

        case 'android':
          return sendAndroidNotification(state, {
            gateway,
            ...customPayload
          });

        case 'ios':
          return sendIOSNotification(state, {
            gateway,
            ...customPayload
          });

        default:
          throw new Error('Cant send message through unknown platform');

      };

    } catch (err) {

      bunyan.error(err, 'error while running PUSH_NOTIFICATION');

      throw err;

    }

}
