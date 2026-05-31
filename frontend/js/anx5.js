/* ══════════════════════════════════════
   ANNEXURE V — BENCH MARK & CORS STATIONS
   ══════════════════════════════════════ */

function renderPdfUploadUIAnx5() {
  const p = S.activeProject;
  if (!p) return;

  if (!p.pdfData) p.pdfData = {};

  const nameEl = document.getElementById('anx5-uploaded-filename');
  const previewBtn = document.getElementById('anx5-preview-btn');
  const downloadBtn = document.getElementById('anx5-download-btn');
  const deleteBtn = document.getElementById('anx5-delete-btn');
  const iframeSec = document.getElementById('pdf-preview-section-anx5');
  const iframe = document.getElementById('pdf-iframe-anx5');

  if (p.pdfData.anx5 && p.pdfData.anx5.blobUrl) {
    nameEl.textContent = p.pdfData.anx5.filename || 'Annexure_5.pdf';
    nameEl.style.display = 'inline-block';
    previewBtn.style.display = 'inline-flex';
    downloadBtn.style.display = 'inline-flex';
    deleteBtn.style.display = 'inline-flex';
    if (iframeSec.style.display === 'block') {
      iframe.src = p.pdfData.anx5.blobUrl;
    }
  } else {
    nameEl.style.display = 'none';
    previewBtn.style.display = 'none';
    downloadBtn.style.display = 'none';
    deleteBtn.style.display = 'none';
    iframeSec.style.display = 'none';
    iframe.src = '';
  }
}

function handlePDFUploadAnx5(event) {
  const file = event.target.files[0];
  if (!file) return;

  const p = S.activeProject;
  if (!p) {
    alert("No active project");
    return;
  }
  if (!p.pdfData) p.pdfData = {};

  const blobUrl = URL.createObjectURL(file);

  p.pdfData.anx5 = {
    filename: file.name,
    blobUrl: blobUrl
  };

  S.saveToStorage();
  renderPdfUploadUIAnx5();
}

function deletePdfAnx5() {
  if (!confirm("Are you sure you want to remove this PDF?")) return;
  const p = S.activeProject;
  if (!p || !p.pdfData || !p.pdfData.anx5) return;

  if (p.pdfData.anx5.blobUrl) {
    URL.revokeObjectURL(p.pdfData.anx5.blobUrl);
  }

  delete p.pdfData.anx5;
  S.saveToStorage();

  const iframeSec = document.getElementById('pdf-preview-section-anx5');
  if (iframeSec) iframeSec.style.display = 'none';
  const iframe = document.getElementById('pdf-iframe-anx5');
  if (iframe) iframe.src = '';

  renderPdfUploadUIAnx5();
}

function togglePDFPreviewAnx5() {
  const p = S.activeProject;
  if (!p || !p.pdfData || !p.pdfData.anx5 || !p.pdfData.anx5.blobUrl) return;

  const sec = document.getElementById('pdf-preview-section-anx5');
  const iframe = document.getElementById('pdf-iframe-anx5');
  
  if (sec.style.display === 'none') {
    iframe.src = p.pdfData.anx5.blobUrl;
    sec.style.display = 'block';
    sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    sec.style.display = 'none';
    iframe.src = '';
  }
}

function closePDFPreviewAnx5() {
  const sec = document.getElementById('pdf-preview-section-anx5');
  const iframe = document.getElementById('pdf-iframe-anx5');
  if (sec) sec.style.display = 'none';
  if (iframe) iframe.src = '';
}

function downloadPdfAnx5() {
  const p = S.activeProject;
  if (!p || !p.pdfData || !p.pdfData.anx5 || !p.pdfData.anx5.blobUrl) return;

  const a = document.createElement('a');
  a.href = p.pdfData.anx5.blobUrl;
  a.download = p.pdfData.anx5.filename || "Annexure_5_Final.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
