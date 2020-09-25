# fundamenty-gen
CLI tool to generate Fundamenty site


## Usage

```
$ fundamenty-gen <site-name>
```

## How it works?

Internally it does:
0. Ask: site name, description
1. Creates package.json file with name
2. Installs Fundamenty
3. Installs Fundamenty core dependencies:
    those in dependencies.
