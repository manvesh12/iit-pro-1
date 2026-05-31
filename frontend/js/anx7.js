/* ══════════════════════════════════════
   ANNEXURE VII — FINAL PATTA LANDS
   ══════════════════════════════════════ */

function renderPdfUploadUIAnx7() {
  const p = S.activeProject;
  if (!p) return;

  if (!p.pdfData) p.pdfData = {};

  const nameEl = document.getElementById('anx7-uploaded-filename');
  const previewBtn = document.getElementById('anx7-preview-btn');
  const downloadBtn = document.getElementById('anx7-download-btn');
  const deleteBtn = document.getElementById('anx7-delete-btn');
  const iframeSec = document.getElementById('pdf-preview-section-anx7');
  const iframe = document.getElementById('pdf-iframe-anx7');

  if (p.pdfData.anx7 && p.pdfData.anx7.blobUrl) {
    nameEl.textContent = p.pdfData.anx7.filename || 'Annexure_7.pdf';
    nameEl.style.display = 'inline-block';
    previewBtn.style.display = 'inline-flex';
    downloadBtn.style.display = 'inline-flex';
    deleteBtn.style.display = 'inline-flex';
    if (iframeSec.style.display === 'block') {
      iframe.src = p.pdfData.anx7.blobUrl;
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

function handlePDFUploadAnx7(event) {
  const file = event.target.files[0];
  if (!file) return;

  const p = S.activeProject;
  if (!p) {
    alert("No active project");
    return;
  }
  if (!p.pdfData) p.pdfData = {};

  const blobUrl = URL.createObjectURL(file);

  p.pdfData.anx7 = {
    filename: file.name,
    blobUrl: blobUrl
  };

  S.saveToStorage();
  renderPdfUploadUIAnx7();
}

function deletePdfAnx7() {
  if (!confirm("Are you sure you want to remove this PDF?")) return;
  const p = S.activeProject;
  if (!p || !p.pdfData || !p.pdfData.anx7) return;

  if (p.pdfData.anx7.blobUrl) {
    URL.revokeObjectURL(p.pdfData.anx7.blobUrl);
  }

  delete p.pdfData.anx7;
  S.saveToStorage();

  const iframeSec = document.getElementById('pdf-preview-section-anx7');
  if (iframeSec) iframeSec.style.display = 'none';
  const iframe = document.getElementById('pdf-iframe-anx7');
  if (iframe) iframe.src = '';

  renderPdfUploadUIAnx7();
}

function togglePDFPreviewAnx7() {
  const p = S.activeProject;
  if (!p || !p.pdfData || !p.pdfData.anx7 || !p.pdfData.anx7.blobUrl) return;

  const sec = document.getElementById('pdf-preview-section-anx7');
  const iframe = document.getElementById('pdf-iframe-anx7');
  
  if (sec.style.display === 'none') {
    iframe.src = p.pdfData.anx7.blobUrl;
    sec.style.display = 'block';
    sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    sec.style.display = 'none';
    iframe.src = '';
  }
}

function closePDFPreviewAnx7() {
  const sec = document.getElementById('pdf-preview-section-anx7');
  const iframe = document.getElementById('pdf-iframe-anx7');
  if (sec) sec.style.display = 'none';
  if (iframe) iframe.src = '';
}

function downloadPdfAnx7() {
  const p = S.activeProject;
  if (!p || !p.pdfData || !p.pdfData.anx7 || !p.pdfData.anx7.blobUrl) return;

  const a = document.createElement('a');
  a.href = p.pdfData.anx7.blobUrl;
  a.download = p.pdfData.anx7.filename || "Annexure_7_Final.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
