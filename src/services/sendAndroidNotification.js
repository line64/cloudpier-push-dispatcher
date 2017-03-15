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
    expiry,
    platformPayload: {
      contentAvailable,
      delayWhileIdle,
      sound,
      content
    }
  } = params;

  if(!gateway) {
    throw new Error('No gcm sender available provided');
  }

  bunyan.info('preparing payload for gcm');

  let message = new gcm.Message({
    priority: priority || 'high',
    contentAvailable: contentAvailable || true,
    delayWhileIdle: delayWhileIdle || true,
    timeToLive: expiry || 3,
    data: content
  });

  if (dryRun) {

    bunyan.warn('sending dry run notification', message);

    return { success: true };

  }

  try {

    bunyan.info('sending message through gcm', JSON.stringify(message));

    return await new Promise((resolve, reject) => {

      gateway.send(message, { registrationTokens: [recipient] }, (gcmError, response) => {

        bunyan.info('processing callback from gcm', { response, gcmError });

        if (response.failure) {
          bunyan.error(`gcm error for token ${recipient}`, response.results);
          reject(response.results);
          return;
        }

        let {
          success: gcmSuccess
        } = response;

        let success = (gcmSuccess > 0);

        bunyan.info(`gcm sent successfully to token ${recipient}`, response.results);

        resolve({ success });

      });

    });

  } catch (err) {

    throw err;

  }

}
