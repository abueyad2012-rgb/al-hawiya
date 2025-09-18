(function(){
  const buttons = document.querySelectorAll('.options .btn');
  const sStart = document.getElementById('sfx-start');
  const sCorrect = document.getElementById('sfx-correct');
  const sWrong = document.getElementById('sfx-wrong');
  const sFanfare = document.getElementById('sfx-fanfare');
  const bg = document.getElementById('bg-music');
  let score = 0, answered = new Set();

  document.getElementById('btn-play').addEventListener('click', ()=>{
    sStart.currentTime=0; sStart.play().catch(()=>{});
    bg.volume = 0.35; bg.play().catch(()=>{});
  });
  document.getElementById('btn-pause').addEventListener('click', ()=>{
    bg.pause();
  });
  document.getElementById('btn-fs').addEventListener('click', ()=>{
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
  });

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.question');
      const qid = section.dataset.q;
      const feedback = section.querySelector('.feedback');
      const isCorrect = btn.classList.contains('correct');
      feedback.textContent = btn.dataset.feedback;

      section.querySelectorAll('.options .btn').forEach(b => b.disabled = true);
      if(!answered.has(qid)){
        if(isCorrect){ score++; sCorrect.currentTime=0; sCorrect.play().catch(()=>{}); }
        else { sWrong.currentTime=0; sWrong.play().catch(()=>{}); }
        answered.add(qid);
      }
    });
  });

  document.getElementById('show-score').addEventListener('click', () => {
    const total = document.querySelectorAll('.question').length;
    const scoreText = document.getElementById('score-text');
    scoreText.textContent = `نتيجتك: ${score} / ${total}`;
    sFanfare.currentTime = 0; sFanfare.play().catch(()=>{});
  });
})();