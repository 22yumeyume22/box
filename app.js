(() => {
  const stage = document.querySelector('#stage');
  const cube = document.querySelector('#cube');
  // Delay a single tap so the second tap can cancel it on both mouse and touch.
  const DOUBLE_TAP_MS = 340;
  const DOUBLE_TAP_DISTANCE = 40;
  let pending = null;
  let firstTap = null;
  let pointerStart = null;
  let x = -25, y = 38, step = 0;
  function rotate() {
    step++;
    y += 90;
    // Periodic quarter-turns expose the top and bottom, not just the four sides.
    if (step % 2 === 0) x += 90;
    cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(-8deg)`;
  }
  function cancelPending() {
    clearTimeout(pending);
    pending = null;
    firstTap = null;
  }
  function toggleZoom() { stage.classList.toggle('enlarged'); }
  stage.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    pointerStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  stage.addEventListener('pointercancel', () => { pointerStart = null; cancelPending(); });
  stage.addEventListener('pointerup', event => {
    if (!event.isPrimary || !pointerStart || pointerStart.id !== event.pointerId) return;
    const moved = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
    pointerStart = null;
    if (moved > 12) return;
    const now = performance.now();
    if (firstTap && now - firstTap.time <= DOUBLE_TAP_MS &&
        Math.hypot(event.clientX - firstTap.x, event.clientY - firstTap.y) <= DOUBLE_TAP_DISTANCE) {
      cancelPending();
      toggleZoom();
      return;
    }
    // A second click far away is a separate single click.
    if (pending !== null) { cancelPending(); rotate(); }
    firstTap = { time: now, x: event.clientX, y: event.clientY };
    pending = setTimeout(() => { cancelPending(); rotate(); }, DOUBLE_TAP_MS);
  });
  stage.addEventListener('dblclick', event => event.preventDefault());
  stage.addEventListener('keydown', event => {
    if (event.repeat) return;
    if ([' ', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault(); cancelPending(); rotate();
    } else if (event.key === 'Enter') {
      event.preventDefault(); cancelPending(); toggleZoom();
    } else if (event.key === 'Escape') {
      cancelPending(); stage.classList.remove('enlarged');
    }
  });
  window.addEventListener('blur', () => { pointerStart = null; cancelPending(); });
})();
