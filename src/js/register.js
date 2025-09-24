
document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('registration-form');
  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');

    form.classList.add('hidden');


    successMessage.classList.remove('hidden');
  });
});