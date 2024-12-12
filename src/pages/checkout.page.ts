import { expect, Page } from "@playwright/test";
import Basepage, { commonLocators } from "./generic/base.page";
import { ScenarioWorld } from "./generic/world";
import { yourCartLocators } from "./your-cart.page";

const checkoutLocators = {
    "firstName": "#first-name",
    "lastName": "#last-name",
    "postalCode": "#postal-code",
    "continueButton": "#continue"
}

let page: Page
export class CheckoutPage extends Basepage{
    constructor(){
        super()
        page = Basepage.pageObject
    }

    async fillCustomerInfo(world:ScenarioWorld, custData){
        let customerData = require("../fixtures/customerInformation.json")
        let data = customerData[custData]

        await expect(page.getByText("Checkout: Your Information")).toBeVisible()
        await page.locator(checkoutLocators.firstName).fill(data.firstName)
        await page.locator(checkoutLocators.lastName).fill(data.lastName)
        await page.locator(checkoutLocators.postalCode).fill(data.postalCode)

        await page.locator(checkoutLocators.continueButton).click()
    }
}