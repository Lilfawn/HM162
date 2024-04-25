const config = {
    giphy: {
        api_key: 'ZWYSphlOoBuTMEkdpltLyP28EMUenM7Y',
        url: 'https://api.giphy.com/v1/gifs',
    }
};


document.getElementById('amount-on-page').addEventListener('change', function(event){
    const selectedValue = event.target.value;
    fetchTrending(selectedValue);
});
function fetchTrending(limit = 10) {
    document.getElementById('box-gallery').innerHTML = '';

    fetch(`${config.giphy.url}/trending?api_key=${config.giphy.api_key}&limit=${limit}`)
        .then((response) => response.json())
        .then((list) => {
            list.data.forEach((item) => {
                createHtmlGalleryItem(item);
            })

        });

}

function fetchSearch(query, limit = 10) {
    document.getElementById('box-gallery').innerHTML = '';

    fetch(`${config.giphy.url}/search?q=${encodeURIComponent(query)}&api_key=${config.giphy.api_key}&limit=${limit}`)
        .then((response) => response.json())
        .then((list) => {
            list.data.forEach((item) => {
                createHtmlGalleryItem(item);
            })

        });

}


function createHtmlGalleryItem(item) {
    let div = document.createElement('div');
    div.id = `gallery-item-${item.id}`;
    div.classList.add('col-auto', 'my-2', 'img-thumbnail');
    div.innerHTML = `<img src="${item.images.fixed_height.url}" alt="${item.title}">`;

    document.getElementById('box-gallery').append(div)
}

window.addEventListener('load', function (event) {
    fetchTrending();

})

document.getElementById('search').addEventListener('blur', function (event) {
    const query = event.target.value;

    fetchSearch(query);
})

document.getElementById('search').addEventListener('keypress', function(event){
    if (event.key === 'Enter') {
        const query = event.target.value;
        const selectedValue = document.getElementById('amount-on-page').value;
        fetchSearch(query, selectedValue);
    }
});

document.getElementById('box-gallery').addEventListener('click', function(event){
    if (event.target.tagName === 'IMG') {
        const giphyUrl = event.target.src.replace('https://media', 'https://');
        window.open(giphyUrl);
    }
});
