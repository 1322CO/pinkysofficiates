const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  }));
}

const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
} else {
  items.forEach(item => item.classList.add('visible'));
}
const inquiryForm = document.querySelector('.inquiry-form');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const button = inquiryForm.querySelector('button[type="submit"]');
    const originalButtonText = button.textContent;

    button.textContent = 'Sending...';
    button.disabled = true;

    const formData = new FormData(inquiryForm);
    const data = Object.fromEntries(formData);
    data.access_key = formData.get('access_key');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        inquiryForm.innerHTML = `
          <div class="form-success">
            <h3>We've got your date!</h3>
            <p>Thank you for reaching out to Pinky's Officiates.</p>
            <p>Chelsie will be in touch soon to confirm availability and learn a little more about your story.</p>
            <p><strong>Ceremonies with Heart. Stories with Soul.</strong></p>
          </div>
        `;
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      button.textContent = originalButtonText;
      button.disabled = false;

      alert("Something went wrong while sending your inquiry. Please try again or email hello@pinkysofficiates.com.");
    }
  });
}
