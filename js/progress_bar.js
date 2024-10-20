// 获取 inner_progress_bar、person 和所有 circles
const innerProgressBar = document.getElementById('inner-progress-bar');
const person = document.getElementById('person');
const circles = document.querySelectorAll('.circle'); // 获取所有 circle

// 动画持续时间（以毫秒为单位）
const duration = 100000; // 10mins完成

// 起始时间和状态
let start = null;
let isPaused = false; // 用于标记动画是否暂停
let currentCircleIndex = 1; // 当前到达的 circle 索引
let previousProgress = 0; // 保存上次动画暂停时的进度，初始为3.5%



// 获取进度条容器的宽度
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBarWidth = progressBarContainer.offsetWidth; // 获取整个进度条容器的宽度

// 设置初始宽度为3.5%
innerProgressBar.style.width = '3.5%';

// 计算每个circle的实际位置（相对于 progress_bar_container 的偏移量）
const circlePositions = Array.from(circles).map(circle => {
    const circleOffset = circle.offsetLeft-10; // 获取 circle 相对于父容器左侧的偏移量
    return circleOffset / (progressBarWidth); // 将该位置转化为相对宽度的百分比
});

// 更新动画的函数
function animateProgressBarAndPerson(timestamp) {
    // 如果动画暂停，则不继续
    if (isPaused) return;

    // 初始化起始时间
    if (!start) start = timestamp;

    // 计算已过的时间
    const elapsed = timestamp - start;

    // 计算当前的进度，确保从上次暂停点继续，最终达到96.5%
    const progress = Math.min(elapsed / duration, 1); // 计算动画的进度
    const adjustedProgress = previousProgress + (0.93 * progress); // 在 previousProgress 基础上继续，增长到96.5%

    // 更新 inner_progress_bar 的宽度
    innerProgressBar.style.width = (0.035 + adjustedProgress) * 100 + '%'; // 从previousProgress继续
    
    // 更新 person 的位置
    let newPosition = (0.035 + adjustedProgress) * progressBarWidth - 28; // 修正 28px 来对齐 person 和进度条

    // 使用精确的终点位置来限制 person 的位置
    const maxPosition = 1040; // 终点的精确位置

    // 如果 newPosition 超过终点，强制将 person 停止在终点
    if (newPosition > maxPosition) {
        newPosition = maxPosition; // 保证 person 停止在终点
    }

    // 动态更新 person 的位置
    person.style.transform = `translateX(${newPosition}px)`;

    // 检查是否到达每个 circle，并暂停动画
    if (currentCircleIndex < circles.length && adjustedProgress >= circlePositions[currentCircleIndex]) {
        // 修改 circle 和 inner-circle 的样式
        circles[currentCircleIndex].style.border = '0.1rem solid black';
        circles[currentCircleIndex].querySelector('.inner-circle').style.backgroundColor = '#A3D65C'; // 绿色
        circles[currentCircleIndex].querySelector('.inner-circle').style.border = '0.1rem solid black'; // 黑色外边框

        // 暂停动画，等待用户确认
        isPaused = true;

        // 弹出确认框
        setTimeout(() => {
            const userConfirmed = confirm(`Milestone ${currentCircleIndex + 1}: Have you completed this milestone?`);

            // 如果用户确认，继续动画
            if (userConfirmed) {
                isPaused = false; // 继续动画
                currentCircleIndex++; // 进入下一个 circle
                previousProgress = adjustedProgress; // 保存当前进度
                start = null; // 重置时间，让动画从当前进度继续
                requestAnimationFrame(animateProgressBarAndPerson); // 继续动画
            }
        }, 100);
    } else if (adjustedProgress >= 0.965) {
        // 如果进度条到达终点，停止 person 的移动
        person.style.transform = `translateX(${newPosition}px)`; // person 移动到终点
        return; // 停止动画
    } else {
        // 如果进度尚未完成，则继续下一帧
        if (progress < 1) {
            requestAnimationFrame(animateProgressBarAndPerson);
        }
    }
}

// 启动动画
requestAnimationFrame(animateProgressBarAndPerson);
