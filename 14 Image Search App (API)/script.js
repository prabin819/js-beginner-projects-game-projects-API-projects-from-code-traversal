const accessKey = 'dfeZzKZQY2QjE2mrzjFv_XkEwEsjgO92ltGkTvnwn14';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container');


//fuction to fetch images using unsplash api
const fetchImages = async(query) =>{
    const url = `https://api.unsplash.com/photos/?query=${query}&per_page=20&page=10&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(query);
    console.log(data);

    data.forEach(element =>{
        const imageElement = document.createElement('div');
        imageElement.innerHTML = `<img src="${element.urls.regular}" />`;

        imagesContainer.appendChild(imageElement);
    });
}


//adding event listener to search form
searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText !== ''){
        fetchImages(inputText);
    }
    else{
        imagesContainer.innerHTML = `<h2>Please enter a search query</h2>`;
    }
});