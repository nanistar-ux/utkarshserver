document.addEventListener('DOMContentLoaded', () => {
  const pdfFile = document.getElementById('pdfFile');
  const fileNameDisplay = document.getElementById('fileName');
  const uploadForm = document.getElementById('uploadForm');
  const submitBtn = document.getElementById('submitBtn');
  const loading = document.getElementById('loading');
  const initialApiResponse = document.getElementById('initialApiResponse');

  // Show selected file name + validate size
  pdfFile.addEventListener('change', () => {
    if (pdfFile.files.length > 0) {
      const file = pdfFile.files[0];
      if (file.size < 1024 || file.size > 200 * 1024) {
        alert("File size must be between 1KB and 200KB");
        pdfFile.value = "";
        fileNameDisplay.textContent = "No file chosen";
        return;
      }
      fileNameDisplay.textContent = file.name;
    } else {
      fileNameDisplay.textContent = 'No file chosen';
    }
  });

  // Show spinner on submit
  uploadForm.addEventListener('submit', () => {
    submitBtn.disabled = true;
    loading.style.display = 'inline-block';
  });

  // Load Existing Claims
  async function loadExistingClaims() {
    try {
      const response = await fetch("http://10.80.200.111:5001/api/claims", {
        headers: { "x-api-key": "SIH2025_SECRET_123" }
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      initialApiResponse.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      initialApiResponse.textContent = "Failed to load claims: " + err.message;
    }
  }

  loadExistingClaims();
});
