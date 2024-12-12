import { After, AfterAll, AfterStep, Before, BeforeAll, ITestCaseHookParameter, setDefaultTimeout, Status } from "@cucumber/cucumber"
import { Browser, chromium, devices, webkit } from "@playwright/test"
import { browserOptions } from "../../config/config"
import { ScenarioWorld } from "../pages/generic/world";
import Basepage from "../pages/generic/base.page";
const fs = require('fs');
const path = require('path');

setDefaultTimeout(60*1000)

let browser: Browser
let device
BeforeAll(async function () {
    const launchOption = process.env.CI ? { headless: true } : { headless: false }
    const deviceName = process.env.npm_config_device
    console.log("Device:", deviceName)
    switch (deviceName?.toLowerCase()) {
        case 'ipad':
            device = devices['iPad Pro 11 landscape']
            break
        case 'safari':
            device = devices['Desktop Safari']
            break
        case 'desktop-edge':
            device = devices['Desktop Edge']
            break
        default:
            device = devices['Desktop Chrome']
    }

    console.log("Browser:"+browserOptions.channel)
    const browserType = browserOptions.channel == "webkit" ? webkit : chromium
    browser = await browserType.launch({
        ...browserOptions,
        ...device,
        ...launchOption
    })
})

Before(async function (this: ScenarioWorld, { pickle }) {
    this.BASE_URL = this.parameters.BASE_URL
    this.ENV = this.parameters.ENV
    this.mockEnabled = this.parameters.mockEnabled
    this.feature = pickle
    this.startTime = new Date()
    this.testName = pickle.name.replace(/\W/g, "-")
    this.fullPage = true
    this.context = await browser.newContext({
        ignoreHTTPSErrors: true,
        viewport: {
            width: device.viewport.width,
            height: device.viewport.height
        },
        baseURL: this.BASE_URL,
        recordVideo: this.parameters.recordVideo ? { dir: "recordings" } : undefined
    })

    const pageObj = await this.context.newPage()
    Basepage.pageObject =  pageObj
})

AfterStep(async function (this:ScenarioWorld) {
// default take ss after end of each step
    await Basepage.pageObject.waitForLoadState('load')
    await Basepage.pageObject.waitForLoadState('networkidle')
    await Basepage.pageObject.waitForLoadState('domcontentloaded')
    const image = await Basepage.pageObject.screenshot({fullPage:this.fullPage});
    image && (this.attach(image,"image/png"));
})


After(async function (this: ScenarioWorld, { result }: ITestCaseHookParameter) {
    if (result) {
        this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);
        if (result.status != Status.PASSED) {
            console.error("Scenario failed:", result.exception);
            this.attach(`Error:${result.exception}`);
        }
    }
    await Basepage.pageObject.context().clearCookies();
    await Basepage.pageObject.context().close();
    // (await Basepage.pageObject.context() as any).video()?.saveAs(`recordings/${this.testName}.mp4`); //integrate ffmpeg
    await this.context?.close();
    
})

AfterAll(async function () {
    await browser.close()
})
 
