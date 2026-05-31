/* ══════════════════════════════════════
   CHAPTERS & PLATES
══════════════════════════════════════ */
function renderChapters() {
  const el = document.getElementById('chapter-list');
  if (!el) return;
  el.innerHTML = S.chapters.map((ch,i)=>`
    <div class="chapter-item">
      <div class="ch-num">${i+1}</div>
      <div class="ch-body">
        <input class="ch-name-input" value="${ch.name}" oninput="S.chapters[${i}].name=this.value">
        <textarea class="ch-summary" rows="2" oninput="S.chapters[${i}].summary=this.value">${ch.summary}</textarea>
        <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
          <label class="btn btn-xs btn-outline" style="cursor:pointer">📎 Upload Chapter PDF <input type="file" accept=".pdf" hidden onchange="handleChapterUpload(event,${ch.id})"></label>
        </div>
      </div>
      <div style="display:flex;gap:5px;flex-shrink:0">
        ${i>0?`<button class="btn btn-xs btn-outline" onclick="moveChapter(${i},-1)">↑</button>`:''}
        ${i<S.chapters.length-1?`<button class="btn btn-xs btn-outline" onclick="moveChapter(${i},1)">↓</button>`:''}
        <button class="btn btn-xs btn-danger" onclick="deleteChapter(${ch.id})">✕</button>
      </div>
    </div>`).join('');
}

function addChapter() {
  S.chapters.push({ id:Date.now(), name:'NEW CHAPTER — ENTER TITLE', summary:'Enter chapter summary here...' });
  renderChapters();
}

/******************************************************************************
 * Delete Chapter
 *****************************************************************************/
function deleteChapter(id) {
  customConfirm('Remove this chapter completely?', () => {
    S.chapters = S.chapters.filter(c => c.id !== id);
    renderChapters();
    toast('Chapter removed', 'info');
  });
}

function moveChapter(idx,dir) {
  [S.chapters[idx],S.chapters[idx+dir]]=[S.chapters[idx+dir],S.chapters[idx]]; renderChapters();
}

function handleChapterUpload(e,id) {
  const f=e.target.files[0]; if(f) toast(`📎 ${f.name} uploaded for chapter`,'success');
}


