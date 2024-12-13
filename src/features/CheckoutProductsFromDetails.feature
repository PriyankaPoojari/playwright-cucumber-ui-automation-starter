Feature: Select Products, add to cart and checkout

@EndToEnd @debug
Scenario Outline: As a Buyer, I should be able to chekout individual products from product details page

Given I open Saucedemo and login as "<LoginUser>"
When I click on following products and verify add to cart is getting updated from Product details:
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


