const { jsPDF } = window.jspdf;

document.getElementById('imageInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('preview-container');
    const downloadLink = document.getElementById('downloadLink');

    previewContainer.innerHTML = ''; // Clear previous previews
    downloadLink.style.display = 'none'; // Hide download link

    if (files.length > 0) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'preview-image';
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    } else {
        alert("Pehle ek ya zyada images chuno!");
    }
});

function convertToPDF() {
    const files = document.getElementById('imageInput').files;
    const downloadLink = document.getElementById('downloadLink');

    if (files.length === 0) {
        alert("Pehle images upload karo!");
        return;
    }

    const doc = new jsPDF();
    let yOffset = 10;

    const loadImages = Array.from(files).map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    resolve({ src: e.target.result, width: img.width, height: img.height });
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    });

    Promise.all(loadImages).then(images => {
        images.forEach((image, index) => {
            const aspectRatio = image.width / image.height;
            const pdfWidth = 180; // Max width for PDF page
            const pdfHeight = pdfWidth / aspectRatio;

            if (yOffset + pdfHeight > 270) { // Check if we need a new page
                doc.addPage();
                yOffset = 10;
            }

            doc.addImage(image.src, 'JPEG', 15, yOffset, pdfWidth, pdfHeight);
            yOffset += pdfHeight + 10;

            if (index < images.length - 1 && yOffset < 270) {
                yOffset += 10; // Extra spacing between images
            }
        });

        const pdfData = doc.output('datauristring');
        downloadLink.href = pdfData;
        downloadLink.style.display = 'inline-block';
        downloadLink.click();
    }).catch(err => {
        alert("Error converting to PDF: " + err);
    });
}
