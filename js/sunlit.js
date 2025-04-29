// On page load, start the sunlit transition from a given start% to end%, then pause
function runSunlitSegment() {
  const duration = 1.7 * 1000;      // total animation duration in ms
  const startPercent = 0.55;         // fraction (0–1) where animation should start
  const endPercent = 0.85;           // fraction (0–1) where animation should stop

  // Ensure the animation class and dark state are set
  document.body.classList.add('animation-ready');
  document.body.classList.add('dark');

  // Jump to the start point
  document.body.style.animationDelay = `-${startPercent * 1.7}s`;
  document.body.style.animationPlayState = 'running';

  // After the segment duration, pause the animation at end point
  const segmentMs = (endPercent - startPercent) * duration;
  setTimeout(() => {
    document.body.style.animationPlayState = 'paused';
  }, segmentMs);
}

window.addEventListener('DOMContentLoaded', () => {
  runSunlitSegment();
});
window.addEventListener('pageshow', runSunlitSegment);

