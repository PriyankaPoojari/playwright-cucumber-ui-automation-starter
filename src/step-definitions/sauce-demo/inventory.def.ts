import { Given,When } from "@cucumber/cucumber";
import { PageObjects } from "../../pages/generic/page.objects";
import { ScenarioWorld } from "../../pages/generic/world";

const pageObjects = new PageObjects()

When('I select following products and verify add to cart is getting updated:', async function (this:ScenarioWorld, dataTable) {
  let productsQtyMap: Map<string,Number> = new Map()
  for (let row of dataTable.rows()) {
    const productName = row[0];
    productsQtyMap.set(productName,1)
    await pageObjects.InventoryPage.selectAndVerifyProductAddedtoCart(this,productName);
  }
  this.productsQtyMap = productsQtyMap
  });

  
  When('I click on following products and verify add to cart is getting updated from Product details:', async function (this:ScenarioWorld, dataTable) {
    let productsQtyMap: Map<string,Number> = new Map()
    for (let row of dataTable.rows()) {
      const productName = row[0];
      productsQtyMap.set(productName,1)
      await pageObjects.InventoryPage.clickOnProductAndAddedtoCart(this,productName);
      await pageObjects.InventoryPage.clickOnBackToProducts()
    }
    this.productsQtyMap = productsQtyMap
    });