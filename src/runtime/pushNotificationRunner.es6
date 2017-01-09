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
      sender: senderId
    } = params;

    bunyan.info('ensuring gateway', { senderId, platform });

    let gateway = ensureGateway(state, { senderId, platform });

    bunyan.info('sending notification');

    try {

      switch (platform) {

        case 'android':
          return sendAndroidNotification(state, {
            gateway,
            ...params
          });

        case 'ios':
          return sendIOSNotification(state, {
            gateway,
            ...params
          });

        default:
          throw new Error('Cant send message through unknown platform');

      };

    } catch (err) {

      bunyan.error(err, 'error while running PUSH_NOTIFICATION');

      throw err;

    }

}
