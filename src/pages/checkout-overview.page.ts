import { expect, Page } from "@playwright/test";
import Basepage, { commonLocators } from "./generic/base.page";
import { ScenarioWorld } from "./generic/world";
import { yourCartLocators } from "./your-cart.page";

const paymentInfoLocators = {
    paymentInfo: '//div[@data-test="payment-info-value"]',
    shippingInfo: '//div[@data-test="shipping-info-value"]',
    itemTotal: '//div[@data-test="subtotal-label"]',
    taxTotal: '//div[@data-test="tax-label"]',
    total: '//div[@data-test="total-label"]',
    finishButton: "#finish"

}

let page: Page
export class CheckoutOverviewPage extends Basepage{
    constructor(){
        super()
        page = Basepage.pageObject
    }

    async verifyPaymentInfo(){
        await expect(page.getByText("Checkout: Overview")).toBeVisible()

        const paymentInfo = page.locator(paymentInfoLocators.paymentInfo).innerText()
        await expect(paymentInfo).not.toBeNull()

        await expect(page.locator(paymentInfoLocators.shippingInfo).innerText()).not.toBeNull()
        await expect(page.locator(paymentInfoLocators.itemTotal).innerText()).not.toBeNull()
        await expect(page.locator(paymentInfoLocators.taxTotal).innerText()).not.toBeNull()
        await expect(page.locator(paymentInfoLocators.total).innerText()).not.toBeNull()

   }

   async clickOnFinishButton(){
    await page.click(paymentInfoLocators.finishButton)
   }

   async verifyThankYouPage(){
    await expect(page.getByText("Thank you for your order!")).toBeVisible()
    const checkoutProductsCount = await page.locator(commonLocators.shoppingCart).innerText() || 0
    await expect(Number(checkoutProductsCount)).toBe(0) // cart must be empty
   }
}