const { Builder,Browser,By,Key,Select,until } = require('selenium-webdriver');
const assert = require("assert");

async function Testing(){
    
    try {

    let driver = await new Builder().forBrowser(Browser.CHROME).build();


    // memperlambat inputan text
    async function typeSlowly(element, text, delay = 50) {  
        return new Promise(resolve => {
            let index = 0;
            const intervalId = setInterval(() => {
                if (index < text.length) {
                    element.sendKeys(text[index]);
                    index++;
                } else {
                    clearInterval(intervalId);
                    resolve();   
                }
            }, delay);
        });
    }
    
    // untuk memeriksa apakah elemen web yang ditentukan oleh locator terlihat di browser
    async function checkElementVisibility(locator) {
        try {
          await driver.wait(until.
            elementLocated(locator), 5000);
          const element = await driver.findElement(locator);
          const isVisible = await element.isDisplayed();
          return isVisible ? element : null;
        } catch (error) {
          console.error('Error checking element visibility:', error);
          return null;
        }
      }

    //Login
    async function Login(userName, password) {
           
        try{
        await driver.get('http://45.126.134.8/');
        inputName = await driver.wait(until.elementLocated(By.className('form-control')),10000);
        await typeSlowly(inputName, userName);
        inputPassword = await driver.wait(until.elementLocated(By.id('psw-input')), 10000);
        await typeSlowly(inputPassword, password);
        const buttonSignIn = await driver.findElement(By.xpath('//button[@type="submit"]'));
    
        await driver.sleep(1000);
        await buttonSignIn.click();
        await driver.sleep(2000);
            }catch(error){
            console.error('Error', error);
        }
    }
    

    //Registration
    async function Registration() {  
     try{
        await driver.get('http://45.126.134.8/FormProspectWeb');
        
        async function dataPelanggan(namaPelanggan, tanggalLahir, noKtpPasport, jenisKelamin, noTelepon ,noPonsel) { 

            (async function nameCustomer() {
                const nameCustomer = await driver.wait(until.elementLocated(By.name('CustomerName')),10000);
                await typeSlowly(nameCustomer, namaPelanggan); 
            })();
            await driver.executeScript('window.scrollBy(0, 100)');
            await driver.sleep(1000);
            

            (async function birthDay() {
                const birthDay = await driver.wait(until.elementLocated(By.xpath('//input[@id="inptDateOfBirth"]')),10000);
                await typeSlowly(birthDay, tanggalLahir);
                await birthDay.sendKeys(Key.ENTER);
            })();
            await driver.executeScript('window.scrollBy(0, 100)');
            await driver.sleep(1000);
            
            
            (async function idChart() {

                const idChart = await driver.wait(until.elementLocated(By.name('IdCard')),10000);
                await typeSlowly(idChart, noKtpPasport);
            })();
            await driver.sleep(1000);

            (async function selectGender() {   
                const SGender = await driver.findElement(By.xpath('//select[@name="Gender"]'));
                const select = new Select(SGender);
                const famale = await driver.findElement(By.css('option[value="F"]'));
                const male = await driver.findElement(By.css('option[value="M"]'));
                await select.selectByIndex(jenisKelamin);  // Famale = 1 / Male = 2
            })();
            await driver.executeScript('window.scrollBy(0, 100)');
            await driver.sleep(1000);

            (async function phoneNumber() {
                const phoneNumber = await driver.wait(until.elementLocated(By.name('PhoneNumber')),10000);
                await typeSlowly(phoneNumber, noTelepon); 
            })();
            await driver.executeScript('window.scrollBy(0, 400)');
            await driver.sleep(1000);
            
            (async function mobilePhoneNumber() {
                const mobilePhoneNumber = await driver.wait(until.elementLocated(By.name('MobilePhoneNumber')),10000);
                await typeSlowly(mobilePhoneNumber, noPonsel); 
                await mobilePhoneNumber.sendKeys(Key.ENTER);
            })();
            await driver.sleep(3000);
            
        };



        async function  alamatInstalasi(homeID, emailCustomer) {

            try {
                await driver.executeScript('window.scrollBy(0, -300)');
                await driver.sleep(2000);
                (async function inputHomeID() {
                    const inputHomeID = await driver.wait(until.elementLocated(By.xpath('//input[@id="inptSearchHomeId"]')));
                    await typeSlowly(inputHomeID, homeID);
                    await inputHomeID.sendKeys(Key.TAB, Key.ENTER);
                })();
                await driver.sleep(2000);
                await driver.executeScript('window.scrollBy(0, 300)');
                await driver.sleep(1000);

                (async function inputEmailCustomer () {
                    const inputEmailCustomer = await driver.wait(until.elementLocated(By.xpath('//input[@id="inptEmailAddress"]')));
                    await typeSlowly(inputEmailCustomer, emailCustomer);
                    await inputEmailCustomer.sendKeys(Key.ENTER);
                })();
                await driver.sleep(2000);

            }catch(error){
            console.error('Error', error);
            };
        };


        async function servisInstalasi(userNameCustomer, tanggalAktivasi, waktuAktivasi) {
            
            try{
                await driver.executeScript('window.scrollBy(0, -300)');
                await driver.sleep(500);

                (async function inputUserName() {
                    const inputUserName = await driver.wait(until.elementLocated(By.xpath('//input[@id="inptUsername"]')));
                    await typeSlowly(inputUserName, userNameCustomer)
                    await driver.sleep(2000);
                    await inputUserName.sendKeys(Key.TAB);
                })();
                await driver.sleep(2000);
                await driver.executeScript('window.scrollBy(0, 300)');
                await driver.sleep(1000);

                (async function inputTanggalAktivasi(){
                    const inputTanggalAktivasi = await driver.wait(until.elementLocated(By.xpath('//input[@id="inputDateActivation"]')));
                    await typeSlowly(inputTanggalAktivasi ,tanggalAktivasi);
                    await inputTanggalAktivasi.sendKeys(Key.ENTER);
                })();
                await driver.sleep(2000);

                (async function inputWaktuAktivasi() {
                    
                    await driver.findElement(By.xpath('//span[@id="select2-inputTimeActivation-container"]')).click();
                    const inputWaktuAktivasi = await driver.wait(until.elementLocated(By.xpath('//input[@class="select2-search__field"]')));
                    await typeSlowly(inputWaktuAktivasi, waktuAktivasi)
                    await inputWaktuAktivasi.sendKeys(Key.ENTER);
                })();
                await driver.sleep(2000);
                await driver.findElement(By.xpath('//button[@id="btnNextActivation"]')).click();
                await driver.sleep(1000);

            }catch(error){
            console.error('Error', error);
            };
        };

        async function kalkulasiPembayaran(servicePackage, promo,additionalPackage1, additionalPackage2, additionalPackage3) {
            try{
                await driver.executeScript('window.scrollBy(0,-100)')
                await driver.sleep(1000);
                (async function inputServicePackage() {
                    await driver.findElement(By.xpath('//span[@id="select2-inptServicePackage-container"]')).click();
                    await driver.sleep(1000);
                    const selectServicePackage = await driver.wait(until.elementLocated(By.xpath('//input[@class="select2-search__field"]')),10000);
                    await typeSlowly(selectServicePackage, servicePackage);
                    await selectServicePackage.sendKeys(Key.ENTER);
                })();
                await driver.sleep(2000);
                
                
                

                (async function inputPromo(){
                    await driver.findElement(By.xpath('//*[@id="select2-inptPromo-container"]')).click();
                    await driver.sleep(1000);
                    const inputPromo = await driver.wait(until.elementLocated(By.xpath('//input[@class="select2-search__field"]')),10000);
                    await typeSlowly(inputPromo, promo);
                    await inputPromo.sendKeys(Key.ENTER);
                })();
                await driver.sleep(5000);
                await driver.executeScript('window.scrollBy(0, 200)');
                await driver.sleep(1000);

                (async function inputAdditionalPackage() {
                    const packages = [additionalPackage1, additionalPackage2, additionalPackage3]; 
                    for (let package of packages) {
                        console.log(`Processing package: ${package}`);
                        const additionalPackageElement = await checkElementVisibility(By.xpath('//*[@id="step-4"]/div[3]/div/div[1]/span/span[1]/span'));
                        if (additionalPackageElement) {
                        await additionalPackageElement.click();
                        const inputAdditionalPackage = await driver.wait(until.elementLocated(By.xpath('/html/body/span/span/span[1]/input')),10000);
                        await typeSlowly(inputAdditionalPackage, package);
                        await inputAdditionalPackage.sendKeys(Key.ENTER);
                        await driver.findElement(By.xpath('//*[@id="btnAddPackage"]')).click();
                        await driver.sleep(1000);
                      } else {
                        console.log('Element not found or not visible:', package);
                      }
                    }
                })();
                await driver.sleep(6000);
                await driver.executeScript('window.scrollBy(0, 400)');
                await driver.sleep(1000);  
                await driver.findElement(By.xpath('//button[@id="btnNextCalculate"]')).sendKeys(Key.ENTER);

            }catch(error){
            console.error('Error', error);
            };
            
        };

        async function Document() {
          
            try{
                await driver.executeScript('window.scrollBy(0, -500)');
                await driver.sleep(2000);
                (async function uploadKtp() {
                    const KTP = await driver.wait(until.elementLocated(By.xpath('//input[@id="selectedKTP"]')),10000);
                    await KTP.sendKeys("C:\\Users\\Jimi Firgo Dakhi\\OneDrive\\Gambar\\Screenshots\\Picture2.png");
                })();
                await driver.sleep(1000);
                await driver.executeScript('window.scrollBy(0, 300)');
                await driver.sleep(2000);

                (async function uploadNpwp() {
                    const NPWP = await driver.wait(until.elementLocated(By.xpath('//input[@id="selectedNPWP"]')),10000);
                    await NPWP.sendKeys("C:\\Users\\Jimi Firgo Dakhi\\OneDrive\\Gambar\\Screenshots\\Picture2.png")
                })();
                await driver.sleep(1000);
                await driver.executeScript('window.scrollBy(0, 300)');
                await driver.sleep(2000);

                (async function uploadPassport() {
                    const PASSPORT = await driver.wait(until.elementLocated(By.xpath('//input[@id="selectedPassport"]')),10000);
                    await PASSPORT.sendKeys("C:\\Users\\Jimi Firgo Dakhi\\OneDrive\\Gambar\\Screenshots\\Picture2.png");
                })();
                await driver.sleep(1000);
                await driver.executeScript('window.scrollBy(0, 300)');
                await driver.sleep(2000);

                (async function uploadFotoRumah() {
                    const fotoRumah = await driver.wait(until.elementLocated(By.xpath('//input[@id="selectedHomePict"]')),10000);
                    await fotoRumah.sendKeys("C:\\Users\\Jimi Firgo Dakhi\\OneDrive\\Gambar\\Screenshots\\Picture2.png");
                })();
                await driver.sleep(1000);
                await driver.executeScript('window.scrollBy(0, 300)');
                await driver.sleep(2000);
                
                const nextButton = await checkElementVisibility(By.xpath('//*[@id="step-5"]/div[5]/div[2]/button'));
                  if (nextButton) {
                    await nextButton.sendKeys(Key.ENTER); // Example: Click the visible element
                  } else {
                    console.log('Element not found or not visible');
                  }
                await driver.sleep(2000);

            }catch(error){
                console.log(error)
            };

        };

        async function Ringkasan() {
            await driver.executeScript('window.scrollBy(0, -350)');
            await driver.sleep(3000);

            await driver.executeScript('window.scrollBy(0, 450)')
            await driver.sleep(1000);
            await driver.findElement(By.xpath('//*[@id="accordionEight"]/h6')).click();
            await driver.sleep(2000);

            await driver.executeScript('window.scrollBy(0,300)');
            await driver.sleep(1000);
            await driver.findElement(By.xpath('//*[@id="accordionNine"]/h6')).click();
            await driver.sleep(2000);
            await driver.executeScript('window.scrollBy(0,400)');

            await driver.sleep(1000);
            await driver.findElement(By.xpath('//*[@id="accordionTen"]/h6')).click();
            await driver.sleep(2000);
            await driver.executeScript('window.scrollBy(0,400)');
            
            await driver.sleep(1000);
            await driver.findElement(By.xpath('//*[@id="accordionEleven"]/h6')).click();
            await driver.sleep(2000);
            await driver.executeScript('window.scrollBy(0,400)');

            await driver.sleep(1000);
            await driver.findElement(By.xpath('//*[@id="btnFinish"]')).click();
            await driver.sleep(5000);
            await driver.findElement(By.xpath('/html/body/div[9]/div[7]/div/button')).click();
            await driver.sleep(2000);
            
        }

        (async function mRegistration() {
            
            try{

            await dataPelanggan('Customer40', '11-Oct-2040', '1404567890987678', '1', '82404045566', '82408879887');
            await alamatInstalasi('MSONE.1.00001.00040', 'bagong140@gmail.com');
            await servisInstalasi('contoh0040', '16-Oct-2024', '13:00');
            await kalkulasiPembayaran('CBN Fiber 1G', 'Regular Promo September 2023 - Advance Payment 6 Months', 'DramaFlix', 'Cubmu Premium (Free)', 'GamersCode Excite' );
            await Document();
            await Ringkasan();

            }catch(error){
                console.error('Error', error);
                };
        })();

     }catch(error){
      console.error('Error', error);
      };
    };

    
    // Main
        (async function main() {
        try{

            await Login ('rijal', '!cybi2020');
            await Registration();
        
        } catch (error) {
            console.log('Error:', error);
        }finally{
            await driver.sleep(120000);
            await driver.quit();
            
        }
        })();    

  
    }catch(error){
    console.error('Error', error);
    };
    
}
Testing();


