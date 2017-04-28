module.exports = function (grunt) {
	'use strict';
	/*
	command to check for "in arbeit" dropbox imports
	request:{"requests":[{"_dataName":"DropboxProcessingList", "_moduleName":"lib/dropbox", "_searchParams":{"source":"design/HTV3"}, "_writeParams":{}, "_validateParams":{}, "_commandStack":[{"type":"read", "command":"read"}], "_dataArray":{}, "_dataList":{}}], "meta":{"id":UserID, "token":"xyz"}}


	command for publish layout

	request:{"requests":[{"_dataName":"TemplateDesign", "_moduleName":"cms/template/structure/design", "_searchParams":{}, "_writeParams":{"designName":"HTV3", "templates":true, "categories":false, "blogs":false}, "_validateParams":{}, "_commandStack":[{"type":"write", "command":"buildTemplateDesign"}], "_dataArray":{}, "_dataList":{}}], "meta":{"id":UserID, "token":"xyz"}}

	*/

	grunt.registerMultiTask('plentymarkets-dropbox-uploader', 'Import your dropbox Layout into the plentymarkets backend', function() {
		var PlentyCurlAPI = require("node-plentymarkets-curl");
		var options = this.data;

		var done = this.async();
		var plenty = new PlentyCurlAPI();
		if(!options.layoutName || !options.layoutLang){
			grunt.fail.warn("You need to specify layoutName and layoutLang");
		}
		if(options.domain != undefined){
			if(options.domain.indexOf("http") == -1){
				grunt.fail.warn("options.domain requires a full http / https path");
			}
		}

		plenty.setCreditials(options);

		plenty.login(function(loginResult){
			var requestString = 'request='+plenty.stringifyNestedObject({
				"requests": [{
					"_dataName": "TemplateImportTemplate",
					"_moduleName": "cms/template/import",
					"_searchParams": {},
					"_writeParams": {
						"designName": options.layoutName,
						"lang": options.layoutLang,
						"importAll": false
					},
					"_validateParams": {},
					"_commandStack": [{
						"type": "write",
						"command": "writeFromDropbox"
					}],
					"_dataArray": {},
					"_dataList": {}
				}],
				"meta": {
					"token": plenty.getUserToken(),
					"id": plenty.getUserID()
				}
			});

			if (grunt.option('debug')) {
				console.log("CSRF token: "+plenty.getUserToken());
				console.log("Plenty UserId: "+plenty.getUserID());
				plenty.setDebug(true);
			}

			if(loginResult.success === true){
				plenty.post(options.domain+"/plenty/api/ui.php",requestString, function(callResult){
					done();
				});
			}else{
				try{
					grunt.log.error(loginResult.exception.message);
				}catch(exception){
					grunt.log.error(exception.message);
				} /*if no error object is passed*/
			}
		});

	});
};
