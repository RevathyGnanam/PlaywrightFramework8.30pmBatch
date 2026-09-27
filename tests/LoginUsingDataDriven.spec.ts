import { test, expect } from '@playwright/test'
import { TestConfig } from '../test.config'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/loginPage'
import { MyAccountPage } from '../pages/MyAccountPage'
import { DataProvider } from '../utils/dataProvider'

//Load the Json
const JsonPath = 'data/logindata.json'
const JsonTestData = DataProvider.getTestDataFromJson(JsonPath)

for (const data of JsonTestData) {
    test(`Login test with JSON Data: ${data.testName} @datadriven`, async ({ page }) => {
        let config = new TestConfig();
        await page.goto(config.appurl)

        let homePage = new HomePage(page)
        await homePage.clickMyAccount()
        await homePage.clickLogin()

        let loginPage = new LoginPage(page)
        await loginPage.login(data.email,data.password)

        await page.waitForTimeout(5000)

        let  myAccountPage = new MyAccountPage(page)
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy()



    })
}


const csvPath = 'data/logindata.csv'
const CsvTestData = DataProvider.getTestDataFromCsv(csvPath)

for (const data of CsvTestData) {
    test(`Login test with csv Data: ${data.testName} @datadriven`, async ({ page }) => {
        let config = new TestConfig();
        await page.goto(config.appurl)

        let homePage = new HomePage(page)
        await homePage.clickMyAccount()
        await homePage.clickLogin()

        let loginPage = new LoginPage(page)
        await loginPage.login(data.email,data.password)

        await page.waitForTimeout(5000)

        let  myAccountPage = new MyAccountPage(page)
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy()



    })
}