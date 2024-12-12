import { Given,When } from "@cucumber/cucumber";
import { PageObjects } from "../../pages/generic/page.objects";
import { ScenarioWorld } from "../../pages/generic/world";

const pageObjects = new PageObjects()

When('I checkout and provide information as {string}', async function (this:ScenarioWorld, custData) {
    await pageObjects.CheckoutPage.fillCustomerInfo(this,custData);
    // await pageObjects.CheckoutPage.clickOnContinueShopping()

  });
