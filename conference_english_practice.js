(() => {
  const synth = window.speechSynthesis;
  const englishVoice = () => speechSynthesis.getVoices().find(v => /^en(-|_)/i.test(v.lang)) || null;
  document.querySelectorAll('.speak').forEach(btn => btn.addEventListener('click', () => {
    if (!synth) return;
    synth.cancel();
    const text = btn.closest('.scene').querySelector('.english').textContent.trim();
    const u = new SpeechSynthesisUtterance(text); u.lang='en-US'; u.rate=.82; u.pitch=.95;
    const v = englishVoice(); if(v) u.voice=v; synth.speak(u);
  }));
  document.querySelectorAll('.toggle').forEach(btn => btn.addEventListener('click', () => {
    const box = btn.closest('.scene').querySelector('.reveal'); box.classList.toggle('open');
    btn.textContent = box.classList.contains('open') ? 'Hide practice' : 'Practice sentence';
  }));
  document.querySelectorAll('.check').forEach(btn => btn.addEventListener('click', () => {
    const scene=btn.closest('.scene'), input=scene.querySelector('.practice'), answer=scene.querySelector('.english').textContent.trim().toLowerCase().replace(/[^a-z0-9 ]/g,'');
    const typed=input.value.trim().toLowerCase().replace(/[^a-z0-9 ]/g,'');
    const feedback=scene.querySelector('.feedback');
    feedback.textContent = typed===answer ? 'Excellent — exact match.' : 'Keep going. Listen once more and try again.';
    feedback.style.color = typed===answer ? 'var(--gold)' : 'var(--accent)';
  }));
  const cards=[...document.querySelectorAll('.scene')]; const count=document.querySelector('.count');
  if(count) count.textContent=`${cards.length} practice lines`;
})();
