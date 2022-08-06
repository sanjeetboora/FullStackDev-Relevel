//Write a dummy program that can download a file, then compress it and then upload it
function download(url, callback){
    //somehow it will download the file using the given url
    console.log("Started downloading file from ", url);
    setTimeout(() => {
        console.log("File downloaded successfully");
        let downloadFilePath = "./image.jpg";
        callback(downloadFilePath);
        callback(downloadFilePath);
    }, 3000);
}

function compress(filePath, callback){
    //somehow it will compress the file present on given file path
    console.log("Started compressing the file at ", filePath);
    setTimeout(() => {
        console.log("File compressed successfully");
        let compressedFilePath='./imageCompressed.jpg';
        callback(compressedFilePath);
    }, 4000);
}

function upload(url, filePath){
    //somehow it will upload the file present on given filepath at the given url
    console.log("Started uploading the file ",filePath, "on", url);
    setTimeout(() => {
        console.log("File uploaded successfully");
    }, 3000);
}

download("https://www.download.com/image.jpg", function downloadCallback(filePath){
    compress(filePath, function compressCallback(compressedFile){
        upload("https://www.upload.com", compressedFile);
    })
});



// download("https://www.download.com/image.jpg", function downloadCallback(file){
//     upload("https://www.upload.com/", file);
// });