import { Given,When } from "@cucumber/cucumber";
import { PageObjects } from "../../pages/generic/page.objects";
import { ScenarioWorld } from "../../pages/generic/world";

const pageObjects = new PageObjects()

When('I verify the Product and Payment Info displayed', async function (this:ScenarioWorld) {
    await pageObjects.YourCartPage.verifyProductDetails(this);
    await pageObjects.CheckoutOverviewPage.verifyPaymentInfo();
    await pageObjects.CheckoutOverviewPage.clickOnFinishButton();
  });

  When('Thank you message is displayed', async function (this:ScenarioWorld) {
    await pageObjects.CheckoutOverviewPage.verifyThankYouPage();
  });

  
