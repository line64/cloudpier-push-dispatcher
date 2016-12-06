import { SqsBrokerFacade, ReefService } from 'reef-service';

export default async function (config, bunyan) {

    bunyan.info('Setting up Reef Service');

    let brokerFacade = new SqsBrokerFacade(config);

    brokerFacade.on('warn', (warn) => bunyan.warn(warn));
    brokerFacade.on('error', (err) => bunyan.error(err));
    brokerFacade.on('info', (info) => bunyan.info(info));

    let service = new ReefService(brokerFacade);

    service.on('warn', (warn) => bunyan.warn(warn));
    service.on('error', (err) => bunyan.error(err));
    service.on('info', (info) => bunyan.info(info));

    await service.setup();

    return service;

}
