import { Given,When } from "@cucumber/cucumber";
import { PageObjects } from "../../pages/generic/page.objects";
import { ScenarioWorld } from "../../pages/generic/world";

const pageObjects = new PageObjects()

When('I click on Cart and verify the details of products selected', async function (this:ScenarioWorld) {
    await pageObjects.YourCartPage.clickOnCart()
    await pageObjects.YourCartPage.verifyProductDetails(this);
    await pageObjects.YourCartPage.clickOnCheckoutButton()
  });
