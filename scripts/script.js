const hour = document.getElementById('hours');
const minute = document.getElementById('minutes')
const second = document.getElementById('seconds')

const dateday = document.querySelector('#dayDate')
const week = document.querySelector('#week')

let dateHour = new Date()

const relogio = setInterval(function time() {
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let s = dateToday.getSeconds();

    if (hr < 10) hr = '0' + hr;

    if (min < 10) min = '0' + min;

    if (s < 10) s = '0' + s;

    hour.textContent = hr;
    minute.textContent = min;
    second.textContent = s;

})

function getDate() {
    let dayWeek = dateHour.getDay()
    let day = dateHour.getDate()
    let month = dateHour.getMonth() + 1
    let year = dateHour.getFullYear()

    let strDay = new String(day)
    let strMonth = new String(month)

    if (strDay.length == 1) month = '0' + day
    if (strMonth.length == 1) month = '0' + month

    switch (dayWeek) {
        case 0:
            dayWeek = 'DOMINGO'
            break;
        case 1:
            dayWeek = 'SEGUNDA-FEIRA'
            break;
        case 2:
            dayWeek = 'TERÇA-FEIRA'
            break;
        case 3:
            dayWeek = 'QUARTA-FEIRA'
            break;
        case 4:
            dayWeek = 'QUINTA-FEIRA'
            break;
        case 5:
            dayWeek = 'SEXTA-FEIRA'
            break;
        case 6:
            dayWeek = 'Sábado'
            break;
    }

    let datNow = day + '/' + month + '/' + year

    week.textContent = dayWeek
    dateday.textContent = datNow
}

getDate()

function getUserPosition() {
    let url = ''
    navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude
        let long = pos.coords.longitude
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=59c56f3e2424bc509e2bde238fa80598`
        fetchApi(url)
        console.log(url)
    })
}

function fetchApi(url) {
    let city = document.querySelector('.city')
    let temperature = document.querySelector('#temp')
    // let humidity = document.querySelector('#umidad')

    fetch(url)
        .then((data) => {
            return data.json()
        })
        .then((data) => {
            let tempInCelsius = ((5 / 9) * (data.main.temp - 32)).toFixed(1);

            city.textContent = data.name
            temperature.innerHTML = tempInCelsius
            // humidity.innerHTML = data.main.humidity
        })
        .catch((err) => {
            city.innerText = `Impossível acessar o OpenWeather. Verifique a sua conexão.`;
            temperature.innerHTML = `-`;
        })
}

getUserPosition();


