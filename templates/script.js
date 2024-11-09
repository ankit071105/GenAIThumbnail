document.getElementById("videoInput").addEventListener("change", generateThumbnails);

function generateThumbnails() {
    const videoFile = document.getElementById("videoInput").files[0];
    const video = document.createElement("video");
    video.src = URL.createObjectURL(videoFile);
    
    video.addEventListener("loadeddata", () => {
        const thumbnailGallery = document.getElementById("thumbnailGallery");
        thumbnailGallery.innerHTML = "";  // Clear any previous thumbnails
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => captureFrame(video, i * (video.duration / 10)), 100 * i);
        }
    });
}

function captureFrame(video, time) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 320;
    canvas.height = 180;

    video.currentTime = time;
    video.addEventListener("seeked", () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const img = document.createElement("img");
        img.src = canvas.toDataURL("image/png");
        img.onclick = () => loadThumbnailToCanvas(img);
        document.getElementById("thumbnailGallery").appendChild(img);
    }, { once: true });
}

function loadThumbnailToCanvas(img) {
    const canvas = document.getElementById("thumbnailCanvas");
    const context = canvas.getContext("2d");
    const thumbnail = new Image();
    thumbnail.src = img.src;
    thumbnail.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(thumbnail, 0, 0, canvas.width, canvas.height);
    };
}

function addText() {
    const text = prompt("Enter the text:");
    const canvas = document.getElementById("thumbnailCanvas");
    const context = canvas.getContext("2d");
    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText(text, 50, 50);
}

function addSticker() {
    const sticker = new Image();
    sticker.src = "https://via.placeholder.com/50"; // Replace with actual sticker URL
    sticker.onload = () => {
        const canvas = document.getElementById("thumbnailCanvas");
        const context = canvas.getContext("2d");
        context.drawImage(sticker, 100, 100, 50, 50);
    };
}

function downloadImage() {
    const canvas = document.getElementById("thumbnailCanvas");
    const link = document.createElement("a");
    link.download = "thumbnail.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}
