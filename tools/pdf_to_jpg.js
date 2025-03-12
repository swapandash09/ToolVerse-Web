let convertedBlob = null;

document.getElementById('pdfInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('noPreview').textContent = `Selected: ${file.name}`;
        document.getElementById('previewImage').style.display = 'none';
        document.getElementById('result').textContent = 'PDF loaded. Click Convert to proceed.';
        document.getElementById('downloadBtn').disabled = true;
    }
});

async function convertPDF() {
    const fileInput = document.getElementById('pdfInput');
    const result = document.getElementById('result');
    const previewImage = document.getElementById('previewImage');
    const noPreview = document.getElementById('noPreview');

    if (!fileInput.files.length) {
        result.textContent = 'Please upload a PDF';
        return;
    }

    const file = fileInput.files[0];
    result.textContent = 'Converting...';

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    const page = await pdf.getPage(1); // First page only

    const scale = 1.5;
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
        canvasContext: ctx,
        viewport: viewport
    }).promise;

    canvas.toBlob(function(blob) {
        convertedBlob = blob;
        previewImage.src = URL.createObjectURL(blob);
        previewImage.style.display = 'block';
        noPreview.style.display = 'none';
        result.textContent = 'Converted successfully!';
        document.getElementById('downloadBtn').disabled = false;
    }, 'image/jpeg');
}

function downloadJPG() {
    if (convertedBlob) {
        const fileName = document.getElementById('pdfInput').files[0].name.replace('.pdf', '.jpg');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(convertedBlob);
        link.download = fileName;
        link.click();
    }
}
