const startBtn = document.getElementById('start-btn');
const resultDiv = document.getElementById('result');

const recognition = new webkitSpeechRecognition();
recognition.lang = 'en';

startBtn.addEventListener('click', () => {
    recognition.start();

    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        resultDiv.textContent = `Voice results: ${speechResult}`;
    };

    recognition.onerror = (event) => {
        resultDiv.textContent = 'Error: ' + event.error;
    };
});
