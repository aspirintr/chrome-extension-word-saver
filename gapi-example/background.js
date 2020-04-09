const API_KEY = 'AIzaSyCTEfVBD1yBx2GqmTlYFixaWjAnZLSBJGI';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SPREADSHEET_ID = '1npSet-E1y5DSO__9OzcVVDVHWjsN4arMI0Fuj69Jnkw';
const SPREADSHEET_TAB_NAME = 'Main';

function onGAPILoad() {
  gapi.client.init({
    // Don't pass client nor scope as these will init auth2, which we don't want
    // clientId: CLIENT_ID,
    // scope: SCOPES,
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  }).then(function () {
    console.log('gapi initialized')
        chrome.identity.getAuthToken({interactive: true}, function(token) {
      gapi.auth.setToken({
        'access_token': token,
      });

      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: SPREADSHEET_TAB_NAME,
      }).then(function(response) {
        console.log(`Got ${response.result.values.length} rows back`)
      });
    })
  }, function(error) {
    console.log('error', error)
  });
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Get token
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      // Set token in GAPI library
      gapi.auth.setToken({
        'access_token': token,
      });

      const body = {values: [[
        new Date(), // Timestamp
        request.title, // Page title
        request.url, // Page URl
      ]]};

      // Append values
      gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: SPREADSHEET_TAB_NAME,
        valueInputOption: 'USER_ENTERED',
        resource: body
      }).then((response) => {
        console.log(`${response.result.updates.updatedCells} cells appended.`)
        sendResponse({success: true});
      });
    })

    // Wait for response
    return true;
  }
);
