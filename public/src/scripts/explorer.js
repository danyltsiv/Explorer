function Explorer(division, object){ 
    this.generalFolderObj = object;
    this.generalSection = division;
    this.generalSection.textContent = '';
    this.currentFolder = this.generalFolderObj;
    this.currentWindowElements = this.generalFolderObj;
    this.sorter = new Sorter();
   
    this.header = document.createElement('header');
    this.breadcrumbsSpan = document.createElement('span');
    this.searchInput = document.createElement('input');
    this.searchSpan = document.createElement('span');
    
    this.explorerDiv = document.createElement('div');
    
    this.popupDiv = document.createElement('div');
    this.popupContentDiv = document.createElement('div');
    this.popupContentSpanX = document.createElement('span');
    this.nameDiv = document.createElement('div');
    this.nameH5 = document.createElement('h5');
    this.nameUl = document.createElement('ul');

    this.sizeDiv = document.createElement('div');
    this.sizeToggler = document.createElement('span');
    this.sizeH5 = document.createElement('h5');
    this.sizeUl = document.createElement('ul');
    
    this.dateDiv = document.createElement('div');
    this.dateToggler = document.createElement('span');
    this.dateH5 = document.createElement('h5');
    this.dateUl = document.createElement('ul');
   
    this.windowDiv = document.createElement('div');
    
    this.footer = document.createElement('footer');

    this.initElements();
}
//Creates a directory tree with functionality on the similarity of windows explorer.
Explorer.prototype.explore = function(){
    let me = this;
    let folderObj = arguments[0] || this.generalFolderObj;
    let explorerDiv = arguments[1] || this.explorerDiv;
    let folderDiv = document.createElement('div');
    folderDiv.className = 'folder';
    let contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    contentDiv.classList.add('hidden');
    let spanToggle = document.createElement('span');
    spanToggle.className = 'glyphicon glyphicon-plus';
    spanToggle.addEventListener('click', function(){
        if (this.parentElement.nextElementSibling.classList.contains('hidden')){
            this.parentElement.nextElementSibling.classList.remove('hidden');
            this.parentElement.nextElementSibling.classList.add('opened');
            spanToggle.className = 'glyphicon glyphicon-minus';
        } else if (this.parentElement.nextElementSibling.classList.contains('opened')){
            this.parentElement.nextElementSibling.classList.remove('opened');
            this.parentElement.nextElementSibling.classList.add('hidden'); 
            spanToggle.className = 'glyphicon glyphicon-plus';
        }
    });
    let headerSpan = document.createElement('span');
    let folderName = document.createElement('span');
    folderName.textContent = folderObj.name;
    folderName.addEventListener('click', function(){
        me.goToFolder(folderObj);
    });
    headerSpan.className = 'name';
    headerSpan.appendChild(spanToggle);
    headerSpan.appendChild(folderName);    
    folderDiv.appendChild(headerSpan);
    folderDiv.appendChild(contentDiv);

    for (let key in folderObj.children){
        folderObj.children[key].parent = folderObj;
        if (folderObj.children[key].children){
            this.explore(folderObj.children[key], contentDiv);
        }
    }

    explorerDiv.appendChild(folderDiv);
};

