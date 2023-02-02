
const searchBtn = document.getElementById('search-btn');
const mealList = document.querySelector('.meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
//event listners

searchBtn.addEventListener("click" , getMealList);
mealList.addEventListener("click" , getRecipeDetail);
recipeCloseBtn.addEventListener("click" , ()=> {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})

function getMealList(){
    let searchInputText = document.getElementById('search-input').value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response =>{
        return response.json();
    }).then(data =>{
        let html = '';

        if(data.meals){
            data.meals.forEach(meal => {
                html +=`
                <div class="meal-item" data-id = "${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="" width="500px" >
                        </div>
                        <div class="meal-name">
                            <h2>${meal.strMeal}</h2>
                        </div>
                        <a href="#" class= "recipe-btn">Get Recipe</a>
                    </div>
                ` 
            });
            mealList.classList.remove('notFound');
        }else{
            html += "Sorry, we didn't find any meal";
            mealList.classList.add('notFound')
        }

    mealList.innerHTML = html;
    })
}


function getRecipeDetail(e){
    e.preventDefault();
   
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response =>{
            return response.json();
        })
        .then(data => mealRecipeModel(data.meals));
    }
}

function mealRecipeModel(meal){
    meal = meal[0];

    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
    </div>
    <div class="recipe-instruct">
        <h3>Instruction</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="fries" width='500px'>
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}