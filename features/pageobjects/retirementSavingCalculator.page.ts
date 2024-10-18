import { $ } from '@wdio/globals'
import { BasePage } from './base.page';
import { logger } from './logger';

export class retirementSavingcalculatorpage extends BasePage {
    public get currentAge() {
        return $('//*[@id="current-age"]');
    }
    public get retirementAge() {
        return $('//*[@id="retirement-age"]');
    }
    public get currentIncome() {
        return $('//*[@id="current-income"]');
    }
    public get spouseIncome() {
        return $('//*[@id="spouse-income"]');
    }
    public get retirementSavings() {
        return $('//*[@id="current-total-savings"]');
    }
    public get contributionPercent() {
        return $('//*[@id="current-annual-savings"]');
    }
    public get increaseRateOfSavings() {
        return $('//*[@id="savings-increase-rate"]');
    }
    public get SecurityOverrideamount() {
        return $('//*[@id="social-security-override"]');
    }
    public get defaultValueHeader() {
        return $('//*[@id="default-values-modal-title"]')
    }
    public get otherIncome() {
        return $('//*[@id="additional-income"]');
    }
    public get retirementDuration() {
        return $('//*[@id="retirement-duration"]')
    }
    public get inflationYesButton() {
        return $('//*[@for="include-inflation"]');
    }
    public get expectedInflationRate() {
        return $('//*[@id="expected-inflation-rate"]')
    }
    public get retirementAnnualIncome() {
        return $('//*[@id="retirement-annual-income"]')
    }
    public get PreRoi() {
        return $('//*[@id="pre-retirement-roi"]')
    }
    public get postRoi() {
        return $('//*[@id="post-retirement-roi"]')
    }
    public get saveChanges() {
        return $('//*[text()="Save changes"]');
    }
    public get calculateButton() {
        return $('//*[text()="Calculate"]')
    }
    public get retirementAgeError() {
        return $('//*[@id="invalid-retirement-age-error"]');
    }
    public get currentAgeError() {
        return $('//*[@id="invalid-current-age-error"]');
    }
    public get reslutMessage() {
        return $('//*[@id="result-message"]')
    }
    public get socialSecurityFields() {
        return $('(//*[@class="row social-security-field"])[1]');

    }
    public get securityYesButton() {
        return $('//label[@for="yes-social-benefits"]');
    }
    public get securityNoButton() {
        return $('//label[@for="no-social-benefits"]');
    }
    public get maritalStatus() {
        return $('//label[@for="single"]');
    }
    public get adjustDefaultValues() {
        return $('//*[text()="Adjust default values"]')
    }
    async enterRetirementCalculatorForm(userData: any, useDefault: boolean = false): Promise<void> {
        if (useDefault) {
            await this.adjustDefaultValues.click();
            await this.defaultValueHeader.waitForDisplayed();
            await this.enterText(this.otherIncome, '10000');
            await this.enterText(this.retirementDuration, '5');
            await this.inflationYesButton.click();
            await this.enterText(this.expectedInflationRate, '8');
            await this.enterText(this.retirementAnnualIncome, '50');
            await this.enterText(this.PreRoi, '6');
            await this.enterText(this.postRoi, '5');
            await this.saveChanges.click();

            await this.enterText(this.currentAge, userData.currentAge);
            await this.enterText(this.retirementAge, userData.retirementAge);
            await this.enterText(this.currentIncome, userData.currentIncome);
            await this.enterText(this.spouseIncome, userData.spouseIncome);
            await this.enterText(this.retirementSavings, userData.retirementSavings);
            await this.enterText(this.contributionPercent, userData.contributionPercent);
            await this.enterText(this.increaseRateOfSavings, userData.increaseRateOfSavings);

        }
        else {
            await this.enterText(this.currentAge, userData.currentAge);
            await this.enterText(this.retirementAge, userData.retirementAge);
            await this.enterText(this.currentIncome, userData.currentIncome);
            await this.enterText(this.spouseIncome, userData.spouseIncome);
            await this.enterText(this.retirementSavings, userData.retirementSavings);
            await this.enterText(this.contributionPercent, userData.contributionPercent);
            await this.enterText(this.increaseRateOfSavings, userData.increaseRateOfSavings);
        }
    }


    async submitForm(): Promise<void> {
        logger.info('submitting the retirement calculator form');
        await this.clickElement(this.calculateButton);
    }

    async checkErrorMessage(expectedMessage: string, actualElement: ChainablePromiseElement): Promise<void> {
        logger.info('Checking error messages');
        const actualMessage = await this.getText(actualElement);
        expect(actualMessage).toBe(expectedMessage);
    }

    async checkErrorForField(field: string): Promise<void> {
        let actualErrorMessage = '';
        let expectedErrorMessage = '';

        switch (field) {
            case 'currentAge':
                actualErrorMessage = await this.getText(this.currentAgeError);
                expectedErrorMessage = 'Age cannot be greater than 120';
                break;
            case 'retirementAge':
                actualErrorMessage = await this.getText(this.retirementAgeError);
                expectedErrorMessage = 'Invalid retirement age';
                break;

            default:
                logger.error(`Invalid field name: ${field}`);
                throw new Error(`Unsupported field name: ${field}`);
        }


        expect(actualErrorMessage).toBe(expectedErrorMessage);
    }
    async validateAgeErrorMessages() {
        const currentAgeValue = await this.getText(this.currentAge);
        if (parseInt(currentAgeValue) > 120) {
            await this.checkErrorMessage('Age cannot be greater than 120', this.currentAgeError);
        }
        const retirementAgeValue = await this.getText(this.retirementAgeError);
        if (parseInt(retirementAgeValue) > 120 || currentAgeValue < retirementAgeValue) {
            await this.checkErrorMessage('Age cannot be greater than 120', this.retirementAgeError);
        } else {
            await this.checkErrorMessage('Planned retirement age must be greater than current age', this.retirementAgeError);
        }
    }

    async toggleSocialSecurity(enableFlag: string): Promise<void> {
        if (enableFlag === 'see') {
            await this.securityYesButton.click();
        } else {
            await this.securityNoButton.click();
        }
        const isVisible = await this.socialSecurityFields.isDisplayed();
        if ((enableFlag === 'see' && !isVisible) || (enableFlag === 'not see' && isVisible)) {
            throw new Error(`Social security field visibility mismatch: expected ${enableFlag}`);
        }
    }

}