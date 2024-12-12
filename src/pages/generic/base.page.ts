import { expect, Page } from "@playwright/test";

let page: Page

//Any common locator throughtout application
export const commonLocators = {
    shoppingCart: '.shopping_cart_link'
}

export default class Basepage{
    static pageObject: Page;
    
    constructor(){
        page = Basepage.pageObject
    }

    //common methods 

    async waitForPageOrSectionToLoad(){
        await page.waitForLoadState('load',{timeout:80000})
        await page.waitForLoadState('domcontentloaded',{timeout:80000})
        await page.waitForLoadState('networkidle',{timeout:80000})
    }

  

    async isNotNullOrEmpty(data: string | null | undefined | boolean) {
        if(typeof(data) !== "boolean"){
            return data !== null && data !== undefined && data.trim() !== '';
        }
        return data;
    }
}