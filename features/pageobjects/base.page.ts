import { ChainablePromiseElement } from 'webdriverio';
import { logger } from '../pageobjects/logger.ts';
export class BasePage {
    async enterText(element: ChainablePromiseElement, value: string): Promise<void> {
        try {
            await element.click();
            await element.setValue(value);
            logger.info(`Entered value '${value}' into ${element.selector}`);
        } catch (error) {
            logger.error(`Failed to enter value '${value}' into ${element.selector}: ${error}`);
            throw error;
        }
    }

    async clickElement(element: ChainablePromiseElement): Promise<void> {
        try {
            await element.click(); 
            logger.info(`Clicked on ${element.selector}`);
        } catch (error) {
            logger.error(`Failed to click on ${element.selector}: ${error}`);
            throw error;
        }
    }

    async toggleButton(element: ChainablePromiseElement): Promise<void> {
        try {
            await element.click();
            logger.info(`Toggled button ${element.selector}`);
        } catch (error) {
            logger.error(`Failed to toggle button ${element.selector}: ${error}`);
            throw error;
        }
    }

    async isElementDisplayed(element: ChainablePromiseElement): Promise<boolean> {
        try {
            const isDisplayed = await element.isDisplayed();
            logger.info(`${element.selector} is displayed: ${isDisplayed}`);
            return isDisplayed;
        } catch (error) {
            logger.error(`Failed to check if ${element.selector} is displayed: ${error}`);
            throw error;
        }
    }

    async getText(element: ChainablePromiseElement): Promise<string> {
        try {
            const text = await element.getText();
            logger.info(`Text from ${element.selector} is '${text}'`);
            return text;
        } catch (error) {
            logger.error(`Failed to get text from ${element.selector}: ${error}`);
            throw error;
        }
    }

}
