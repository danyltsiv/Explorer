let response = getResponse('http://localhost:5000/tree');
let folderObject = JSON.parse(response);
let ex = new Explorer(document.getElementById('general'), folderObject);
ex.explore();
ex.goToFolder(ex.generalFolderObj);