Explorer.prototype.initElements = function() {
    let me = this;

    this.breadcrumbsSpan.setAttribute('id','breadcrumbs');
    
    this.searchInput.setAttribute('placeholder','search');
    this.searchInput.addEventListener('keyup', function(){
        me.searchHandler(this.value);
    });

    this.searchSpan.setAttribute('id', 'search');
    this.searchSpan.appendChild(this.searchInput);      
      
    this.header.appendChild(this.breadcrumbsSpan);
    this.header.appendChild(this.searchSpan);
    
    this.explorerDiv.setAttribute('id','explorer');
    
    this.nameDiv.setAttribute('id','nameDiv');
    this.nameH5.textContent = 'Name';
    this.nameDiv.appendChild(this.nameH5);  
    this.nameDiv.appendChild(this.nameUl);
    this.popupDiv.className = 'popup';
    this.popupContentDiv.className = 'popupContent';
    this.popupContentSpanX.className = 'close';
    this.popupContentSpanX.textContent = 'X';
    this.popupContentSpanX.addEventListener('click', function(){
        me.popupDiv.style.display = 'none';                   
        if (this.nextElementSibling.pause) this.nextElementSibling.pause();
        this.parentElement.removeChild(this.nextElementSibling);               
    });
    this.popupContentDiv.appendChild(this.popupContentSpanX);
    this.popupDiv.appendChild(this.popupContentDiv);
    this.nameDiv.appendChild(this.popupDiv);

    this.sizeDiv.setAttribute('id','sizeDiv');
    this.sizeH5.textContent = 'Size';
    this.sizeToggler.className = 'glyphicon glyphicon-sort up';
    this.sizeToggler.addEventListener('click', function(){
        me.sortHandler(this,'size');
    });
    this.sizeH5.appendChild(this.sizeToggler);  
    this.sizeDiv.appendChild(this.sizeH5);    
    this.sizeDiv.appendChild(this.sizeUl);

    this.dateDiv.setAttribute('id','dateDiv');
    this.dateH5.textContent = 'Date';
    this.dateToggler.className = 'glyphicon glyphicon-sort up';
    this.dateToggler.addEventListener('click', function(){
        me.sortHandler(this,'date');
    });
    this.dateH5.appendChild(this.dateToggler);  
    this.dateDiv.appendChild(this.dateH5);
    this.dateDiv.appendChild(this.dateUl);
    
    this.windowDiv.setAttribute('id','window');
    this.windowDiv.appendChild(this.nameDiv);
    this.windowDiv.appendChild(this.dateDiv);
    this.windowDiv.appendChild(this.sizeDiv);
    
    this.generalSection.appendChild(this.header);
    this.generalSection.appendChild(this.explorerDiv);
    this.generalSection.appendChild(this.windowDiv);
    this.generalSection.appendChild(this.footer);

    this.sorter.typeSort(1, this.generalFolderObj, true);
    this.sorter.nameSort(1,this.generalFolderObj, true);
};

Explorer.prototype.initBreadCrumbs = function(folderObj){
    let me = this;
    let folderObjectsPath = [];
    this.takePath(folderObj,folderObjectsPath);
    
    for(let i = folderObjectsPath.length - 1; i >= 0 ; i--)
    {
        let folderElementSpan = document.createElement('span');
        folderElementSpan.textContent = folderObjectsPath[i].name;      
        if (i != 0){
            let chevronSpan = document.createElement('span');
            chevronSpan.className = 'glyphicon glyphicon-chevron-right'; 
            folderElementSpan.addEventListener('click', function(){
                me.goToFolder(folderObjectsPath[i]);
            });
            folderElementSpan.appendChild(chevronSpan);
        } else {
            folderElementSpan.className = 'active';
        }
        this.breadcrumbsSpan.appendChild(folderElementSpan);
    }
};

Explorer.prototype.takePath = function(folderObj, folderObjectsPath){   
    folderObjectsPath[folderObjectsPath.length] = folderObj;
    if (folderObj.parent) this.takePath(folderObj.parent, folderObjectsPath);
};

Explorer.prototype.sortHandler = function(objectHandle, kindOfSort){
    let sortOption;
    if (objectHandle.className == 'glyphicon glyphicon-sort up'){
        objectHandle.className = 'glyphicon glyphicon-sort bot';
        sortOption = 1;
    } else {
        objectHandle.className = 'glyphicon glyphicon-sort up';
        sortOption = -1;
    }
    this.clearUls();
    switch(kindOfSort){
    case 'size':
        this.sorter.sizeSort(sortOption, this.currentWindowElements, false);
        break;
    case 'date':
        this.sorter.dateSort(sortOption, this.currentWindowElements, false);
        break;
    }
    this.initWindowElements(this.currentWindowElements);
};

