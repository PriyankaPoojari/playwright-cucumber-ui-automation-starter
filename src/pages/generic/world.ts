import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import * as messages from "@cucumber/messages";
import { BrowserContext } from "@playwright/test";


export interface ScenarioWorld extends World{
    feature?: messages.Pickle;
    context?: BrowserContext;
    testName?: string;
    startTime?: Date;
    BASE_URL?: string;
    ENV?: string;
    screenshot?: any;
    recordVideo?: any;
    mockEnabled?: any;
    applicationRefId?: string;
    fullPage?: boolean;

    productsQtyMap?: Map<string,Number>;
    totalProductsAddedToCart?:any;

}

export class CustomWorld extends World implements ScenarioWorld{
    constructor(options: IWorldOptions){
        super(options);
    }
}

setWorldConstructor(CustomWorld)