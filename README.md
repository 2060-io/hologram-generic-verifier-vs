This is a [Hologram](https://hologram.zone/) web app where you can make a presentation request credential demo using Hologram Mobile App

## Getting Started for DEV

First, run the development server:

Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run project
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

At the moment, all configuration is done by environment variables. All of them are optional for development
but likely needed for production and test deployments.

| Variable                   | Description                                                                                                       | Default value         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------- |
| PUBLIC_BASE_URL             | Public URL where app is deployed                    | http://localhost:3000   |
| CREDENTIAL_DEFINITION_ID            | Unique identifier or Credential types | did:web:chatbot-demo.dev.2060.io?service=anoncreds&relativeRef=/credDef/HngJhYMeTLTZNa5nJxDybmXDsV8J7G1fz2JFSs3jcouT

## About this web app

This app was build using NextJS framework and a web socket server with socket.io

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Socket.IO Documentation](https://socket.io/docs/v4/) - learn about Socket.IO

## How to use this web app

1. First of all you need to have Hologram mobile app installed in your device.

2. Once your app is installed please make sure you have a ChatBot Service connection. If you do not have it you can read this QR code by opening this [ChatBotServiceQRCode](https://a.chatbot-demo.dev.2060.io/v1/qr) in your browser and scan it using Hologram mobile app

3. Make sure you have a Issue credential emitted by ChatBot Service. If do not, request it an Issue credential to this service and accept it

4. Scan QR code of this web app in your Hologram app and present the credential that mobile app ask you. After present it you should see page screen as the next image

![Present credential image](public/images/presented.png)
