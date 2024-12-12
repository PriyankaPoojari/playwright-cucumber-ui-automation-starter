import { Given } from "@cucumber/cucumber";
import { PageObjects } from "../../pages/generic/page.objects";
import { ScenarioWorld } from "../../pages/generic/world";

const pageObjects = new PageObjects()

Given('I open Saucedemo and login as {string}', async function (this:ScenarioWorld, loginUser:String) {
    await pageObjects.LoginPage.loadHomePage(this.BASE_URL)
    await pageObjects.LoginPage.login(this,loginUser)
  });
