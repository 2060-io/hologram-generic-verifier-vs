# Hologram Generic Verifier

**Hologram Generic Verifier** is an application designed to showcase [VS Agent](https://github.com/2060-io/vs-agent) capabilities to request, verify and show the contents of a Verifiable Presentation by any DIDComm-capable agent, such as [Hologram app](https://hologram.zone). Working alongside VS Agent, it conforms a [Verifiable Service](https://verana-labs.github.io/verifiable-trust-spec/#what-is-a-verifiable-service-vs).

You can test a deployed demo of this service at [https://hologram-gov-id-verifier.demos.dev.2060.io] (TODO: update with production demo)

## Features

* Allows to request any AnonCreds Verifiable Credential by DIDComm and easily get verification status and claims
* Allows defining issuer details, in order to let users connect to them in case they don't have the credential you are requesting
* Supports DIDComm V1 agents using [Present Proof V2](https://github.com/decentralized-identity/aries-rfcs/tree/main/features/0454-present-proof-v2) protocol
* Dockerized setup for streamlined deployment

## Configuration

All settings are configured by environment variables.

### Summary

| Variable                     | Description                                                                                                         | Default value         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------- |
| NEXT_PUBLIC_BASE_URL         | Public URL (without port) where the app is deployed                                                                       | http://localhost:3000 |
| NEXT_PUBLIC_PORT             | Port where app is listening                                                                                         | 3000                  |
| CREDENTIAL_DEFINITION_ID     | AnonCreds credential definition ID of the credential to request       | `none`                |
| VS_AGENT_ADMIN_BASE_URL | VS Agent Admin API URL (accessible by the app)                                                                                              | `none`                |
| ISSUER_DID                   | Optional public DID to let users connect to get their credentials in case they don't have any compatible credential | `none`                |
| ISSUER_LABEL                 | Optional label to show in the invitation to credential issuer                                                              | Issuer                |
| ISSUER_IMAGE_URL             | Optional URL pointing to an image to show in the invitation to credential issuer                                          | `none`                |
| ISSUER_VS_AGENT_ADMIN_BASE_URL          | Optional Issuer VS Agent Admin URL: in case no Credential Definition is specified, the Verifier will attempt to get the first credential type from this URL and will use its Credential Definition ID for its requests. Make sure that Generic Verifier has access to it. | `none`                |

### Overview

The minimal setup for Generic Verifier app requires to define a `VS_AGENT_ADMIN_BASE_URL` where its VS Agent is located, and either `CREDENTIAL_DEFINITION_ID` or `ISSUER_VS_AGENT_ADMIN_BASE_URL`. If you know beforehand the ID of the credential type you want the verifier to ask for presentation, you can just define the first. Otherwise, specify the Issuer VS Agent Admin URL location, so the verifier will dynamically use the first available credential type. This is useful to speed-up demo deployment in cases where credential definition IDs are not deterministic, such as did:web AnonCreds.

There are also some other optional variables about the Issuer: `ISSUER_DID`, `ISSUER_LABEL` and `ISSUER_IMAGE_URL`. They are defined to allow the creation of an implicit DIDComm out of band invitation to the issuer service, to redirect the user when they don't have the requested credential in their wallet. If you don't specify them it is fine: Generic Verifier will simply show a "no compatible credentials" error in the web frontend.

## How to run locally

### Prerequisites

* Node.js (v20 or higher)
* Yarn package manager
* (optional) ImageMagick installed in your system, if your credentials do contain JPEG2000-encoded images. You can do this by following the official [installation guide](https://imagemagick.org/script/download.php).
* A [VS Agent](https://github.com/2060-io/vs-agent) instance already running and whose admin API is accessibe by your app

### Steps

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Start the development server:**

   ```bash
   yarn dev
   ```

   Or:

   **Run in Production mode:**

   ```bash
   yarn build && yarn start
   ```

> *NOTE*: You need to define all required environment variables to run it properly

## How to run with Docker

You can use Docker Compose to run a development environment, just by setting up some variables in the [YAML file](./docker-dev/docker-compose.yaml). See this [document](./docker-dev/README.md) for a detailed guide.

## Using the service

Once running, you can test your Verifiable Service by following

1. **Install Hologram Messaging**  
   First, make sure you have [Hologram Messaging](https://hologram.zone) installed on your mobile device. You can download it from the Google Play Store, Apple App Store, or Huawei App Gallery.

2. **Obtain a Credential from the issuer Verifiable Service**  
   Your Hologram app's wallet needs to hold a Verifiable Credential that corresponds to `CREDENTIAL_DEFINITION_ID`. If not, make a connection to the issuer service and obtain one.

3. **Scan the QR Code and Present Your Credential**  
   Open your web browser into this web app's URL and, in your mobile device, scan the QR code with Hologram: it will prompt you to present the required credential. After presenting it, you should see a confirmation screen similar to the one shown below.

   ![presented credential](public/images/presented.png)


## Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) (TODO) for guidelines on submitting issues and pull requests.

## License

This project is licensed under the [Apache 2.0 License](LICENSE).

## Contact

For questions or support, please open an issue on the [GitHub repository](https://github.com/2060-io/hologram-generic-verifier-app/issues).

