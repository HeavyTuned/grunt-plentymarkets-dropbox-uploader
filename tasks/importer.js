var PlentyCurlAPI = require("node-plentymarkets-curl");
module.exports = function gruntTask(grunt) {
	'use strict';
	
	
	grunt.registerMultiTask('plentymarkets-dropbox-uploader', 'Import your dropbox Layout into the plentymarkets backend', function() {
		var options = this.data;
		var done = this.async();
		var plenty = new PlentyCurlAPI();
		if(!options.layoutName || !options.layoutLang){
			grunt.fail.warn("You need to specify layoutName and layoutLang");
		}
		plenty.setCreditials(options);
		plenty.setDebug(false);


		plenty.login(function(loginResult){
			var requestString = 'request='+plenty.stringifyNestedObject({"requests":[{"_dataName":"TemplateImportTemplate", "_moduleName":"cms/template/import", "_searchParams":{}, "_writeParams":{"designName":options.layoutName, "lang":options.layoutLang, "importAll":false}, "_validateParams":{}, "_commandStack":[{"type":"write", "command":"writeFromDropbox"}], "_dataArray":{}, "_dataList":{}}], "meta":{"id":plenty.getUserID()}});

			if(loginResult.success === true){

				plenty.post("https://"+options.domain+"/plenty/api/ui.php",requestString, function(callResult){
					done();
					
				});
			}else{

			}
		});



	});
};
