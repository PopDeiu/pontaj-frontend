const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resultDiv = document.getElementById('result');
const startCameraBtn = document.getElementById('startCameraBtn');
const videoWrapper = document.getElementById('videoWrapper');

let cameraStarted = false;
let lastQRCode = '';

// Request camera access
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });
        video.srcObject = stream;
        videoWrapper.style.display = 'block';
        startCameraBtn.style.display = 'none';
        resultDiv.textContent = 'Așteaptă scanarea...';
        cameraStarted = true;
    } catch (err) {
        resultDiv.textContent = 'Acces la cameră refuzat: ' + err.message;
        console.error('Error accessing camera:', err);
    }
}

// Button click handler
startCameraBtn.addEventListener('click', startCamera);

// QR code detection
function detectQRCode() {
    if (cameraStarted && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code && code.data !== lastQRCode) {
            lastQRCode = code.data;
            document.querySelector('.result-text').textContent = code.data;
            console.log('QR Code data:', code.data);
        }
    }
    requestAnimationFrame(detectQRCode);
}

detectQRCode();