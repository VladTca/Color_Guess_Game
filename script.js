document.addEventListener('DOMContentLoaded', function() {

    const rgbColorDisplay = document.getElementById('rgb-color');
    const colorBlocks = document.querySelectorAll('.color-block');
    const restartButton = document.getElementById('restart');
    const statusDisplay = document.getElementById('status');

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomColor() {
        const red = getRandomNumber(0, 255);
        const green = getRandomNumber(0, 255);
        const blue = getRandomNumber(0, 255);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    function updateRGBColor() {
        const correctColor = getRandomColor();
        rgbColorDisplay.textContent = correctColor;
        rgbColorDisplay.style.backgroundColor = correctColor;
        return correctColor;
    }

    function updateColorBlocks(correctColor) {
        for (let i = 0; i < colorBlocks.length; i++) {
            const randomColor = getRandomColor();
            colorBlocks[i].style.backgroundColor = randomColor;
            colorBlocks[i].dataset.color = randomColor; // Store the color in data attribute
        }

        const correctIndex = getRandomNumber(0, colorBlocks.length - 1);
        colorBlocks[correctIndex].style.backgroundColor = correctColor;
        colorBlocks[correctIndex].dataset.correct = true; // Mark the correct block
    }

    function handleColorBlockClick(event) {
        const clickedBlock = event.target;
        const correctColor = rgbColorDisplay.textContent;

        if (clickedBlock.dataset.correct) {
            statusDisplay.textContent = "Correct!";
            colorBlocks.forEach(block => block.style.backgroundColor = correctColor);
        } else {
            statusDisplay.textContent = "Try Again!";
            clickedBlock.style.display = "none";
        }
    }

    function restartGame() {
        statusDisplay.textContent = "Start Guessing!";
        colorBlocks.forEach(block => {
            block.style.display = "inline-block";
            block.style.backgroundColor = getRandomColor();
            delete block.dataset.correct;
        });
        updateRGBColor();
        updateColorBlocks(rgbColorDisplay.textContent);
    }

    colorBlocks.forEach(block => block.addEventListener('click', handleColorBlockClick));
    restartButton.addEventListener('click', restartGame);

    // Initialize the game
    const correctColor = updateRGBColor();
    updateColorBlocks(correctColor);
});
