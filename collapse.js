function waitUntilLoaded(){
    return new Promise((res, reject) => {
        const intervalId = window.setInterval(() => {
           const fileHeaders = document.getElementsByClassName('file-header-content');
            if(fileHeaders.length > 0){
                res(fileHeaders);
                window.clearInterval(intervalId)
            }
        }, 2000)
    })
 }
 
 function eventFire(el, etype){
     if (el.fireEvent) {
         el.fireEvent('on' + etype);
     } else {
         const evObj = document.createEvent('Events');
         evObj.initEvent(etype, true, false);
         el.dispatchEvent(evObj);
     }
 }
 
 (async function() {
     const fileHeaders = await waitUntilLoaded();
     const fileHeadersArr = [].slice.call(fileHeaders);
     fileHeadersArr.forEach(header => {
         const title = header.childNodes[2].innerText;
         const svgClassList = header.childNodes[0].classList.value;
         const isCollapsed = svgClassList.includes('ic-chevron-right');
         if((title.endsWith('graphql.js') || title.endsWith('.jpg')) && !isCollapsed){
             eventFire(header.childNodes[0], 'click')
         }
     })
 })();
 