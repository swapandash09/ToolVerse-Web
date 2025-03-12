function compressImage() {
    const input = document.getElementById('imageInput');
    const result = document.getElementById('result');
    if (input.files.length) {
        result.textContent = `Compressing ${input.files[0].name}... (Simulated)`;
    } else {
        result.textContent = 'Please upload an image';
    }
}
