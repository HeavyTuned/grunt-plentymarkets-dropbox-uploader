# grunt-plentymarkets-dropbox-uploader
[![license][license-image]][license-url]
[![node][node-image]][node-url]

[node-image]:https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]:https://nodejs.org/download/

[license-image]:https://img.shields.io/github/license/JCMais/node-libcurl.svg?style=flat-square
[license-url]:https://raw.githubusercontent.com/JCMais/node-libcurl/develop/LICENSE-MIT
A Grunt task for importing dropbox layouts into plentymarkets

## Install
```npm install grunt-plentymarkets-dropbox-uploader --save```


### Config
```javascript

plentymarkets-dropbox-uploader: {
	default: {
		layoutName: "yourPlentymarketsLayoutName",
		layoutLang: "en",
		domain: "yourPlentymarketsBackendDomain",
		user: "anUsernameWithDropboxImportRights",
		password: "usernamesPassword"
	}
}

```
