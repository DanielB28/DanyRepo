$(document).ready(function () {
    if (document.getElementById("webappDiv") != null) {//hide button if webapp is opened
        document.getElementById("btnOpenApp").style.display = "none";
        document.getElementById("btnAddItem").disabled = true;
    }
    //beperking op modal text input max 25 chars
    document.getElementById("textFieldItemDescription").onkeyup = function (evt) {
        var val = evt.target.value;
        if (val.length > 25) {
            evt.target.value = val.substr(0, val.length - 1);
        }
    }

    function SetFilter(value) {
        
    }
})