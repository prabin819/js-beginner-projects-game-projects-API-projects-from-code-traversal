const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {

    try {

        resultDiv.innerHTML = 'Fetching data';

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        const data = await response.json();

        console.log(data);

        let definitions = data[0].meanings[0].definitions[0];

        resultDiv.innerHTML = `
    <h2><strong>Word:</strong> ${data[0].word}</h2>
    <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong> ${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
    <p><strong>Example:</strong> ${definitions.example === undefined ? "Not Found" : definitions.example}</p>
    <p><strong>Antomyms</p></strong>
    `;

        if (definitions.antonyms.length === 0) {
            resultDiv.innerHTML += '<span>Not Found</span>';
        }
        else {
            definitions.antonyms.forEach(antonym => {
                resultDiv.innerHTML += `<li>${antonym}</li>`;
            });
        }

        // resultDiv.innerHTML += '<p><strong>Synomyms</p></strong>';

        // if (definitions.synomyms.length === 0) {
        //     resultDiv.innerHTML += '<span>Not Found</span>';
        // }
        // else {
        //     definitions.synomyms.forEach(synomym => {
        //         resultDiv.innerHTML += `<li>${synomym}</li>`;
        //     });
        // }


        //adding reading more btn
        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;

    } catch (error) {
        resultDiv.innerHTML = `<p>Sorry, the word "${word}" could not be found.</p>`;
    }
}