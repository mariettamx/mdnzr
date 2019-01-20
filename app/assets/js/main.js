//Watch form 
document.addEventListener('blur', function (event) {
    var elem = event.target;

    if ((elem.type === 'text' || elem.type === 'tel' || elem.type === 'email' ) && !elem.checkValidity()) {
        elem.classList.add('error');
    } else {
        if (elem.classList.contains('error')) {
            elem.classList.remove('error');
        }
    }
}, true);

//Add phone mask
var phoneMask = new IMask(
    document.getElementById('phone'), {
        mask: '(000) 000-0000'
    });

//Send data
var send = function (event) {

    event.preventDefault();
    
    var form = document.querySelector('.subscribe-form');
    var formElem = document.querySelector('.subscribe-form').elements;
    var obj = new Object();
    var request = new XMLHttpRequest();
    var url = 'https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar';
    var btn = document.querySelector('.subscribe-form__button');


    for (var i = 0; i < formElem.length; i++) {
        
        var elem = form[i];
        
        if (elem.type !== 'submit') {
            obj[elem.name] = elem.value
        }
    }

    var data = JSON.stringify(obj);

    //success
    request.addEventListener('load', function (event) {
        btn.innerHTML = 'Submitted';
        btn.disabled = true;
    });

    //error
    request.addEventListener('error', function (event) {
        alert('An error ocurred')
    });

    //post
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(data);

}