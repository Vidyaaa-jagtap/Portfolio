AOS.init({
  once: true,
  duration: 800
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

function initParticles() {
  const c = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim().replace(/["']/g, '');
  const inst = window.pJSDom && window.pJSDom[0];
  if (inst) {
    inst.pJS.particles.color.value = c;
    inst.pJS.particles.line_linked.color = c;
    inst.fn.redraw();
  } else {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80 },
        color: { value: c },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: {
          enable: true,
          distance: 120,
          color: c,
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          out_mode: "out"
        }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          repulse: { distance: 100 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
}

const themeToggleBtn = document.getElementById('theme-toggle');

function setInitialTheme() {
  const stored = localStorage.getItem('theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const initialTheme = stored || system;
  document.documentElement.setAttribute('data-theme', initialTheme);
  themeToggleBtn.setAttribute('aria-label', `Switch to ${initialTheme==='dark'?'light':'dark'} theme`);
  themeToggleBtn.textContent = initialTheme === 'dark' ? '☀️' : '🌙';
  document.getElementById('particles-js').style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg');
}

themeToggleBtn.addEventListener('click', () => {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  themeToggleBtn.setAttribute('aria-label', `Switch to ${nextTheme==='dark'?'light':'dark'} theme`);
  themeToggleBtn.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
  document.getElementById('particles-js').style.background = getComputedStyle(root).getPropertyValue('--bg');
  initParticles();
});

document.addEventListener('DOMContentLoaded', () => {
  setInitialTheme();
  initParticles();
});

// ✅ Contact Form Submission
const form = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      statusMsg.textContent = "Thank you! Your message has been sent.";
      statusMsg.style.display = "block";
      statusMsg.style.color = "green";
      form.reset();
    } else {
      statusMsg.textContent = "Oops! Something went wrong.";
      statusMsg.style.display = "block";
      statusMsg.style.color = "red";
    }
  } catch (error) {
    statusMsg.textContent = "Network error. Please try again.";
    statusMsg.style.display = "block";
    statusMsg.style.color = "red";
  }
});
