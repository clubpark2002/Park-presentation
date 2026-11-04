/* Presentation controls; slide definitions remain in the original document. */
(() => {
  const nav = document.getElementById('nav');
  const fullscreen = document.createElement('button');
  fullscreen.type = 'button';
  fullscreen.textContent = '⛶';
  fullscreen.title = '전체화면 (F)';
  fullscreen.setAttribute('aria-label', '전체화면 전환');
  window.togglePresentationFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (error) { console.warn('전체화면을 사용할 수 없습니다.', error); }
  };
  fullscreen.onclick = window.togglePresentationFullscreen;
  nav.appendChild(fullscreen);
  const dialog = document.createElement('dialog');
  dialog.id = 'presenter-jump';
  dialog.innerHTML = `<form method="dialog"><label for="presenter-page">페이지 이동</label><input id="presenter-page" type="number" min="1" max="${slides.length}" required aria-label="페이지 번호"><p>1–${slides.length} 페이지</p><div><button value="cancel" formnovalidate>취소</button><button value="go">이동</button></div></form>`;
  document.body.appendChild(dialog);
  const input = dialog.querySelector('input');
  window.openPresentationJump = () => {
    if (dialog.open) return;
    input.value = cinematicIndex + 1;
    dialog.showModal();
    input.select();
  };
  dialog.addEventListener('close', () => {
    if (dialog.returnValue === 'go') cinematicJump(Number(input.value));
    document.getElementById('count').focus();
  });
  const count = document.getElementById('count');
  count.onclick = window.openPresentationJump;
  count.tabIndex = 0;
  count.setAttribute('role', 'button');
  count.setAttribute('aria-label', '페이지 이동 (G)');
  count.onkeydown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.openPresentationJump();
    }
  };
  document.getElementById('prev').setAttribute('aria-label', '이전 페이지');
  document.getElementById('printBtn').setAttribute('aria-label', '인쇄');
  const requested = Number(location.hash.slice(1));
  if (Number.isInteger(requested) && requested >= 1 && requested <= slides.length) cinematicJump(requested);
})();
