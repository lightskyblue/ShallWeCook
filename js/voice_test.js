document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resultDiv = document.getElementById('result');

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en';
    recognition.continuous = true;
    recognition.interimResults = true;

    let totalTranscript = '';  // 存储所有转录的文本
    let currentTranscript = ''; // 存储当前会话的转录文本
    let hasInput = false;  // 标志是否有输入

    startBtn.addEventListener('click', () => {
        recognition.start();
        resultDiv.textContent = "Listening...";  // 提示开始监听
        currentTranscript = '';  // 每次开始新录音时清空当前转录内容
        hasInput = false;  // 重置标志
    });

    recognition.onresult = (event) => {
        const last = event.results[event.results.length - 1];  // 只处理最后一次结果
        if (last.isFinal) {
            currentTranscript += last[0].transcript;  // 添加新的结果
            resultDiv.innerHTML = `Voice results: ${totalTranscript}<br>${currentTranscript}`;  // 显示累计结果
            hasInput = true;  // 标志有输入
        }
    };

    recognition.onerror = (event) => {
        resultDiv.textContent = 'Error: ' + event.error;
    };

    stopBtn.addEventListener('click', () => {
        recognition.stop();
        if (hasInput) {
            totalTranscript += currentTranscript + '<br>';  // 将当前会话的转录结果加入总转录文本，并加上 <br> 标签换行
            resultDiv.innerHTML = `Final results: <br>${totalTranscript}`;  // 最终结果也按行显示
        } else {
            resultDiv.textContent = "No input detected. Please click 'Start' and try again.";
        }
    });
});
