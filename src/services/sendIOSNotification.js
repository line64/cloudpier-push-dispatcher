import apn from 'apn';

export default async function (state, params) {

    let { 
        bunyan 
    } = state;

    let {
        gateway,
        dryRun,
        recipient,
        sender,
        expiry,
        priority,
        platformPayload: {
            topic,
            badge,
            sound,
            content
        }
    } = params;

    if(!gateway) {
        throw new Error('No apn sender available provided');
    }

    bunyan.info('preparing payload for apn');

    let message = new apn.Notification();
    message.topic = topic;
    message.expiry = expiry || Math.floor(Date.now() / 1000) + 3600;
    message.priority = (priority === 'high') ? '10' : '8';
    message.badge = badge || 3;
    message.sound = sound || "ping.aiff";
    message.alert = content.message;
    
    if(content.payload) 
        message.payload = content.payload;

    if (dryRun) {

        bunyan.warn('sending dry run notification', message);

        return { success: true };

    }

    try {

        bunyan.info('sending message through apn', { message, recipient });

        let result = await gateway.send(message, recipient);

        if(result.sent.length) {

            bunyan.info(`sent successfully notification to recipient: ${recipient}`, result);

            return { success: true };
        }

        bunyan.error(`error sending notification to recipient: ${recipient}`, result);
            
        return { success: false, status: result.failed[0].status, error: result.failed[0].response.reason };
        

    } catch (err) {

        throw err;

    }

}