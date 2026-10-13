document.querySelectorAll('.filters').forEach(function(filters) { filters.hidden = false; });
document.querySelectorAll('[data-year-filter]').forEach(function(button) {
  button.addEventListener('click', function() {
    var year = button.dataset.yearFilter;
    document.querySelectorAll('[data-year-filter]').forEach(function(item) { item.setAttribute('aria-pressed', String(item === button)); });
    document.querySelectorAll('[data-post-year]').forEach(function(post) { post.hidden = year !== 'all' && post.dataset.postYear !== year; });
  });
});

// Optional effects progressively enhance the static, GitHub Pages-compatible site.
(function () {
  'use strict';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var toggle = document.querySelector('.motion-toggle');
  var canvas = document.getElementById('starfield');
  var progress = document.querySelector('.reading-progress');
  var storedPause = false;
  try { storedPause = window.localStorage.getItem('portfolio-motion-paused') === 'true'; } catch (error) {}
  var paused = storedPause;
  var frame = null;
  var previousTime = 0;
  var context = canvas && canvas.getContext('2d');
  var width = 0;
  var height = 0;
  var stars = [];
  var pointer = { x: 0, y: 0 };
  var finePointer = window.matchMedia('(pointer: fine)');

  function motionAllowed() { return !paused && !reducedMotion.matches && !document.hidden; }

  function resize() {
    if (!context) return;
    width = window.innerWidth;
    height = window.innerHeight;
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({ length: width < 760 ? 28 : 65 }, function () {
      return { x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.3 + .3, speed: Math.random() * .22 + .08 };
    });
    draw(0);
  }

  function draw(delta) {
    if (!context) return;
    context.clearRect(0, 0, width, height);
    stars.forEach(function (star) {
      star.y -= star.speed * delta;
      if (star.y < -5) star.y = height + 5;
      var x = star.x + pointer.x * star.radius * 4;
      var y = star.y + pointer.y * star.radius * 4;
      context.beginPath();
      context.arc(x, y, star.radius, 0, Math.PI * 2);
      context.fillStyle = star.radius > 1 ? '#85e2e4' : '#9eabd3';
      context.fill();
    });
    // A few faint connections suggest a neural network without dominating the text.
    for (var i = 0; i < stars.length; i += 3) {
      var a = stars[i];
      var b = stars[(i + 3) % stars.length];
      var distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance < 160) {
        context.strokeStyle = 'rgba(99,244,221,' + (.12 * (1 - distance / 160)) + ')';
        context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke();
      }
    }
  }

  function animate(time) {
    frame = null;
    if (!motionAllowed() || !context) return;
    if (time - previousTime >= 32) {
      var delta = previousTime ? Math.min((time - previousTime) / 16.67, 3) : 0;
      draw(delta); previousTime = time;
    }
    frame = window.requestAnimationFrame(animate);
  }

  function synchronizeMotion() {
    var off = paused || reducedMotion.matches;
    document.body.classList.toggle('motion-paused', off);
    document.documentElement.style.scrollBehavior = off ? 'auto' : '';
    if (toggle) {
      toggle.hidden = false;
      toggle.disabled = reducedMotion.matches;
      toggle.textContent = reducedMotion.matches ? 'Reduced motion on' : paused ? 'Resume motion' : 'Pause motion';
      toggle.setAttribute('aria-pressed', String(off));
      toggle.title = reducedMotion.matches ? 'Follows your system motion preference' : 'Control decorative animations';
    }
    if (frame !== null) { window.cancelAnimationFrame(frame); frame = null; }
    previousTime = 0;
    if (motionAllowed() && context) frame = window.requestAnimationFrame(animate);
  }

  if (toggle) toggle.addEventListener('click', function () {
    paused = !paused;
    try { window.localStorage.setItem('portfolio-motion-paused', String(paused)); } catch (error) {}
    synchronizeMotion();
  });
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', synchronizeMotion);
  document.addEventListener('visibilitychange', synchronizeMotion);
  window.addEventListener('resize', resize, { passive: true });
  resize();
  synchronizeMotion();

  if ('IntersectionObserver' in window && !reducedMotion.matches && !paused) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    document.querySelectorAll('.section-heading, .project-card, .writing-card, .about-grid, .contact-section, .work-entry').forEach(function (element) {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('reveal-pending');
        observer.observe(element);
      }
    });
    // Keyboard navigation must never wait for a scroll animation.
    document.addEventListener('focusin', function (event) {
      var section = event.target.closest('.reveal-pending');
      if (section) { section.classList.remove('reveal-pending'); observer.unobserve(section); }
    });
  }

  function updateProgress() {
    if (!progress) return;
    var distance = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0) + ')';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  if (finePointer.matches) {
    window.addEventListener('pointermove', function (event) {
      if (!motionAllowed()) return;
      pointer.x = event.clientX / window.innerWidth - .5;
      pointer.y = event.clientY / window.innerHeight - .5;
    }, { passive: true });
    document.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('pointermove', function (event) {
        if (!motionAllowed()) return;
        var bounds = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', event.clientX - bounds.left + 'px');
        card.style.setProperty('--pointer-y', event.clientY - bounds.top + 'px');
      }, { passive: true });
    });
  }
}());
