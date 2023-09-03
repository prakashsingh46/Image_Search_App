const accessKey="i_4iwRYBApmBeN__q84w_5kFkpJDEdYkRXOdf-bWeBc";

const fE1= document.querySelector("form")
const inpE2= document.getElementById("search-input")
const searchResult=document.querySelector(".container")
const showMore=document.querySelector(".showmore")

let inpdata= ""
let page = 1;

async function searchImages(){
    inpdata=inpE2.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inpdata}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()

    const results=data.results;

    if(page===1){
        searchResult.innerHTML = ""
    }

    results.map((result) =>{
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("image")
        const pic= document.createElement('img')
        pic.src = result.urls.small
        pic.alt = result.alt_description
        const imageLink=document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(pic);
        imageWrapper.appendChild(imageLink);
        searchResult.appendChild(imageWrapper);
    });
    page++
    if(page > 1){
        showMore.style.display = "block"
    }
}

fE1.addEventListener("submit", (event) =>{
    event.preventDefault()
    page = 1;
    searchImages()
})

showMore.addEventListener("click", () =>{
    searchImages()
})
