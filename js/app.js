const loadPhones = async(searchText, dataLimit) =>{
    const url =  `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);      
}

const displayPhones = (phones, dataLimit) =>{
    // console.log(phones);
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    // display 10phone only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
  
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none')
    }
  


    // display no phones found
    const noPhone = document.getElementById('no-found');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');

    }
    else{
        noPhone.classList.add('d-none');
    }

    // display all phones

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero sed voluptates quos quam nihil facilis qui corporis magnam reprehenderit architecto!</p>
                          <button onclick = "loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</button>
                        </div>
                      </div>
        `;
        phonesContainer.appendChild(phoneDiv);
        
    })
 // stop loader
 toggleSpinner(false)

}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText , dataLimit);
}

// handle seach button click
 document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    // toggleSpinner(true);
    // const searchField = document.getElementById('search-field');
    // const searchText = searchField.value;
    // loadPhones(searchText);
    processSearch(10);
})


// search input field eventhandler

document.getElementById('search-field').addEventListener('keypress', function (e){
    if (e.key === 'Enter') {
        processSearch(10);
    }
});


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')

    }
    else{
        loaderSection.classList.add('d-none');
    }
}


// not the best way

document.getElementById('btn-show-all').addEventListener('click', function(){
    // toggleSpinner(true);
    // const searchField = document.getElementById('search-field');
    // const searchText = searchField.value;
    // loadPhones(searchText);
    processSearch();

})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}

loadPhones("");

