import { expect, Page } from "@playwright/test"
import Basepage from "./generic/base.page"
import { ScenarioWorld } from "./generic/world"
import { decrypt, encrypt } from "../utils/encryption"

const loginLocators = {
    username: "#user-name",
    password: "#password",
    loginButton: '#login-button'
}

let page: Page
export default class LoginPage extends Basepage{
    constructor(){
        super()
        page = Basepage.pageObject
    }

    async loadHomePage(url){
        let baseURL = url!= undefined?url:""
        await page.goto(baseURL,{waitUntil:"domcontentloaded"})
    }

    async login(world: ScenarioWorld, loginUser){
        let loginData = require('../fixtures/login/login.json');
        let data = loginData[loginUser]
        await page.locator(loginLocators.username).fill(data.username)
        await page.locator(loginLocators.password).fill(decrypt(data.password))
        await page.locator(loginLocators.loginButton).last().click()
        await this.waitForPageOrSectionToLoad()
        await expect(page.getByText("Products")).toBeVisible()
        await world.attach(`Logged in as ${loginUser}`)
    }

}