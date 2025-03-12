function saveText() {
    const text = document.getElementById('textEditor').value;
    localStorage.setItem('savedText', text);
    document.getElementById('result').textContent = 'Text saved!';
}

function downloadText() {
    const text = document.getElementById('textEditor').value;
    if (text.trim()) {
        const blob = new Blob([text], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'edited_text.txt';
        link.click();
        document.getElementById('result').textContent = 'Text downloaded!';
    } else {
        document.getElementById('result').textContent = 'Nothing to download!';
    }
}
