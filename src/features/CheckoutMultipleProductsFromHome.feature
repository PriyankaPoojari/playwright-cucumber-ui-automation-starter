Feature: Checkout multiple Products from HomePage

@EndToEnd
Scenario Outline: As an Buyer, I should be able to chekout multiple products directly from home page

Given I open Saucedemo and login as "<LoginUser>"
When I select following products and verify add to cart is getting updated:
|Products                   |
|Sauce Labs Backpack        |
|Sauce Labs Fleece Jacket   |
|Sauce Labs Onesie          |

Then I click on Cart and verify the details of products selected
When I checkout and provide information as "<CheckoutInformation>"
Then I verify the Product and Payment Info displayed
And Thank you message is displayed

Examples:
    |Scenario | LoginUser       |CheckoutInformation       |
    |TC01     | standard_user   | validCustomerData        |


