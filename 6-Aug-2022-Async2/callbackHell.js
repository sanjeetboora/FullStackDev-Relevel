function download(url, callback){
    //somehow it will download the file using the given url
    console.log("Started downloading file from ", url);
    setTimeout(() => {
        console.log("File downloaded successfully");
        let downloadFilePath = "./image.jpg";
        callback();
        callback();
        callback();
    }, 3000);
}

download("https://www.downloadimage.com", function payment(){
    console.log("payment done");
});