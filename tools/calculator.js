let displayValue = '';

function appendToDisplay(value) {
    displayValue += value;
    document.getElementById('calcDisplay').value = displayValue;
}

function clearDisplay() {
    displayValue = '';
    document.getElementById('calcDisplay').value = '0';
    document.getElementById('result').textContent = 'Enter a calculation';
}

function calculate() {
    try {
        const result = eval(displayValue);
        document.getElementById('calcDisplay').value = result;
        document.getElementById('result').textContent = `Result: ${result}`;
        displayValue = result.toString();
    } catch {
        document.getElementById('result').textContent = 'Invalid Input';
        displayValue = '';
    }
}
