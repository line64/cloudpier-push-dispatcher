import gcm from 'node-gcm';

export default async function (state, params) {

  let {
    bunyan
  } = state;

  let {
    gateway,
    dryRun,
    recipient,
    sender,
    priority,
    contentAvailable,
    delayWhileIdle,
    timeToLive,
    data
  } = params;

  if(!gateway) {
    throw new Error('No gcm sender available provided');
  }

  bunyan.info('preparing payload for gcm');

  let message = new gcm.Message({
    priority: priority || 'high',
    contentAvailable: contentAvailable || true,
    delayWhileIdle: delayWhileIdle || true,
    timeToLive: timeToLive || 3,
    data: data || {}
  });

  if (dryRun) {

    bunyan.warn('sending dry run notification', message);

    return { success: true };

  }

  try {

    bunyan.info('sending message through gcm', { message, recipient });

    return await new Promise((resolve, reject) => {

      gateway.send(message, { registrationTokens: [recipient] }, (gcmError, response) => {

        bunyan.info('processing callback from gcm', { response, gcmError });

        if (gcmError) {
          reject(gcmError);
          return;
        }

        let {
          success: gcmSuccess
        } = response;

        let success = (gcmSuccess > 0);

        resolve({ success });

      });

    });

  } catch (err) {

    throw err;

  }

}
