let total = 0;

function get_element_li (name, image_url, weight) {
  return `<li class="added-pokemon">
            <div class ="title"> name: </div> 
            <div> ${name} </div>
            <img src=${image_url} >
            <div class = "title"> weight: </div>
            <div> ${weight} </div>
            <button class="remove-pokemon" onclick="remove_pokemon.call(this)" >remove</button>
            </li>`
}

function add_item_to_list_with_template () {
  document.getElementById("notFound").innerHTML = null;
  removeErrorEl(document.getElementById("pokemon-name"));
  let pokemon_name = document.getElementById("pokemon-name").value;
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`).then(response => {
  const weight = response.data.weight;
  const img_url = response.data.sprites.front_default;
  let new_entry = get_element_li(pokemon_name, img_url, weight);
  document.getElementById("pokemons").innerHTML += new_entry;
  total += weight;
  showTotal(total);
  
})
.catch(response => {
  document.getElementById("notFound").innerHTML = `Pokemon not found`;
  inputError("pokemon-name");
})  
}

function removeErrorEl (element){
  if (element.classList.contains("error")){
    element.classList.remove("error");
  }
}

function inputError (id) {
  var element = document.getElementById(id);
  element.classList.add("error");
}

function showTotal (total){
  let prompt = `total weight: ${total}`;
  document.getElementById("total").innerHTML = prompt;
}

function remove_pokemon () {
  let list_entry = this.parentNode.innerText;
  let weight_string = list_entry.match(/\d+/);
  let weight = parseInt(weight_string);
  this.parentNode.remove();
  total -= weight;
  showTotal(total);
}

