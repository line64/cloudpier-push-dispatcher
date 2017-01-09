# Reef push dispatcher service

Reef's push notifications dispatcher microservice

## Usage

Instalation with npm:
    
    npm intall
    npm start

Installation with yarn: 

    yarn
    npm start

## `PUSH_NOTIFICATION` command 

#### IOS
```
PUSH_NOTIFICATION: command({
    dryRun: Boolean,
    recipient: String (deviceToken), 
    sender: String,
    devicePlatform: String,
    expiry: String,
    priority: String ('normal'|'high')
    platformPayload: { 
        topic: String,
        badge: Number,
        sound: String,
        content: Any
   }
}) => {
    success: Boolean
};
```

#### ANDROID
```
PUSH_NOTIFICATION: command({
    dryRun: Boolean,
    recipient: String (deviceToken), 
    sender: String,
    devicePlatform: String,
    expiry: String,
    priority: String ('normal'|'high')
    platformPayload: { 
        sound: String,
        contentAvailable: Boolean,
        delayWhileIdle: Boolean,
        content: Any
   }
}) => {
    success: Boolean
};
```

## Examples

#### IOS
```
PUSH_NOTIFICATION: command({
    dryRun: false,
    recipient: "<aDeviceToken>", 
    sender: "<aSender>",
    devicePlatform: 'ios',
    expiry: String,
    priority: 'normal'
    platformPayload: { 
        topic: "<app-bundle-id>",
        sound: "chime.caf",
        badge: 10,
        content: {
            title: "This is the title",
            message: "A message text",
            payload: {
            }
        }
   }
}) => {
    success: Boolean
};
```

#### ANDROID 
```
PUSH_NOTIFICATION: command({
    dryRun: false,
    recipient: "<aDeviceToken>", 
    sender: "<aSender>",
    devicePlatform: 'android',
    expiry: String,
    priority: 'normal'
    platformPayload: { 
        sound: "ching.mp3",
        contentAvailable: true,
        delayWhileIdle: true,
        content: {
            title: "This is the title",
            message: "A message text",
            data: { 
            }
        }
   }
}) => {
    success: Boolean
};
```