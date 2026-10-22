import userData from "../fixtures/users/userData.json";
import MenuPage from "../pages/menuPage.js";
import LoginPage from "../pages/loginPage.js";
import DashboardPage from "../pages/dashboardPage.js";
import MyInfoPage from "../pages/myInfoPage.js";

const Chance = require('chance');

const chance = new Chance();
const menuPage = new MenuPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const myInfoPage = new MyInfoPage();
 
describe('Orange HRM Tests', () => {

  it('User Info Update - Success', () => {
    //login
    loginPage.accessLoginPage();
    loginPage.loginWithUser(userData.userSuccess.userName, userData.userSuccess.password);
    dashboardPage.checkDashboardPage();
    //access My Info Page
    menuPage.acessMyInfo();
    //Update info
    myInfoPage.fillName(chance.first(), chance.last(), chance.last());
    myInfoPage.fillEmployeeDetails("11111", "22222", "33333", "2026-12-16");
    myInfoPage.fillPersonalDetail("2025-11-16", "Swedish");
    myInfoPage.saveForm();
  })
})