# Pharos        ![Travis build status](https://travis-ci.org/Elliot-Evans-95/pharos.svg?branch=master)

Run Multiple Versions of Lighthouse on Windows / Mac OS / Linux

## Requirements

You must have lighthouse installed either locally or globally for this package to work.

## Installation

To install Pharos using NPM:

```
npm i lighthouse-pharos
```

To install Pharos using Yarn:

```
yarn add lighthouse-pharos
```

## Usage

You can use Pharos by passing in the urls you want to test:

```
pharos --sites https://airhorner.com/,https://www.pokedex.org/ --output=html
```

If you would like the output files to be in JSON then add the output flag, by default it outputs HTML:
```
pharos --sites https://airhorner.com/,https://www.pokedex.org/ --output=json
```
