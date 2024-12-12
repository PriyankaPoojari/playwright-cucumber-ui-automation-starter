const common = {
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.ts'],
    paths: ['src/features/**/*.feature'],
    format: ['json:cucumber-report.json']
}

const commonWorldParameters = {
    ENV: "SIT",
    parallel: 1,
    screenshot: true,
    recordVideo: true
}

module.exports = {
    sit: {
        ...common,
        worldParameters: {
            ...commonWorldParameters,
            ENV: "SIT",
            BASE_URL: "https://www.saucedemo.com/",
            mockEnabled: false
        }
    },
    uat: {
        ...common,
        worldParameters: {
            ...commonWorldParameters,
            ENV: "UAT",
            BASE_URL: "https://www.saucedemo.com/uat",
            mockEnabled: false
        }
    } 
}