export function isEmpty(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

export function today() {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    if(dd<10)
    {
        dd=`0${dd}`;
    }

    if(mm<10)
    {
        mm=`0${mm}`;
    }
    return `${yyyy}-${mm}-${dd}`;
}