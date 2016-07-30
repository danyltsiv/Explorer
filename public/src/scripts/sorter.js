function Sorter(){}  
    
Sorter.prototype.typeSort = function(option, folderObj, recursive){
    this.folderObjectSort(folderObj,function(a){
        if (a.children!=undefined) return -option;
        else return option;
    }, recursive);  
};

Sorter.prototype.bubleSort = function(array, callback) {
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array.length - i - 1; j++) {
            if (callback(array[j],array[j+1]) > 0) {
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
};

Sorter.prototype.folderObjectSort = function(folderObj,callback,recursive){
    this.bubleSort(folderObj.children, callback);

    if (recursive){      
        for(let key in folderObj.children){
            if (folderObj.children[key].children!=undefined){
                this.folderObjectSort(folderObj.children[key],callback,recursive);
            }
        }
    }
};

Sorter.prototype.nameSort = function(option, folderObj, recursive){
    this.folderObjectSort(folderObj, function(a,b){
        if (a.children && !b.children) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return option;
        else return -option;
    }, recursive);     
};
    
Sorter.prototype.dateSort = function(option, folderObj, recursive){
    this.folderObjectSort(folderObj, function(a,b){
        if (a.children || b.children) return -1;
        if (Date.parse(a.birthTime) > Date.parse(b.birthTime)) return option;
        else return -option;
    }, recursive);        
};

Sorter.prototype.sizeSort = function(option, folderObj, recursive){
    this.folderObjectSort(folderObj, function(a,b){
        if (a.children || b.children) return -1;
        if (a.size > b.size) return option;
        else return -option;
    }, recursive);  
};