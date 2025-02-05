import { LoginPage } from "../../ pages/login.page";
import { Urls } from "../../utils/urls.enum";
import { test } from "../fixtures/base.fixture";

const properUsername = "standard_user";
const properPassword = "secret_sauce";

export async function completeLogin(loginPage: LoginPage): Promise<void> {
    return test.step('Login with credentials', async () => {
      // Go to main page and log in
        await loginPage.goto(Urls.LoginPage, { waitUntil: "load" });
        await loginPage.fillLoginForm(properUsername, properPassword);
        await loginPage.clickLoginButton();  
    });
  }
  