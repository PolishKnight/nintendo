setInterval(() => {

    const date = new Date();
    const year = date.getFullYear();
    const month = Poprawianie(date.getMonth() + 1);
    const day = Poprawianie(date.getDate());
    const hours = Poprawianie(date.getHours());
    const minutes = Poprawianie(date.getMinutes());
    const seconds = Poprawianie(date.getSeconds());

    function Poprawianie(a){

        if(a < 10){
            a = '0' + a;
        }

        return a;
    }

    const fullDate = '<h1>' + hours + ':' + minutes + '</h1>' + day + '.' + month + '.' + year;

    home.innerHTML = fullDate;

}, 1000);
