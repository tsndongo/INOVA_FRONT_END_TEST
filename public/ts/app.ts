
document.getElementById('search').addEventListener('click', function(){displayCountryResults(document.getElementById('searchText').value)});

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
        data.forEach((country) => {            
            const { alpha3Code, name, flag, nativeName, capital, population, languages, timezones, currencies, borders} = country
            //console.log("languages: ", languages);
            result +=
                `<button type="button" id="${alpha3Code}" class="list-group-item list-group-item-action">
                    ${alpha3Code}
                    <h4 class="point-none">${name} </h4>
                 </button>`;
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
                //displayCountryDetails(current[0].id);  
                this.className += " active";
            });
        }        
    });
}

function displayCountryDetails(value){
    getCountryByCode(value)
    .then(country => {
        let result = ``;
        result +=
            `<div style="border: 1px solid black; padding: 20px;">
                <p> <img style="textAlign: center; width: 30%;" src="${country.flag}" </p>
                <p> Native name : ${country.nativeName}</p>
                <p> Capital : ${country.capital} </p>
                <p> Population: ${country.population}</p>
                <p> Languages: ${getObjectsFromList(country.languages)}</p>
                <p> Time zones: ${formatList(country.timezones)}</p>
                <p> Currencies: ${getObjectsFromList(country.currencies)}</p>
                <p> Border countries: ${formatList(country.borders)}</p>
            </div>`;
        document.getElementById('resultDetails').innerHTML = result; 
        var header = document.getElementById("resultDetails");
        var btns = header.getElementsByClassName("list-group-item");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function() {
                displayCountryDetails(event.srcElement.id); 
            });
        }        
    });
}


document.getElementById('result').addEventListener('click', function(event){
    var selected = event.currentTarget;
    if(selected.id == 'result'){
        displayCountryDetails(document.getElementsByClassName('active')[0].id); 
    }
});


//function displayCountryNameByCode(){}


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


