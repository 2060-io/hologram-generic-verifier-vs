This is a [Hologram](https://hologram.zone/) web app where you can make a presentation request credential demo using Hologram Mobile App

## Getting Started for DEV

First, run the development server:

Install dependencies

```bash
yarn install
```

Run project

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

At the moment, all configuration is done by environment variables. All of them are optional for development
but likely needed for production and test deployments.

| Variable                     | Description                           | Default value                                                                                                        |
| ---------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| PUBLIC_BASE_URL              | Public URL where app is deployed      | http://localhost:3000                                                                                                |
| CREDENTIAL_DEFINITION_ID     | Unique identifier or Credential types | did:web:chatbot-demo.dev.2060.io?service=anoncreds&relativeRef=/credDef/HngJhYMeTLTZNa5nJxDybmXDsV8J7G1fz2JFSs3jcouT |
| SERVICE_AGENT_ADMIN_BASE_URL | Service agent base URL                | https://a.chatbot-demo.dev.2060.io                                                                                   |

## About this web app

This app was built using [Next.js framework](https://nextjs.org) and [Socket.IO](https://socket.io) for its web socket server.

## How to use this web app

1. First of all you need to have Hologram mobile app installed in your device.

2. Once your app is installed please make sure you have a ChatBot Service connection. If you do not have it you can read this QR code by opening this [ChatBotServiceQRCode](https://a.chatbot-demo.dev.2060.io/v1/qr) in your browser and scan it using Hologram mobile app

3. Make sure you have a Issue credential emitted by ChatBot Service. If do not, request it an Issue credential to this service and accept it

4. Scan QR code of this web app in your Hologram app and present the credential that mobile app ask you. After present it you should see page screen as the next image

![Present credential image](public/images/presented.png)
