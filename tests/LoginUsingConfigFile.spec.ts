import{test,expect} from '@playwright/test'
import{TestConfig} from '../test.config'
import{HomePage} from '../pages/HomePage'
import{LoginPage} from '../pages/loginPage'
import{MyAccountPage} from '../pages/MyAccountPage'

 let homePage:HomePage;
  let config:TestConfig;
  let loginPage:LoginPage
  let myAccountPage:MyAccountPage

  test.beforeEach(async({page})=>{
       config = new TestConfig();
      await page.goto(config.appurl)
      homePage =new HomePage(page)
       loginPage = new LoginPage(page)
       myAccountPage = new MyAccountPage(page)
  })
  
  test.afterEach(async({page})=>{
  await page.waitForTimeout(5000)
  await page.close()
  })

  test('Login using config file @master @sanity @regression',async()=>{
//Navigate the login page from home page
await homePage.clickMyAccount()
await homePage.clickLogin()

//enter valid credetials
await loginPage.setEmail(config.email)
await loginPage.setPassword(config.password)
await loginPage.clickLogin()

//alternatively
//await loginPage.login(config.email,config.password)

expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy()



  })