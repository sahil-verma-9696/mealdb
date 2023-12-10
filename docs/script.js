const a = document.querySelector('button');

a.addEventListener("click", (event) => {
    // event.preventDefault();

})

const dataLoader = async () => {
    const responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=beef`);
    const data = await responce.json();
    console.log(data);
}

dataLoader();