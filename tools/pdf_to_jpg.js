let convertedBlob = null;

document.getElementById('pdfInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('noPreview').textContent = `Selected: ${file.name}`;
    }
});

function convertPDF() {
    const fileInput = document.getElementById('pdfInput');
    const result = document.getElementById('result');
    const previewOutput = document.getElementById('previewOutput');

    if (!fileInput.files.length) {
        result.textContent = 'Please upload a PDF';
        return;
    }

    result.textContent = 'Converting... (Simulated)';
    setTimeout(() => {
        // Simulated conversion (actual PDF to JPG needs a library like pdf.js)
        const file = fileInput.files[0];
        const img = new Image();
        img.src = 'https://via.placeholder.com/300x200?text=Converted+JPG'; // Placeholder
        previewOutput.innerHTML = '';
        previewOutput.appendChild(img);
        previewOutput.style.display = 'block';
        document.getElementById('noPreview').style.display = 'none';
        result.textContent = 'Converted successfully!';
        convertedBlob = new Blob([/* Simulated JPG data */], { type: 'image/jpeg' });
        document.getElementById('downloadBtn').disabled = false;
    }, 1000);
}

function downloadJPG() {
    if (convertedBlob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(convertedBlob);
        link.download = 'converted_image.jpg';
        link.click();
    }
}
