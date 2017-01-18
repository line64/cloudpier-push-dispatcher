import apn from 'apn';

export default function (state, params) {

  let { bunyan, environment } = state;

  let { gatewayId } = params;

  bunyan.info('bulding env var key', params);

  let envKeyId = `KEYID_${gatewayId}`,
      envKeyTeamId = `TEAMID_${gatewayId}`,
      envKeyPath = `KEYPATH_${gatewayId}`;

  bunyan.info('looking for keys env var in state', { envKeyId, envKeyTeamId });

  let keyId = environment[envKeyId],
      teamId = environment[envKeyTeamId],
      key = environment[envKeyPath];

  bunyan.info('key and team ids found for gateway', { keyId, teamId, gatewayId });

  if(!keyId) throw new Error('No KeyId for sender-gateway found');

  if(!teamId) throw new Error('No TeamId for sender-gateway found');

  bunyan.info('creating apn client', { keyId, teamId, gatewayId });

  let options = {
    token: {
      key: `${__dirname}/${key}`,
      keyId,
      teamId
    },
    production: false
  };

  return new apn.Provider(options);

}
