const feetsAdmin = require("../pageobjects/feetsPageObject.js");
const data = require("../data/testData.js");
describe('feetsAdmin',function(){
    it('loginIntoNAIC', async function(){
        await feetsAdmin.getURL();
        await feetsAdmin.login(data.userName,data.password);
    });
    it('verifyValidExam',async function(){
        browser.sleep(5000);
        await feetsAdmin.enterExamNumber(data.examNumber);
        await feetsAdmin.clickSearch();
        await feetsAdmin.verifyExamNumber(data.examNumber);
    });
    it('verifyInvalidExam',async function(){
        browser.sleep(5000);
        await feetsAdmin.enterExamNumber(data.invalidExamNumber);
        await feetsAdmin.clickSearch();
        await feetsAdmin.verifyWarning();
        await feetsAdmin.verifySearchButtonText();
        await feetsAdmin.clickSearch();
    });
    it('returnToApplicationHomePage',async function(){
        browser.sleep(5000);
        await feetsAdmin.clickOnLogo();
        await feetsAdmin.verifyHomePage();
    });
    it('editClosedExam',async function(){
        browser.sleep(5000);
        await feetsAdmin.enterExamNumber(data.examNumber);
        await feetsAdmin.clickSearch();
        await feetsAdmin.verifyExamNumber(data.examNumber);
        await feetsAdmin.clickReOpen();
        browser.sleep(5000);
        await feetsAdmin.verifyExamStatus(data.statusOpen);
        await feetsAdmin.clickUndoChanges();
        await feetsAdmin.verifyExamStatus(data.statusClosed);
        await feetsAdmin.updateDates();
        await feetsAdmin.saveExam();
    });
})