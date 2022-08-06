//Write a dummy program that can download a file, then compress it and then upload it
function download(url){
    //somehow it will download the file using the given url
    console.log("Started downloading file from ", url);
    setTimeout(() => {
        console.log("File downloaded successfully");
    }, 3000);
}


function compress(filePath){
    //somehow it will compress the file present on given file path
    console.log("Started compressing the file at ", filePath);
    setTimeout(() => {
        console.log("File compreseed successfully");
    }, 4000);
}

function upload(url, filePath){
    //somehow it will upload the file present on given filepath at the given url
    console.log("Started uploading the file ",filePath, "on", url);
    setTimeout(() => {
        console.log("File uploaded successfully");
    }, 3000);
}


download("https://www.download.com/image.jpg");
compress("./image.jpg");
upload('https://www.uploadFile.com', './image.jpg');

//code would not work as expected