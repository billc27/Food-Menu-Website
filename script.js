let result = document.getElementById("result");
let searchbtn = document.getElementById("searchbtn")
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s="
let userinput = document.getElementById("userinput").value;

searchbtn.addEventListener("click", () => {
    let userinput = document.getElementById("userinput").value;
    if (userinput.length == 0) {
      result.innerHTML = `<p>Input Cannot Be Empty</p>`;
    } else {
        fetch(url + userinput)
            .then((response) => response.json())
            .then((data) => {
                let desiredmeal = data.meals[0];
                console.log(desiredmeal);
                console.log(desiredmeal.strMealThumb);
                console.log(desiredmeal.strMeal);
                console.log(desiredmeal.strArea);
                console.log(desiredmeal.strInstructions);

                let total = 1;
                let ingredients = [];
                for (let i in desiredmeal) {
                    let measurement = "";
                    let ingredient = "";
                    if (i.startsWith("strIngredient") && desiredmeal[i]) {
                        ingredient = desiredmeal[i];
                        measurement = desiredmeal[`strMeasure` + total];
                        ingredients.push(`${measurement} ${ingredient}`);
                        total++;
                    }
                }
                console.log(ingredients);

                result.innerHTML = `<img src=${desiredmeal.strMealThumb}>
                <div class="details">
                    <h1>${desiredmeal.strMeal}</h1>
                    <h2>${desiredmeal.strArea}</h2>
                </div>
                <div id="ingredient-container"></div>
                <div id="recipe">
                    <button id="hiderecipe">x</button>
                    <pre id="instructions">${desiredmeal.strInstructions}</pre>
                </div>
                <button id="showrecipe">View Steps</button>`;

                let ingredientcon = document.getElementById("ingredient-container");
                
                let recipe = document.getElementById("recipe");
                let showRecipe = document.getElementById("showrecipe");
                let hideRecipe = document.getElementById("hiderecipe");
                let parent = document.createElement("ul");
                ingredients.forEach((i) => {
                    let child = document.createElement("li");
                    child.innerText = i;
                    parent.appendChild(child);
                    ingredientcon.appendChild(parent);
                });

                showRecipe.addEventListener("click", () => {
                    recipe.style.display = "block";
                });

                hideRecipe.addEventListener("click", () => {
                    recipe.style.display = "none";
                });
            })
        .catch(() => {
            result.innerHTML = `<p>Cannot find the food! Please input another name!</p>`;
        });
    }
});