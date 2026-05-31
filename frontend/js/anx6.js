/* ══════════════════════════════════════
   ANNEXURE VI — FINAL CLUSTER DETAILS
   ══════════════════════════════════════ */

function renderPdfUploadUIAnx6() {
  const p = S.activeProject;
  if (!p) return;

  if (!p.pdfData) p.pdfData = {};

  const nameEl = document.getElementById('anx6-uploaded-filename');
  const previewBtn = document.getElementById('anx6-preview-btn');
  const downloadBtn = document.getElementById('anx6-download-btn');
  const deleteBtn = document.getElementById('anx6-delete-btn');
  const iframeSec = document.getElementById('pdf-preview-section-anx6');
  const iframe = document.getElementById('pdf-iframe-anx6');

  if (p.pdfData.anx6 && p.pdfData.anx6.blobUrl) {
    nameEl.textContent = p.pdfData.anx6.filename || 'Annexure_6.pdf';
    nameEl.style.display = 'inline-block';
    previewBtn.style.display = 'inline-flex';
    downloadBtn.style.display = 'inline-flex';
    deleteBtn.style.display = 'inline-flex';
    if (iframeSec.style.display === 'block') {
      iframe.src = p.pdfData.anx6.blobUrl;
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

function handlePDFUploadAnx6(event) {
  const file = event.target.files[0];
  if (!file) return;

  const p = S.activeProject;
  if (!p) {
    alert("No active project");
    return;
  }
  if (!p.pdfData) p.pdfData = {};

  const blobUrl = URL.createObjectURL(file);

  p.pdfData.anx6 = {
    filename: file.name,
    blobUrl: blobUrl
  };

  S.saveToStorage();
  renderPdfUploadUIAnx6();
}

function deletePdfAnx6() {
  if (!confirm("Are you sure you want to remove this PDF?")) return;
  const p = S.activeProject;
  if (!p || !p.pdfData || !p.pdfData.anx6) return;

  if (p.pdfData.anx6.blobUrl) {
    URL.revokeObjectURL(p.pdfData.anx6.blobUrl);
  }

  delete p.pdfData.anx6;
  S.saveToStorage();

  const iframeSec = document.getElementById('pdf-preview-section-anx6');
  if (iframeSec) iframeSec.style.display = 'none';
  const iframe = document.getElementById('pdf-iframe-anx6');
  if (iframe) iframe.src = '';

  renderPdfUploadUIAnx6();
}

function togglePDFPreviewAnx6() {
  const p = S.activeProject;
  if (!p || !p.pdfData || !p.pdfData.anx6 || !p.pdfData.anx6.blobUrl) return;

  const sec = document.getElementById('pdf-preview-section-anx6');
  const iframe = document.getElementById('pdf-iframe-anx6');
  
  if (sec.style.display === 'none') {
    iframe.src = p.pdfData.anx6.blobUrl;
    sec.style.display = 'block';
    sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    sec.style.display = 'none';
    iframe.src = '';
  }
}

function closePDFPreviewAnx6() {
  const sec = document.getElementById('pdf-preview-section-anx6');
  const iframe = document.getElementById('pdf-iframe-anx6');
  if (sec) sec.style.display = 'none';
  if (iframe) iframe.src = '';
}

function downloadPdfAnx6() {
  const p = S.activeProject;
  if (!p || !p.pdfData || !p.pdfData.anx6 || !p.pdfData.anx6.blobUrl) return;

  const a = document.createElement('a');
  a.href = p.pdfData.anx6.blobUrl;
  a.download = p.pdfData.anx6.filename || "Annexure_6_Final.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
