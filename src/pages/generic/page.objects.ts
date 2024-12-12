import { CheckoutOverviewPage } from "../checkout-overview.page";
import { CheckoutPage } from "../checkout.page";
import { InventoryPage } from "../inventory.page";
import LoginPage from "../login.page";
import { YourCartPage } from "../your-cart.page";


export class PageObjects{
    
    public get LoginPage(){
        return new LoginPage()
    }

    public get InventoryPage(){
        return new InventoryPage()
    }

    public get CheckoutPage(){
        return new CheckoutPage()
    }

    public get YourCartPage(){
        return new YourCartPage()
    }
   
    public get CheckoutOverviewPage(){
        return new CheckoutOverviewPage()
    }
}
