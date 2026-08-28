const menu = document.querySelector('#menu');
const menuToggle = document.querySelector('[data-menu-toggle]');
const header = document.querySelector('[data-header]');

function closeMenu() {
  if (!menu || !menuToggle) return;
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  document.body.classList.remove('menu-open');
}

function toggleMenu() {
  if (!menu || !menuToggle) return;
  const isOpen = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', isOpen);
}

menuToggle?.addEventListener('click', toggleMenu);

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 920) closeMenu();
});

if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 16);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      instance.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll('[data-year]').forEach((item) => {
  item.textContent = String(new Date().getFullYear());
});

const leadForm = document.querySelector('[data-lead-form]');

if (leadForm) {
  const endpoint = leadForm.dataset.endpoint?.trim();
  const leadIdInput = leadForm.querySelector('[data-lead-id]');
  const progressLabel = leadForm.querySelector('[data-form-progress]');
  const progressBar = leadForm.querySelector('[data-form-progress-bar]');
  const status = leadForm.querySelector('[data-form-status]');
  const success = leadForm.querySelector('[data-form-success]');
  const skipButton = leadForm.querySelector('[data-form-skip]');
  const whatsappInput = leadForm.querySelector('[name="whatsapp"]');
  let currentStep = 1;

  const createLeadId = () => {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `lead-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  leadIdInput.value = createLeadId();

  const setStatus = (message = '', type = 'error') => {
    status.textContent = message;
    status.classList.toggle('is-info', type === 'info');
  };

  const setBusy = (isBusy, label = 'Enviando...') => {
    leadForm.querySelectorAll('button').forEach((button) => {
      button.disabled = isBusy;
    });

    const submitButton = leadForm.querySelector(`[data-form-step="${currentStep}"] [data-form-submit]`);
    if (!submitButton) return;

    if (!submitButton.dataset.originalLabel) {
      submitButton.dataset.originalLabel = submitButton.textContent;
    }
    submitButton.textContent = isBusy ? label : submitButton.dataset.originalLabel;
  };

  const setStep = (step) => {
    currentStep = step;
    leadForm.querySelectorAll('[data-form-step]').forEach((panel) => {
      panel.hidden = Number(panel.dataset.formStep) !== step;
    });
    progressLabel.textContent = `Etapa ${step} de 2`;
    progressBar.style.width = step === 1 ? '50%' : '100%';
    setStatus();

    const firstInput = leadForm.querySelector(`[data-form-step="${step}"] input:not([type="hidden"])`);
    firstInput?.focus({ preventScroll: true });
  };

  const formPayload = (etapa) => {
    const data = new FormData(leadForm);
    return {
      etapa,
      lead_id: leadIdInput.value,
      nome: String(data.get('nome') || '').trim(),
      whatsapp: String(data.get('whatsapp') || '').replace(/\D/g, ''),
      bairro: String(data.get('bairro') || '').trim(),
      cidade: String(data.get('cidade') || '').trim(),
      email: String(data.get('email') || '').trim(),
      consentimento: data.get('consentimento') === 'sim' ? 'sim' : 'nao',
      consent_version: String(data.get('consent_version') || ''),
      website: String(data.get('website') || ''),
      origem: 'site-ramiro-meves',
      pagina: window.location.href,
      enviado_em: new Date().toISOString(),
      dispositivo: navigator.userAgent
    };
  };

  const postLead = async (payload) => {
    if (!endpoint) {
      throw new Error('missing-endpoint');
    }

    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      keepalive: true
    });
  };

  const finishForm = () => {
    leadForm.querySelectorAll('[data-form-step], .lead-form__progress').forEach((item) => {
      item.hidden = true;
    });
    success.hidden = false;
    setStatus();
    success.focus({ preventScroll: true });
  };

  leadForm.addEventListener('invalid', (event) => {
    event.target.setAttribute('aria-invalid', 'true');
  }, true);

  leadForm.addEventListener('input', (event) => {
    if (event.target.matches('input')) {
      event.target.removeAttribute('aria-invalid');
    }
  });

  whatsappInput?.addEventListener('input', () => {
    const digits = whatsappInput.value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) {
      whatsappInput.value = digits;
    } else if (digits.length <= 7) {
      whatsappInput.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else {
      whatsappInput.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
  });

  leadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (currentStep === 1) {
      const phoneDigits = whatsappInput.value.replace(/\D/g, '');
      whatsappInput.setCustomValidity(phoneDigits.length >= 10 ? '' : 'Digite um WhatsApp com DDD.');
    }

    const currentFields = [...leadForm.querySelectorAll(`[data-form-step="${currentStep}"] input`)];
    if (currentFields.some((field) => !field.checkValidity())) {
      leadForm.reportValidity();
      setStatus('Confira os campos informados para continuar.');
      return;
    }

    setBusy(true);
    setStatus('Enviando seu cadastro...', 'info');

    try {
      await postLead(formPayload(currentStep === 1 ? 'passo_1' : 'concluido'));
      if (currentStep === 1) {
        setStep(2);
      } else {
        finishForm();
      }
    } catch (error) {
      const message = error.message === 'missing-endpoint'
        ? 'A planilha ainda precisa ser conectada para liberar o cadastro.'
        : 'Não foi possível enviar agora. Tente novamente em alguns instantes.';
      setStatus(message);
    } finally {
      setBusy(false);
    }
  });

  skipButton?.addEventListener('click', async () => {
    setBusy(true, 'Concluindo...');
    setStatus('Concluindo seu cadastro...', 'info');

    try {
      await postLead(formPayload('parcial'));
      finishForm();
    } catch (error) {
      const message = error.message === 'missing-endpoint'
        ? 'A planilha ainda precisa ser conectada para liberar o cadastro.'
        : 'Não foi possível concluir agora. Tente novamente em alguns instantes.';
      setStatus(message);
    } finally {
      setBusy(false);
    }
  });
}
