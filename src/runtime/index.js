import pushNotificationRunner from './pushNotificationRunner';

export async function startServiceAsync(config, state) {

  let { bunyan, reefService } = state;

  bunyan.info('hooking reef runners');

  reefService.addRunner('PUSH_NOTIFICATION', async (params) => {

    try {
      return await pushNotificationRunner(state, params);
    } catch (err) {
      bunyan.error(err, 'error while processing PUSH_NOTIFICATION');
    }

  });

  bunyan.info('starting up reef service');

  await reefService.start();

}
