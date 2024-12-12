var reporter = require('cucumber-html-reporter');
var fs = require('fs')
var htmlReportPath = 'reports'
var jsonFilepath = 'cucumber-report.json'

if(!fs.existsSync(htmlReportPath)){
    fs.mkdirSync(htmlReportPath)
}

var options = {
        theme: 'bootstrap',
        jsonFile: jsonFilepath,
        output: `${htmlReportPath}/cucumber_report.html`,
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
        },
        failedSummaryReport: true,
    };

    if(fs.existsSync(jsonFilepath)){
        reporter.generate(options);
    }else{
        console.error("Cucumber json file is not available in the path")
    }