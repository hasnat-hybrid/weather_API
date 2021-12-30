const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + encodeURIComponent(location)).then((result) => {
    
    result.json().then( (data) => {
        
        if (data.error) {
            messageOne.textContent = 'Error: ' + data.error;
        } else {
            messageOne.textContent = 'Location: ' + data.location;
            messageTwo.textContent = 'Forecast: ' + data.forecast;
        }
    })
})
})