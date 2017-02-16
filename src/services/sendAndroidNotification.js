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

        let {
          failure: gcmFailure,
          success: gcmSuccess
        } = response;

        let success = (gcmSuccess > 0),
            failure = (gcmFailure > 0)

        if (failure) {
          bunyan.error(`error sending notification to recipient: ${recipient}`, response);
          resolve({ success: false, error: response.results[0].error });
          return;
        }

        if(success) bunyan.info(`sent successfully notification to recipient: ${recipient}`, response);

        resolve({ success });

      });

    });

  } catch (err) {

    throw err;

  }

}
