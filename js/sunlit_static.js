// On page load, jump halfway through the sunlit transition
window.addEventListener('DOMContentLoaded', () => {
  // Ensure the animation class is present
  document.body.classList.add('animation-ready');
  // Position the animation at 50% (half of the 1.7s duration)
  document.body.style.animationDelay = '-1.5s';
  // Apply dark state to trigger the sunset animation frame
  document.body.classList.add('dark');
  // Pause the animation so it doesn't play on its own
  document.body.style.animationPlayState = 'paused';
});


