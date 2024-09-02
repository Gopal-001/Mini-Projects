function onTextChange() {
    var ele = document.getElementById('ide')
    var code = ele.value
    console.log(code, "  :textChange")
    ele.onkeydown = e => {
        console.log("ele: ",e)
        if(e.code === "Tab"){
            ele.setRangeText("\t", ele.selectionStart, ele.selectionStart, 'end')
            return false;
        }
    }
    // console.log("code", code)
}
