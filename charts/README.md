# Hologram Generic Verifier Helm Chart

This Helm chart is used to deploy the Hologram Generic Verifier application. It provides a flexible and customizable deployment for the verifier service.

## Features
- Deploys the Generic Verifier application as a StatefulSet.
- Configurable environment variables for customization.
- Optional dependency on the `vs-agent` chart for agent functionality.

## Requirements
- Kubernetes 1.19+
- Helm 3.0+

## Dependencies
This chart optionally depends on the `vs-agent` chart, which is required for the verifier to function properly. By default, the dependency is disabled. You can enable it in the `values.yaml` file.

The `vs-agent` chart can be found here: [vs-agent GitHub Repository](https://github.com/2060-io/vs-agent).

## Configuration

### Key Variables
- **Database Support**: The `vs-agent` allows the use of a database, but it is not required for this deployment.

### Step-by-Step Configuration
1. Clone this repository or download the chart files.
2. Open the `values.yaml` file and update the following variables as needed:
   - `name`: Set the name of the deployment.
   - `namespace`: Specify the Kubernetes namespace where the chart will be deployed.
   - `domain`: Set the domain for the application.
   - `extraEnv`: Uncomment and configure the `CREDENTIAL_DEFINITION_ID` variable if needed.
   - `vs-agent-chart.enabled`: Set to `true` if you want to enable the `vs-agent` dependency.
3. If using the `vs-agent` dependency, ensure the `vs-agent` chart is properly configured and deployed.

### Example `values.yaml`
```yaml
name: hologram-generic-verifier-vs
namespace: default
domain: example.io
extraEnv:
  - name: CREDENTIAL_DEFINITION_ID
    value: "my-credential-definition-id"
vs-agent-chart:
  enabled: true
  replicas: 1
  domain: example.io
  adminPort: 3000
  didcommPort: 3001
```

## Installation
To install or upgrade the chart with the release name `hologram-generic-verifier-chart`:
```
helm upgrade --install hologram-generic-verifier-chart charts/ --namespace <your-namespace>
```

This command will install the chart if it is not already installed or upgrade it if it exists.

## Uninstallation
To uninstall the release:
```
helm uninstall hologram-generic-verifier-chart --namespace <your-namespace>
```

This will remove all resources associated with the release.
