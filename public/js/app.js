var form = document.querySelector('#searchForm');
 
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var searchText = document.getElementById('searchText').value;
    displayCountryResults(searchText);
}, false);


 
function getCountryListByName(value){
    if(value){
        var query = 'https://restcountries.eu/rest/v2/name/' + value;
    } else {
        var query = 'https://restcountries.eu/rest/v2/all';
    }    
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
        data.forEach((country, i) => {            
            const { alpha3Code, name, flag, nativeName, capital, population, languages, timezones, currencies, borders} = country
            result +=
                `
                <div type="button" id="${alpha3Code}" class="list-group-item list-group-item-action">
                    ${alpha3Code}
                    <h4 class="point-none">${name} </h4>
                    <div class="small detailsSm"></div>
                 </div>
                 
                 `;
            document.getElementById('result').innerHTML = result;
            
        });   
        var header = document.getElementById("result");
        var btns = header.getElementsByClassName("list-group-item");        
        var details = document.getElementsByClassName("detailsSm");
        //default value
        btns[0].className += " active";
        details[0].className += " selected";
        displayCountryDetails(btns[0].id);
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function(index) {
                var current = document.getElementsByClassName("active");    
                current[0].className = current[0].className.replace(" active", "");           
                this.className += " active";          
                
                var details = document.getElementsByClassName("detailsSm");       
                var currentDetail = document.getElementsByClassName("selected");
                currentDetail[0].className = currentDetail[0].className.replace(" selected", "");  
                for(var j = 0; j < details.length; j++){
                    if(details[j].parentElement.classList.contains("active")){
                        details[j].className += " selected";
                        break;
                    }
                }
                displayCountryDetails(this.id);
            });
        }     

        var details = document.getElementsByClassName("detailsSm");
       

           
    });
    return null;
}

function setDetail(index){        
    var details = document.getElementsByClassName("detailsSm");       
    var currentDetail = document.getElementsByClassName("selected");
    currentDetail[0].className = currentDetail[0].className.replace(" selected", "");           
    var sel = document.setElementByClassName("active");
    var obj = sel.getElementsByClassName("selected");
    obj.className += " selected";
}

function displayCountryDetails(value){
    getCountryByCode(value)
    .then(country => {
        let result = ``;
        result +=
            `<div class="card">
                <div class="card-body">
                    <p style="text-align:center"> <img class="flag" src="${country.flag}" </p>
                    <p> <strong>Native name : </strong>${country.nativeName}</p>
                    <p> <strong>Capital : </strong>${country.capital} </p>
                    <p> <strong>Population: </strong>${country.population}</p>
                    <p> <strong>Languages: </strong>${getObjectsFromList(country.languages)}</p>
                    <p> <strong>Time zones: </strong>${formatList(country.timezones)}</p>
                    <p> <strong>Currencies: </strong>${getObjectsFromList(country.currencies)}</p>
                    <p> <strong>Border countries: </strong>${formatList(country.borders)}</p>
                </div>
            </div>`;

            var smallDetails = document.getElementsByClassName('detailsSm selected');
            for(var x = 0; x < smallDetails.length; x++){
                var detailView = smallDetails[x];
                detailView.innerHTML = result;
            };
        document.getElementById('resultDetails').innerHTML = result;    
                
    });
}


document.getElementById('result').addEventListener('click', function(event){
    var selected = event.currentTarget;
    if(selected.id == 'result'){
        displayCountryDetails(document.getElementsByClassName('active')[0].id); 
    }
});

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


