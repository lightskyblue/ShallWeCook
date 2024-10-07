document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn'); // 获取停止按钮
    const resultDiv = document.getElementById('result');

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en';
    recognition.continuous = true;  // 让语音识别持续运行
    recognition.interimResults = true;  // 启用临时结果，用户讲话时可以看到中间结果

    startBtn.addEventListener('click', () => {
        recognition.start();
        resultDiv.textContent = "Listening...";  // 提示开始监听
    });

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        resultDiv.textContent = `Voice results: ${transcript}`;
    };

    recognition.onerror = (event) => {
        resultDiv.textContent = 'Error: ' + event.error;
    };

    // 停止按钮的点击事件
    stopBtn.addEventListener('click', () => {
        recognition.stop();
        resultDiv.textContent = "Voice input stopped.";
    });
});
