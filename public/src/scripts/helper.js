function getResponse(uri){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri, false);
    xhr.send();
    if (xhr.status != 200) {
        return null;
    } else {
        return xhr.responseText;
    }
}

function getInfoAboutFile(input, path){
    let date = new Date(Date.parse(input.birthTime));   
    let birthTimeFormatted = date.getDate() + '.' + date.getMonth()+1 + '.' + date.getFullYear() + ' ' + 
        date.getHours() + ':' + date.getMinutes(); 
    let kbSize = Math.floor(input.size / 1000); 
    let ico; 
    let type;
    let previewElement;  
    let format = input.name.match(/\.\w*$/);
    let name = input.name.match(/(.*)\.\w*$/)[1];
    let pathtoFile = path[path.length - 1].name;
    
    for (let i = path.length - 2; i >= 0 ; i--)
    {
        pathtoFile += '/' + path[i].name ;
    }
    pathtoFile += '/'+ input.name;
    
    switch(format[0]){
    case '.avi':
    case '.mp4':
    case '.asf':
    case '.flv':
    case '.wmv':
    case '.vob':
    case '.webm':
    case '.3gpp':
        ico = 'glyphicon glyphicon-film';
        type = 'Video';
        previewElement = document.createElement('video');
        previewElement.src = pathtoFile;
        previewElement.controls = 'true';
        break;
    case '.mp3':
    case '.wav':
    case '.aac':
    case '.flac':
    case '.wma':
    case '.mid':
        ico = 'glyphicon glyphicon-music';
        type = 'Audio';
        previewElement = document.createElement('audio');
        previewElement.controls = 'true';
        previewElement.src = pathtoFile;
        break;
    case '.png':
    case '.gif':
    case '.jpg':
    case '.bmp':
    case '.ico':
        ico = 'glyphicon glyphicon-picture';
        type = 'Picture';
        previewElement = document.createElement('img');
        previewElement.src = pathtoFile;
        break;
    default:
        switch(format[0]){
        case '.txt':
        case '.doc':
        case '.docx':
        case '.pdf':
            ico = 'glyphicon glyphicon-list-alt';
            type = 'Text Document';
            break;
        default:
            ico = 'glyphicon glyphicon-file';
            type = 'Unknown';
            break;
        }
        previewElement = document.createElement('p');
        previewElement.innerHTML = 'File name: ' + name + '<br>File type: ' + type + ' (' + 
            format + ')<br>Size: ' + kbSize + ' KB<br>Birth time: ' + birthTimeFormatted; 
    }

    return {ico,birthTimeFormatted, kbSize, previewElement};
}