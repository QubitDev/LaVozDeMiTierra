

const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get("doc");
const docIdHome = urlParams.get("docHome");

console.log("id:: ",docId);
z