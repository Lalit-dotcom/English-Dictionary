//dictionaryapi used


const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.title) {
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
      meaningContainerEl.style.display = "block";
    } else {
      titleEl.innerText = data[0].word;
      meaningEl.innerText = data[0].meanings[0].definitions[0].definition;
      audioEl.style.display = "inline-flex";
      audioEl.src = data[0].phonetics[0].audio;
    }
    meaningContainerEl.style.display = "block";
    infoTextEl.style.display = "none";
  } catch (error) {
    console.log(error);
    infoTextEl.innerText = "An Error happened, try again later";
  }
}

inputEl.addEventListener("keyup", (event) => {
  if (event.target.value && event.key === "Enter") {
    fetchAPI(event.target.value);
  }
});
