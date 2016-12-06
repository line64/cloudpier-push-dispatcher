#Reef push dispatcher service

Reef's push notifications dispatcher microservice

##Usage

Instalation with npm:
    
    npm intall
    npm start

Installation with yarn: 

    yarn
    npm start

##Push notification command 

`PUSH_NOTIFICATION`

    PUSH_NOTIFICATION: command({
        dryRun: boolean, (no server impact)
        recipient: string (deviceToken), 
        sender: string (domain),
        devicePlatform: string (SO),
        priority: string,
        contentAvailable: boolean,
        delayWhileIdle: boolean,
        timeToLive: int,
        data: {
            title: string,
            message: string,
            data: Object
        }, 
    }) => {
        success: boolean
    };


`PUSH_NOTIFICATION (example)`

    PUSH_NOTIFICATION: command({
        "dryRun": false,
        "recipient": "eWkdJjCvnMc:APA91bEUdtM",
        "sender": "wanku",
        "devicePlatform": "android",
        "priority": "high",
        "contentAvailable": true,
        "delayWhileIdle": true,
        "timeToLive": 3,
        "data": {
            "title": "A message title",
            "message": "A message text",
            "data": { 
            }
        }
    })