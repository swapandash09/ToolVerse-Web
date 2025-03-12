let resizedBlob = null;

document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('previewImage').src = event.target.result;
            document.getElementById('previewImage').style.display = 'block';
            document.getElementById('noPreview').style.display = 'none';
            document.getElementById('result').textContent = 'Image loaded. Set dimensions and resize.';
        };
        reader.readAsDataURL(file);
    }
});

function resizeImage() {
    const fileInput = document.getElementById('imageInput');
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const result = document.getElementById('result');

    if (!fileInput.files.length || !width || !height) {
        result.textContent = 'Please upload an image and specify dimensions';
        return;
    }

    const file = fileInput.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(function(blob) {
            resizedBlob = blob;
            document.getElementById('previewImage').src = URL.createObjectURL(blob);
            document.getElementById('result').textContent = `Resized to ${width}x${height}!`;
            document.getElementById('downloadBtn').disabled = false;
        }, 'image/jpeg');
    };
}

function downloadImage() {
    if (resizedBlob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(resizedBlob);
        link.download = 'resized_image.jpg';
        link.click();
    }
}
