import { Given, When, Then } from '@wdio/cucumber-framework';
import { getCSVFilePath, getDataForUser } from '../pageobjects/utils';
import { retirementSavingcalculatorpage } from '../pageobjects/retirementSavingCalculator.page';
import { logger } from '../pageobjects/logger';  // Import the logger

const retirementSavingCalculator = new retirementSavingcalculatorpage();
let userData: any;

Given('User opens the retirement calculator page', async () => {
    logger.info('Navigating to the retirement calculator page');
    await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
    await browser.maximizeWindow();
});

When('User submits the retirement calculator form', async () => {
    logger.info('Submitting the retirement calculator form');
    await retirementSavingCalculator.submitForm();
});

Then('User should see the estimated retirement needs', async () => {
    logger.info('Verifying the estimated retirement needs');
    await retirementSavingCalculator.reslutMessage.isDisplayed();
});



Then(`User should see the error message for invalid fields`, async () => {
    logger.info(`Verifying error message for the field`);
    await retirementSavingCalculator.validateAgeErrorMessages();
});


When('User enters the {string}', async (retirementData: string) => {
    logger.info(`Entering data for retirement calculation: ${retirementData}`);
    userData = await getDataForUser(getCSVFilePath('retirementData.csv'), retirementData);
    await retirementSavingCalculator.enterRetirementCalculatorForm(userData);
});

Then('User should click Social Security benefits and choose {string} option and enter the amount', async (buttonOption: string) => {
    logger.info('Selecting Social Security benefits and marital status');

    await browser.execute(() => {
        const radioButton = document.getElementById('yes-social-benefits');
        if (radioButton) {
            radioButton.click();
        }
    });
    switch (buttonOption) {
        case 'single':
            await retirementSavingCalculator.enterText(retirementSavingCalculator.SecurityOverrideamount, userData.socialSecurityAmount);
            break;
        case 'married':
            const radioMaritalStatusButton = retirementSavingCalculator.maritalStatus;
            await radioMaritalStatusButton.scrollIntoView();
            await retirementSavingCalculator.clickElement(radioMaritalStatusButton);
            await retirementSavingCalculator.enterText(retirementSavingCalculator.SecurityOverrideamount, userData.socialSecurityAmount);
            break;
    }

});


When('user selects social security field as {string} on pre-retirement calculator', async (toggleButton: string) => {
    logger.info(`Selecting social security option: ${toggleButton}`);
    await retirementSavingCalculator.toggleSocialSecurity(toggleButton);
});

Then('user should {string} social security fields as visible', async (enableFlag: string) => {
    logger.info(`Verifying social security fields visibility`);
    await retirementSavingCalculator.toggleSocialSecurity(enableFlag);
});

When(`User enters the {string} with default values {string}`, async (retirementData: string, useDefault: string) => {
    userData = await getDataForUser(getCSVFilePath('retirementData.csv'), retirementData);
    const useDefaultFlag = useDefault === 'true';
    await retirementSavingCalculator.enterRetirementCalculatorForm(userData, useDefaultFlag);
});
