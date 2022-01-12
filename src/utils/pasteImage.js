const {clipboard} = window.require("electron");
export function getClipboardImageURL(){
    let img = clipboard.readImage();
    let dataUrl = img.toDataURL();
    return dataUrl;
}

