const getAllMeal = async () => {
    let allMeals = [];
    for (let i = 65; i <= 90; i++) {
        const responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${String.fromCharCode(i)}`);
        const data = await responce.json();
        if (data.meals) {
            allMeals = [...allMeals, ...data.meals];
        }
    }
    return allMeals;
}

const appendData = async() => {
    const cards = document.querySelector(".cards");

    const data = await getAllMeal();

    console.log(data);
    data.forEach((element,index) => {

        const elem_right = document.createElement("div");
        const elem_left = document.createElement("div");
        const card = document.createElement("div");
        const image = document.createElement("img");
        const h2 = document.createElement("h2");
        const a = document.createElement("a");

        index % 2 == 0 ? card.classList.add("card-left") : card.classList.add("card-right");
        elem_left.classList.add("elem-left");
        elem_right.classList.add("elem-right");
        h2.classList.add("titles");
        a.classList.add("card-left");

        image.className = "live_img";
        image.src = element.strMealThumb;
        h2.innerHTML = element.strMeal;
        a.href = element.strSource;


        cards.appendChild(card);
        card.appendChild(elem_left);
        card.appendChild(elem_right);
        elem_left.appendChild(image);
        elem_right.appendChild(h2);
        elem_right.appendChild(a);

    });
}

appendData();

const getMealsByLetter = async (letter) => {
    const responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const info = await responce.json();
    // console.log(info);
    // console.log(String.fromCharCode(90));
}

getMealsByLetter("c");
getAllMeal();