function onTextChange() {
    var ele = document.getElementById('ide')
    var code = ele.value
    console.log(code, "  :textChange")
    ele.onkeydown = e => {
        console.log("ele: ",e)
        if(e.code === "Tab"){
            const target = e.currentTarget
            const { selectionStart, value } = target;
            target.value = value.slice(0,selectionStart) + '\t' + value.slice(selectionStart);
            return false;
        }
    }
    // console.log("code", code)
}
