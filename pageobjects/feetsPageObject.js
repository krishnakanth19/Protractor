var feetsAdmin = function(){
    var enterExam = element(by.id('examNumber'));
    var btnSearch = element(by.id('search'));
    var userName = element(by.id('INT_USERNAME'));
    var password = element(by.id('INT_PASSWORD'));
    var btnLogin = element(by.id('INT_LOGIN_BTN'));
    var warning = element(by.id('warning'));
    var logo = element(by.css('.app-logo.app-home'));
    var reOpen = element(by.id('reopen'));
    var status = element(by.id('status'));
    var undoChanges = element(by.id('reset'));
    var formDate = element(by.css('p-calender[formControlName=periodBegin]'));
    var calender = element(by.class('ui-datepicker-calender'));
    var date = element(by.linkText('8'));
    var toDate = element(by.css('p-calender[formControlName=periodEnd]'));
    var startDate = element(by.css('p-calender[formControlName=anticipatedBegin]'));
    var premiumYear = element(by.id('premiunYear'));
    var save = element(by.id('save'));

    this.getURL = async function(){
        browser.ignoreSynchronization = true;       //for non-angular Applications
        await browser.get("https:isiteplus-int.naic.org/mfl-feets-admin/#/exam");
    }

    this.login = async function(user,psw){
        await userName.sendKeys(user);
        await password.sendKeys(psw);
        await btnLogin.click();
    }

    this.enterExamNumber = async function(examNumber){
        browser.ignoreSynchronization = false;      //for angular apps, by default it is false
        browser.refresh();
        await examNumber.sendKeys(examNumber);
    }

    this.clickSearch = async function(){
        await btnSearch.click();
    }

    this.verifyExamNumber = async function (examNumber) {
        await expect(enterExam.getAttribute('value')).toEqual(examNumber);
    }

    this.verifyWarning = async function(){
        await expect(warning.getText()).toContain('was not found');
    }

    this.verifySearchButtonText = async function(){
        await expect(btnSearch.getText()).toContain('search');
    }

    this.clickOnLogo = async function(){
        await logo.click();
    }

    this.verifyHomePage = async function(){
        await expect(enterExam.isDisplayed()).toBeTruthy();
    }

    this.clickReOpen = async function(){
        await reOpen.click();
    }

    this.verifyExamStatus = async function(changedStatus){
        await expect(status.getAttribute('value')).toEqual(changedStatus);
    }

    this.clickUndoChanges = async function(){
        await undoChanges.click();
    }

    this.updateDates = async function(){
        await formDate.click();
        await date.click();
        await toDate.click();
        await date.click();
        await startDate.click();
        await date.click();
        var options = premiumYear.all(by.tagName('option'))
        .then(function(options){
            options[4].click();
        });
        await undoChanges.click();
        await browser.switchTo().alert().accept();
    }

    this.saveExam = async function(){
        await save.click();
        browser.pause();
    }
}
module.exports = new feetsAdmin();