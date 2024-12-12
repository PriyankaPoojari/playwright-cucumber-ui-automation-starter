import { expect, Page } from "@playwright/test"
import Basepage, { commonLocators } from "./generic/base.page"
import { ScenarioWorld } from "./generic/world"

const inventoryLocators = {
    productContainer: '//div[@class="inventory_item"]',
    productTitle: '//div[text()="productName"]',
    backtoProductsBtn: '#back-to-products',
    inventoryItemName: ".inventory_item_name "
}

let page : Page
export class InventoryPage extends Basepage {
    constructor(){
        super()
        page = Basepage.pageObject
    }

    async selectAndVerifyProductAddedtoCart(world:ScenarioWorld, productName:string){
        let beforeCartCount = await page.locator(commonLocators.shoppingCart).innerText() || 0
        
        const productContainer = await page.locator(inventoryLocators.productContainer)
                                .filter({hasText: productName})
        const button = await productContainer.getByRole("button").filter({hasText: "Add to cart"})
        await button.click()

        let afterCartCount = await page.locator(commonLocators.shoppingCart).innerText() || 0

        //Verifying button name is shown as Remove after adding to cart
        await expect(productContainer.getByRole("button")).toContainText('Remove')
        //Verifying product count in cart increased after adding
        await expect(Number(afterCartCount)).toBe(Number(beforeCartCount) + 1)
        world.totalProductsAddedToCart = Number(afterCartCount);
    }

    async clickOnProductAndAddedtoCart(world:ScenarioWorld, productName:string){
        let beforeCartCount = await page.locator(commonLocators.shoppingCart).innerText() || 0
        
        const productContainer = await page.locator(inventoryLocators.productContainer)
                                .filter({hasText: productName})
        await productContainer.locator(inventoryLocators.inventoryItemName).click()

        await page.getByRole("button").filter({hasText: "Add to cart"}).click()
        let afterCartCount = await page.locator(commonLocators.shoppingCart).innerText() || 0

        //Verifying button name is shown as Remove after adding to cart
        await expect(await page.getByRole("button").filter({hasText: "Remove"})).toBeVisible()
        //Verifying product count in cart increased after adding
        await expect(Number(afterCartCount)).toBe(Number(beforeCartCount) + 1)
        world.totalProductsAddedToCart = Number(afterCartCount);
    }

    async clickOnBackToProducts(){
        await page.click(inventoryLocators.backtoProductsBtn)
    }

}