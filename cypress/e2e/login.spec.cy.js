import userData from "../fixtures/users/userData.json";
import MenuPage from "../pages/menuPage.js";
import LoginPage from "../pages/loginPage.js";
import DashboardPage from "../pages/dashboardPage.js";
import MyInfoPage from "../pages/myInfoPage.js";

const menuPage = new MenuPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const myInfoPage = new MyInfoPage();
 
describe('Login Orange HRM Tests', () => {

  it('Login Success', () => {
    loginPage.accessLoginPage();
    loginPage.loginWithUser(userData.userSuccess.userName, userData.userSuccess.password);
    dashboardPage.checkDashboardPage();   
  })

  it('Login Fail', () => {
    loginPage.accessLoginPage();
    loginPage.loginWithUser(userData.userFail.userName, userData.userFail.password);
    loginPage.checkLoginFail();
  })
})