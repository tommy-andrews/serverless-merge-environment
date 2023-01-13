# Serverless Merge Environment

Based on [serverless-merge-config](https://github.com/CruGlobal/serverless-merge-config)

## Installation

```
npm install --save-dev @tommy-andrews/serverless-merge-environment
```

## Usage

Add a `mergeEnvironment` section to your `serverless.yml` file under the `custom` property:

```yaml
...
custom:
  mergeEnvironment:
    - ${self:custom.config.environment}
    - ${self:custom.anEnvironmentFile}
...
```

The plugin will merge the entries from `mergeEnvironment` into `provider.environment`
