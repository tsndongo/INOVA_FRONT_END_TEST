
//document.getElementById('getData').addEventListener('click', getData);
document.getElementById('getAPI').addEventListener('click', getAPI);
document.getElementById('search').addEventListener('click', function(){displayCountryResults(document.getElementById('searchText').value)});
// document.getElementById('getAPI').addEventListener('click', setToSelected);
// document.getElementById("MyElement").classList.add('higyhlighted');



function getCountryListByName(value){
    var query = 'https://restcountries.eu/rest/v2/name/' + value;
    return fetch(query)
        .then((res) => { return res.json() })
    .catch(err => console.error(err));
}

function getCountryByCode(code){
    var query = 'https://restcountries.eu/rest/v2/alpha/' + code;
    return fetch(query)
        .then((res) => { return res.json() })
    .catch(err => console.error(err));
}

function displayCountryResults(value){
    getCountryListByName(value)
    .then(data => {
        let result = ``;
        let resultDetails = 'Details';
        data.forEach((country) => {            
            const { alpha3Code, name, flag, nativeName, capital, population, languages, timezones, currencies, borders} = country
            console.log("languages: ", languages);
            result +=
                `<button type="button" class="list-group-item list-group-item-action">
                    ${alpha3Code}
                    <h4> ${name} <h4>
                 </button>`;
                //   resultDetails +=
                // `<div style="border: 1px solid black; padding: 20px;">
                //     <p> <img style="textAlign: center; width: 30%;" src="${flag}" </p>
                //     <p> Native Name : ${nativeName}</p>
                //     <p> Capital : ${capital} </p>
                //     <p> Population: ${population}</p>
                //     <p> Languages: ${getObjectsFromList(languages)}</p>
                //     <p> Time zones: ${formatList(timezones)}</p>
                //     <p> Currencies: ${getObjectsFromList(currencies)}</p>
                //     <p> Border countries: ${formatList(borders)}</p>
                //  </div>`;
                    document.getElementById('result').innerHTML = result;
                    // document.getElementById('resultDetails').innerHTML = resultDetails;
        });   

        var header = document.getElementById("result");
        var btns = header.getElementsByClassName("list-group-item");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            if (current.length > 0) { 
                current[0].className = current[0].className.replace(" active", "");
            }
            this.className += " active";
            });
        }
    });
}

// var container = document.querySelector("#test");
// var matches = container.querySelectorAll("div.highlighted > div");

function displayCountryNameByCode(){}

var header = document.getElementById("result");
var btns = header.getElementsByClassName("list-group-item");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

function getObjectsFromList(list){
    if(list.length > 0){
        let result = '<ul>';
        list.forEach((item) => {
            result += "<li>" + item.name + "</li>";
        });
        return result + "</ul>";
    } else {
        return "None";
    }
}

function formatList(list){
    if(list.length > 0){
        let result = '<ul>';
        list.forEach((item) => {
            result += "<li>" + item + "</li>";
        });
        return result + "</ul>";
    } else {
        return "None";
    }
}

function getAPI(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then((res) => { return res.json() })
    .then((data) => {
        let result = `<h2> Results details </h2>`;
        let resultDetails = 'Details';
        data.forEach((country) => {
            const { alpha3Code, name, capital, altSpellings, nativeName, numericCode, flag } = country
            // const { nativeName, numericCode, flag} = countryDetails
            result +=
                `<div style="border: 1px solid black">
                 <h5> User ID: ${alpha3Code} </h5>
                     <ul class="w3-ul">
                         <li> Country Name : ${name}</li>
                         <li> Capital : ${capital} </li>
                         <li> Spellings : ${altSpellings} </li>
                     </ul>
                  </div>`;
            resultDetails +=
                `<div style="border: 1px solid black">
                <h5> User ID: ${name} </h5>
                    <ul class="w3-ul">
                        <li> Native Name : ${nativeName}</li>
                        <li> Numeric code : ${numericCode} </li>
                        <li> Flag : <img style="width: 40px;" src="${flag}" </li>
                    </ul>
                 </div>`;
            document.getElementById('result').innerHTML = result;
            document.getElementById('resultDetails').innerHTML = resultDetails;
                });
            })
    .catch(err => console.error(err));
}
