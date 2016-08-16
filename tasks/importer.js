'use strict';
module.exports = function gruntTask(grunt) {

	var PlentyCurlAPI = require("node-plentymarkets-curl");
	var defaults = {};
	
	grunt.registerMultiTask('plentymarkets-dropbox-uploader', 'Import your dropbox Layout into the plentymarkets backend', function() {
		var options = this.options(defaults);
		var done = this.async();
		var plenty = new PlentyCurlAPI();
		if(!options.layoutName || !options.layoutLang){
			grunt.fail.warn("You need to specify layoutName and layoutLang");
		}
		plenty.setCreditials(options);
		
		plenty.login(function(loginResult){
			if(loginResult.success == true){
				plenty.post("https://www.heavy-tuned.de/plenty/api/ui.php",{request: JSON.stringify('{"requests":[{"_dataName":"TemplateImportTemplate", "_moduleName":"cms/template/import", "_searchParams":{}, "_writeParams":{"designName":'+options.layoutName+', "lang":"'+options.layoutLang+'", "importAll":false}, "_validateParams":{}, "_commandStack":[{"type":"write", "command":"writeFromDropbox"}], "_dataArray":{}, "_dataList":{}}], "meta":{"id":3}}')}, function(callResult){
					done();
				});
			}else{
				done();
			}
		});



	});
};
