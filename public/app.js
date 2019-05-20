/**
 * Created May 19th by Takou Syntiche N'DONGO on
 * Class containing all of the JavaScript code for the application
 */

//Identifies the form for submittion
var form = document.querySelector('#searchForm');
 
//Submit listener for search bar
form.addEventListener('submit', function (e) {
    e.preventDefault();
    resetErrorMessage();
    var searchText = document.getElementById('searchText').value;
    displayCountryResults(searchText);
}, false);



/**********************************************************************************************************
 * API functions - methods that make REST calls using fetch()
 **********************************************************************************************************/

 //Fetches a list of country that matches (fully or partially) the country name to the user input
function getCountryListByName(value){
    //Queries all countries if no value is put in search bar
    var query = '';
    if(value){
        query = 'https://restcountries.eu/rest/v2/name/' + value;
    } else {
        query = 'https://restcountries.eu/rest/v2/all';
    }    

    //Fetches data
    return fetch(query)
        .then((res) => { 
            if(res.ok){
                return res.json();
            } else if (res.status === '404'){
                setErrorMessage('No matches were found.');
            } else {
                console.log(res);
                throw new Error('Something went wrong ' + res.status);
            }
        })
        .catch(err => {console.error(err);});
}


 //Fetches a list of country that matches (fully or partially) the country code to the user input
function getCountryByCode(code){
    var query = 'https://restcountries.eu/rest/v2/alpha/' + code;
    return fetch(query)
        .then((res) => { 
            if(res.ok){
                return res.json();
            } else if (res.status === '404'){
                setErrorMessage('No matches were found.');
            } else {
                console.log(res);
                throw new Error('Something went wrong ' + res.status);
            }
        })
        .catch(err => {
        if(err.status == '404'){
            noMatchFoundError = "<div class='alert alert-danger'>No matches were found.<div>";
            document.getElementById("navbar").append()
        }
        console.error(err);
    });
}

/**********************************************************************************************************
 * UI functions - methods that handle display and modification to the HTML
 **********************************************************************************************************/

//Functions that displays the country list obtained from the fetch function
function displayCountryResults(value){
    getCountryListByName(value)
    .then(data => {
        let result = ``;
        data.forEach((country) => {    
            const { alpha3Code, name} = country        
            result += `<div type="button" id="${alpha3Code}" class="list-group-item list-group-item-action">
                            ${alpha3Code}
                            <h4 class="point-none">${name} </h4>
                            <div class="small detailsSm"></div>
                        </div>`;
            document.getElementById('result').innerHTML = result;
            
        }); 

        var btns = document.getElementById("result").getElementsByClassName("list-group-item");        
        var details = document.getElementsByClassName("detailsSm");

        //Set the default value selected
        btns[0].className += " active";
        details[0].className += " selected";
        displayCountryDetails(btns[0].id);
        //Adds a click listener to the list items that identifies the button selected and display the appropriate detail view by manipulating CSS classes
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function(index) {
                var current = document.getElementsByClassName("active");    
                var currentDetail = document.getElementsByClassName("selected");
                current[0].className = current[0].className.replace(" active", "");           
                this.className += " active";   
                currentDetail[0].className = currentDetail[0].className.replace(" selected", "");  
                for(var j = 0; j < details.length; j++){
                    if(details[j].parentElement.classList.contains("active")){
                        details[j].className += " selected";
                        details[j].focus();
                        break;
                    }
                }                
                displayCountryDetails(this.id);
            });
        }     
    });
    return null;
}

//Functions that displays the card containing the details of the selected country
function displayCountryDetails(value){
    getCountryByCode(value)
    .then(country => {
        let result = ``;
            result +=
                `<div class="card">            
                    <p style="text-align:center" class="card-header"> <img class="flag" src="${country.flag}" </p>
                    <div class="card-body">
                        <p> <strong>Native name : </strong>${country.nativeName}</p>
                        <p> <strong>Capital : </strong>${country.capital} </p>
                        <p> <strong>Population: </strong>${country.population}</p>
                        <p> <strong>Languages: </strong>${getObjectsFromList(country.languages)}</p>
                        <p> <strong>Time zones: </strong>${formatList(country.timezones)}</p>
                        <p> <strong>Currencies: </strong>${getObjectsFromList(country.currencies)}</p>
                        <p> <strong>Border countries: </strong>${formatList(country.borders)}</p>
                    </div>
                </div>`;
        //Set the details view with the HTML is the country is selected
        var smallDetails = document.getElementsByClassName('detailsSm selected');
        for(var x = 0; x < smallDetails.length; x++){
            var detailView = smallDetails[x];
            detailView.innerHTML = result;
        };
        //Adds the HTML to the element
        document.getElementById('resultDetails').innerHTML = result;   
                
    });
}


/***********************************************************************************************************
 * Minor inner functions reused in various par of the code
 ***********************************************************************************************************/

//Displays an error message containing the string sent as param
function setErrorMessage(msg){
    var errorDiv = document.getElementById('errorMsg');
    errorDiv.classList.remove("hidden");
    errorDiv.innerHTML = msg;
}

//Reset error message - no longer visible
function resetErrorMessage(){
    var errorDiv = document.getElementById('errorMsg');
    errorDiv.classList.add("hidden");
}

//Returns a HTML list from a list of JSON objects with 'name' as the key
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

//Returns a HTML list from a JSON list
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




