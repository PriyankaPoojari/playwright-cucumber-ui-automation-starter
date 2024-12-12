import { expect, Page } from "@playwright/test";
import Basepage, { commonLocators } from "./generic/base.page";
import { ScenarioWorld } from "./generic/world";

export const yourCartLocators = {
    "cartItemContainer" : ".cart_item",
    cartQuantity : ".cart_quantity",
    inventoryItemDesc : ".inventory_item_desc",
    inventoryItemPrice: ".inventory_item_price",
    continueShoppingButton: "#continue-shopping",
    checkoutButton: "#checkout"
}

let page: Page
export class YourCartPage extends Basepage{
    constructor(){
        super()
        page = Basepage.pageObject
    }

    async clickOnCart(){
        await page.click(commonLocators.shoppingCart)
    }

    async verifyProductDetailsContents(world:ScenarioWorld){
        await expect(page.getByText("Your Cart")).toBeVisible()
        await this.verifyProductDetails(world)
        await expect(page.locator(yourCartLocators.continueShoppingButton)).toBeVisible()
        await expect(page.locator(yourCartLocators.checkoutButton)).toBeVisible()
    }

    async verifyProductDetails(world:ScenarioWorld){
        const checkoutProductsCount = await page.locator(commonLocators.shoppingCart).innerText() || 0
        expect(world.totalProductsAddedToCart).toBe(Number(checkoutProductsCount))
        const productsQtyMap = world.productsQtyMap
        await productsQtyMap?.forEach(async(value:Number, key:String) => {
            console.log("Verifying data for product: ",key)
            const cartItemContainer = await page.locator(yourCartLocators.cartItemContainer).filter({hasText: key.toString()})
            const quantity = await cartItemContainer.locator(yourCartLocators.cartQuantity).innerText() || 0
            await expect(Number(quantity)).toBe(value) //verifying quantity displayed
            await expect(cartItemContainer.locator(yourCartLocators.inventoryItemDesc)).toBeVisible()
            await expect(cartItemContainer.locator(yourCartLocators.inventoryItemPrice)).toBeVisible()
        })
    }

    async clickOnCheckoutButton(){
        await page.click(yourCartLocators.checkoutButton)
    }
}