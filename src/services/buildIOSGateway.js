import apn from 'apn';

export default function (state, params) {

  let { bunyan, environment } = state;

  let { gatewayId } = params;

  bunyan.info('bulding env var key', params);

  let envKeyId = `${gatewayId}_KEYID`,
      envTeamId = `${gatewayId}_TEAMID`;

  bunyan.info('looking for keys env var in state', { envKeyId, envTeamId });

  let keyId = environment[envKeyId],
      teamId = environment[envTeamId];

  bunyan.info('key and team ids found for gateway', { keyId, teamId, gatewayId });

  if(!keyId) throw new Error('No KeyId for sender-gateway found');

  if(!teamId) throw new Error('No TeamId for sender-gateway found');

  bunyan.info('creating apn client', { keyId, teamId, gatewayId });

  let options = {
    token: {
      key: `${__dirname}/APNsAuthKey_${keyId}.p8`,
      keyId,
      teamId
    },
    production: true
  };

  bunyan.info(options);

  return new apn.Provider(options);

}
