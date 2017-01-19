import bunyan from 'bunyan';

export default function (config) {

  return bunyan.createLogger({
  	name: 'cloudpier-push-dispatcher',
  	level: config.LOG_LEVEL || 'info',
  	stream: config.stdout,
  	serializers : bunyan.stdSerializers
  });

}
