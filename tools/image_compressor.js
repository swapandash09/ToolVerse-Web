let compressedBlob = null;

document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('previewImage').src = event.target.result;
            document.getElementById('previewImage').style.display = 'block';
            document.getElementById('noPreview').style.display = 'none';
            document.getElementById('result').textContent = 'Image loaded. Adjust quality and compress.';
            document.getElementById('downloadBtn').disabled = true;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('quality').addEventListener('input', function() {
    document.getElementById('qualityValue').textContent = `${this.value}%`;
});

function compressImage() {
    const fileInput = document.getElementById('imageInput');
    const quality = document.getElementById('quality').value / 100;
    const result = document.getElementById('result');

    if (!fileInput.files.length) {
        result.textContent = 'Please upload an image';
        return;
    }

    const file = fileInput.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(function(blob) {
            compressedBlob = blob;
            document.getElementById('previewImage').src = URL.createObjectURL(blob);
            document.getElementById('result').textContent = `Compressed! Size: ${(blob.size / 1024).toFixed(2)} KB`;
            document.getElementById('downloadBtn').disabled = false;
        }, 'image/jpeg', quality);
    };
}

function downloadImage() {
    if (compressedBlob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(compressedBlob);
        link.download = 'compressed_image.jpg';
        link.click();
    }
}
