# Pharos

Run Multiple Versions of Lighthouse on Windows / Mac OS / Linux

## Requirements

You must have lighthouse installed either locally or globally for this package to work.

## Installation

To install Pharos using NPM:

```
npm  i lighthouse-pharos
```

To install Pharos using Yarn:

```
yarn add lighthouse-pharos
```


## Usage

Call Pharos with the urls you want with a separating comma.
You can specify what ouput you would like; HTML or JSON.
Lighthouse will always run in headless chrome.
Pharos will save your output file according to the sites name.

```
pharos --sites https://airhorner.com/,https://www.pokedex.org/ --output json
```

### Note

This project will be regularly updated until version 1.0.0 release.
From version 1.0.0 stable release, there will be no breaking changes.
