const btnEl = document.getElementById("btn");
const resultsEl = document.getElementById("results");
const citiesEl = document.getElementById("cities");
const titleEl = document.getElementById("title");

let options = {
  method: "GET",
  headers: {
    "X-Api-Key": "bxvTQNmnQS4GjqVNmrgTbA==M5sWrIJN9zzgsXyS",
  },
};
btnEl.addEventListener("click", getData);
async function getData() {
  try {
    resultsEl.innerHTML = "";
    resultsEl.appendChild(titleEl);
    btnEl.disabled = true;
    btnEl.innerText = "Loading...";
    let url = `https://api.api-ninjas.com/v1/airquality?city=${citiesEl.value}`;
    let response = await fetch(url, options);
    let results = await response.json();
    let parameters = Object.keys(results);
    console.log(results);
    console.log(parameters);
    for (let i = 0; i <= parameters.length - 1; i++) {
      if (i != parameters.length - 1) {
        let parameterEl = document.createElement("div");
        parameterEl.classList.add("parameter");
        resultsEl.appendChild(parameterEl);
        let nameEl = document.createElement("p");
        nameEl.innerHTML = parameters[i];
        parameterEl.appendChild(nameEl);
        let concentrationEl = document.createElement("p");
        concentrationEl.innerHTML = results[parameters[i]]["concentration"];
        parameterEl.appendChild(concentrationEl);
        let aqiEl = document.createElement("p");
        aqiEl.innerHTML = results[parameters[i]]["aqi"];
        parameterEl.appendChild(aqiEl);
      } else {
        let parameterEl = document.createElement("div");
        parameterEl.classList.add("parameter");
        resultsEl.appendChild(parameterEl);
        let overallName = document.createElement("p");
        overallName.innerHTML = "Overall AQI";
        parameterEl.appendChild(overallName);
        let overallValue = document.createElement("p");
        overallValue.innerHTML = results[parameters[parameters.length - 1]];
        parameterEl.appendChild(overallValue);
      }
    }
    btnEl.disabled = false;
    btnEl.innerText = "Select";
  } catch {
    resultsEl.innerHTML = "An error happened, try again";
    btnEl.disabled = false;
    btnEl.innerHTML = "Select";
  }
}
