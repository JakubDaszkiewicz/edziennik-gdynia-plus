browser.browserAction.onClicked.addListener((tab) => {
  var creating = browser.tabs.create({
   url:"https://nasze.miasto.gdynia.pl/ed_miej/login.pl"
  });
});