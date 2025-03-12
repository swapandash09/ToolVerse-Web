let pdfBlob = null;

document.getElementById('imageInput').addEventListener('change', function(e) {
    const files = e.target.files;
    const previewImages = document.getElementById('previewImages');
    const noPreview = document.getElementById('noPreview');
    previewImages.innerHTML = '';
    if (files.length) {
        noPreview.style.display = 'none';
        Array.from(files).forEach(file => {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.style.maxWidth = '150px';
            img.style.margin = '10px';
            previewImages.appendChild(img);
        });
        document.getElementById('result').textContent = 'Images loaded. Click Convert to proceed.';
        document.getElementById('downloadBtn').disabled = true;
    }
});

async function convertToPDF() {
    const fileInput = document.getElementById('imageInput');
    const result = document.getElementById('result');
    if (!fileInput.files.length) {
        result.textContent = 'Please upload at least one image';
        return;
    }

    result.textContent = 'Converting...';
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const files = Array.from(fileInput.files);

    for (let i = 0; i < files.length; i++) {
        const img = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.readAsDataURL(files[i]);
        });
        const imgElement = new Image();
        imgElement.src = img;
        await new Promise(resolve => imgElement.onload = resolve);
        const width = doc.internal.pageSize.getWidth();
        const height = (imgElement.height * width) / imgElement.width;
        if (i > 0) doc.addPage();
        doc.addImage(img, 'JPEG', 0, 0, width, height);
    }

    pdfBlob = doc.output('blob');
    result.textContent = 'Converted successfully!';
    document.getElementById('downloadBtn').disabled = false;
}

function downloadPDF() {
    if (pdfBlob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(pdfBlob);
        link.download = 'converted.pdf';
        link.click();
    }
}