Explorer.prototype.findElements = function(desiredElement,folderObj,findedFolderObjects){
    for(let key in folderObj.children)
    {
        if (folderObj.children[key].name.indexOf(desiredElement,0)!=-1) {
            findedFolderObjects[findedFolderObjects.length] = folderObj.children[key];
        }
        this.findElements(desiredElement,folderObj.children[key], findedFolderObjects);
    }
};

Explorer.prototype.searchHandler = function(desiredElement){
    this.clearUls();
    let findedFolderObjects = [];
    
    this.findElements(desiredElement,this.currentFolder,findedFolderObjects);
    this.currentWindowElements = {parent:this.currentFolder,name:'found',children:findedFolderObjects};
    this.sorter.typeSort(1,this.currentWindowElements, false);
    this.sorter.nameSort(1,this.currentWindowElements,false);
    this.initWindowElements(this.currentWindowElements);
    this.initFooter(this.currentWindowElements);
};

Explorer.prototype.getInfoAboutFolder = function(folderObj){
    let folders = 0;
    let files = 0;
 
    for(let key in folderObj.children){
        if (folderObj.children[key].children){ 
            folders++;
        } else {
            files++;
        }
    }
    
    return {folders, files};
};

Explorer.prototype.initFooter = function(folderObj){  
    let folderInfo = this.getInfoAboutFolder(folderObj);
    this.footer.textContent = 'Folders: ' + folderInfo.folders + ' | Files: ' + folderInfo.files;
};

Explorer.prototype.initWindowElements = function(folderObj){
    let me = this;
    if (folderObj.parent) {
        let backLi = document.createElement('li');
        backLi.className = 'name';
        let dateLi = document.createElement('li');
        let sizeLi = document.createElement('li');
        backLi.textContent = '...';
        dateLi.textContent = '<DIR>';
        sizeLi.textContent = '<DIR>';
        backLi.addEventListener('dblclick', function(){
            me.goToFolder(folderObj.parent);
        });
        this.nameUl.appendChild(backLi);
        this.sizeUl.appendChild(dateLi);
        this.dateUl.appendChild(sizeLi);
    }    

    for (let key in folderObj.children){
        let nameLi = document.createElement('li');
        nameLi.className = 'name';
        let dateLi = document.createElement('li');
        let sizeLi = document.createElement('li');
        let iconSpan = document.createElement('span');
        nameLi.appendChild(iconSpan);
        if (folderObj.children[key].children){
            iconSpan.className = 'glyphicon glyphicon-folder-close';
            nameLi.appendChild(document.createTextNode(folderObj.children[key].name));
            nameLi.addEventListener('dblclick', function(){
                me.goToFolder(folderObj.children[key]);
            });
            dateLi.textContent = '<DIR>';
            sizeLi.textContent = '<DIR>';
        } else {
            let path = [];
            this.takePath(folderObj.children[key].parent, path);
            let fileInfo = getInfoAboutFile(folderObj.children[key], path);
            iconSpan.className = fileInfo.ico;
            nameLi.appendChild(document.createTextNode(folderObj.children[key].name));
                
            nameLi.addEventListener('dblclick', function(){
                me.popupContentDiv.appendChild(fileInfo.previewElement);
                me.popupDiv.style.display = 'block';
            });

            dateLi.textContent = fileInfo.birthTimeFormatted;
            sizeLi.textContent = fileInfo.kbSize + ' KB';
        }
        this.nameUl.appendChild(nameLi);
        this.dateUl.appendChild(dateLi);
        this.sizeUl.appendChild(sizeLi);
    }
};

Explorer.prototype.clearUls = function(){
    this.nameUl.textContent = '';
    this.dateUl.textContent = '';
    this.sizeUl.textContent = '';
};

Explorer.prototype.goToFolder = function(){
    let folderObj = arguments[0] || this.generalFolderObj;
    this.currentFolder = folderObj;
    this.currentWindowElements = folderObj;
    this.clearUls();   
    this.searchInput.value = '';
    this.breadcrumbsSpan.textContent = '';
    
    this.initWindowElements(folderObj);
    this.initBreadCrumbs(folderObj);
    this.initFooter(folderObj);
};
