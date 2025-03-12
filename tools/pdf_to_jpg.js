let convertedBlob = null;

// File input listener
document.getElementById('pdfInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('noPreview').textContent = `Selected: ${file.name}`;
        document.getElementById('previewImage').style.display = 'none';
        document.getElementById('result').textContent = 'PDF loaded. Click Convert to proceed.';
        document.getElementById('downloadBtn').disabled = true;
    }
});

// Web Worker setup
const workerScript = `
self.onmessage = async function(e) {
    const { arrayBuffer } = e.data;
    const pdfjsLib = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    const page = await pdf.getPage(1); // First page only for speed
    const scale = 1.0; // Lower scale for faster rendering
    const viewport = page.getViewport({ scale });
    const canvas = new OffscreenCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
        canvasContext: ctx,
        viewport: viewport
    }).promise;

    const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.8 });
    self.postMessage({ blob });
};
`;

const blob = new Blob([workerScript], { type: 'application/javascript' });
const workerUrl = URL.createObjectURL(blob);
const worker = new Worker(workerUrl);

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

    worker.onmessage = function(e) {
        convertedBlob = e.data.blob;
        previewImage.src = URL.createObjectURL(convertedBlob);
        previewImage.style.display = 'block';
        noPreview.style.display = 'none';
        result.textContent = 'Converted successfully!';
        document.getElementById('downloadBtn').disabled = false;
    };

    worker.onerror = function(e) {
        result.textContent = 'Error during conversion: ' + e.message;
    };

    worker.postMessage({ arrayBuffer });
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
