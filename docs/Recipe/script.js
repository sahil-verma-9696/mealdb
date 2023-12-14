const horizontalScroll = (event) => {
    const container = document.querySelector('.scroll-container');
    container.scrollLeft += event.deltaY;
    event.preventDefault();
}

const creatingIngrediantDOM = (ing_url, ing_name, ing_qnt) => {

    const ingrediants = document.querySelector('.ingrediants');

    const ingrediant = document.createElement("div");
    ingrediant.className = "ingrediant";

    const ingrediant_img = document.createElement("img");
    ingrediant_img.className = "ingrediant_img";
    ingrediant_img.alt = "ingredent img not found";
    console.log(ing_url);
    ingrediant_img.src = `https://www.themealdb.com/images/ingredients/${ing_url}.png`

    const h4 = document.createElement("h4");

    const live_ing_name = document.createElement("span");
    live_ing_name.className = "live_ing_name";
    live_ing_name.innerHTML = ing_name;

    const live_ing_qnt = document.createElement("span");
    live_ing_qnt.className = "live_ing_qnt";
    live_ing_qnt.innerHTML = ing_qnt;

    //forming structure
    ingrediants.appendChild(ingrediant);
    ingrediant.appendChild(ingrediant_img);
    ingrediant.appendChild(h4.appendChild(live_ing_name));
    ingrediant.appendChild(h4.appendChild(live_ing_qnt));
}
const extrectingIngrediants = (data) => {
    let ingredients = [];
    let measures = [];
    let ingredientsUrl = [];

    // Loop through the meals data
    data.meals.forEach(meal => {
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            console.log(ingredient);
            let firstWord = ingredient.replace(/\s/g, '%20');

            // Check if ingredient is not empty and not null
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(ingredient);
                measures.push(measure || ""); // If measure is null or empty, add an empty string
                let ingredientUrl = `www.themealdb.com/images/ingredients/${firstWord}.png`;
                ingredientsUrl.push(firstWord);
            }
        }
    });

    let count = ingredients.length;

    // Displaying the extracted arrays
    return { ingredients, ingredientsUrl, measures, count }
}
const injectingDOM = (meals) => {
    const data = meals.meals[0];

    const mealName = document.querySelector(".live_recipe_name");
    const mealImg = document.querySelector(".live_recipe_img");
    const instruction = document.querySelector(".live_instruction");

    let recipe = data.strInstructions.replace(/\n/g, '<br><br>').replace(/\t/g, '&emsp;&emsp;');

    mealName.innerHTML = data.strMeal;
    mealImg.src = data.strMealThumb;
    instruction.innerHTML = recipe;

    const { ingredients, ingredientsUrl, measures, count } = extrectingIngrediants(meals);

    for(let i = 0; i<count; i++){
        // console.log(ingredientsUrl[i]);
        creatingIngrediantDOM(ingredientsUrl[i],ingredients[i],measures[i]);
    }
}
const getRecipe = async (meal) => {
    console.log(meal);
    const raw = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${52865}`);
    const data = await raw.json();
    console.log(data);
    console.log(data.meals[0])
    injectingDOM(data);
}
const queries = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const q = urlParams.get('q');
    getRecipe(q);
}
queries();