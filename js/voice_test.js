document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn'); // 获取停止按钮
    const resultDiv = document.getElementById('result');

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en';
    recognition.continuous = true;  // 让语音识别持续运行
    recognition.interimResults = true;  // 启用临时结果，用户讲话时可以看到中间结果

    let transcript = '';  // 用来存储最终的语音结果
    let hasInput = false; // 标志变量，用于记录是否有语音输入

    startBtn.addEventListener('click', () => {
        recognition.start();
        resultDiv.textContent = "Listening...";  // 提示开始监听
        transcript = '';  // 每次开始录音时清空之前的结果
        hasInput = false;  // 重置标志
    });

    recognition.onresult = (event) => {
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        resultDiv.textContent = `Voice results: ${transcript}`;
        hasInput = true;  // 记录有语音输入
    };

    recognition.onerror = (event) => {
        resultDiv.textContent = 'Error: ' + event.error;
    };

    // 停止按钮的点击事件
    stopBtn.addEventListener('click', () => {
        recognition.stop();
        if (hasInput) {
            resultDiv.textContent = `Final results: ${transcript}`;
        } else {
            resultDiv.textContent = "No input detected. Please click 'Start' and try again.";
        }
    });
});
