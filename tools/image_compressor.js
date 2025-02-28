document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('preview');
    const downloadLink = document.getElementById('downloadLink');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            downloadLink.style.display = 'none'; // Hide download link until compression
        };
        reader.readAsDataURL(file);
    }
});

function compressImage() {
    const fileInput = document.getElementById('imageInput');
    const quality = parseFloat(document.getElementById('quality').value);
    const file = fileInput.files[0];
    const downloadLink = document.getElementById('downloadLink');

    if (!file) {
        alert("Pehle ek image chuno!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size to half the original image dimensions
            canvas.width = img.width / 2;
            canvas.height = img.height / 2;

            // Draw image on canvas with reduced size
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Convert to JPEG with specified quality
            const compressedImage = canvas.toDataURL('image/jpeg', quality);

            // Show download link
            downloadLink.href = compressedImage;
            downloadLink.style.display = 'inline-block';
            downloadLink.click();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}
