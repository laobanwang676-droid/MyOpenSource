(function () {
  function setupThemeToggle() {
    var toggles = document.querySelectorAll('.theme-toggle');
    var html = document.documentElement;
    var storedTheme = localStorage.getItem('theme');

    function updateToggleText() {
      var label = html.getAttribute('data-theme') === 'dark' ? '浅色' : '深色';
      toggles.forEach(function (toggle) {
        toggle.textContent = label;
      });
    }

    if (storedTheme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    }

    updateToggleText();

    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var isDark = html.getAttribute('data-theme') === 'dark';
        if (isDark) {
          html.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
        } else {
          html.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        }
        updateToggleText();
      });
    });
  }

  function setupContactModal() {
    var overlay = document.getElementById('contactModal');
    var openLink = document.getElementById('contactLink');
    var closeBtn = document.getElementById('closeModal');

    if (!overlay) return;

    if (openLink) {
      openLink.addEventListener('click', function (event) {
        event.preventDefault();
        overlay.classList.add('active');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        overlay.classList.remove('active');
      });
    }

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      resolve();
    });
  }

  function setupCopyButtons() {
    document.querySelectorAll('.btn-copy').forEach(function (button) {
      button.addEventListener('click', function () {
        var text = button.getAttribute('data-copy');
        if (!text) return;

        copyText(text).then(function () {
          button.classList.add('copied');
          button.textContent = '已复制';

          setTimeout(function () {
            button.classList.remove('copied');
            button.textContent = '复制';
          }, 2000);
        });
      });
    });
  }

  function setupNavDropdowns() {
    document.querySelectorAll('.navbar-inner').forEach(function (navbar) {
      var trigger = navbar.querySelector('.nav-brand');
      var navLinks = navbar.querySelector('.nav-links');
      if (!trigger || !navLinks) return;

      var dropdown = document.createElement('div');
      dropdown.className = 'nav-dropdown';
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');

      navLinks.querySelectorAll('a, button').forEach(function (item) {
        var dropdownItem = document.createElement('button');
        dropdownItem.type = 'button';
        dropdownItem.className = 'nav-dropdown-item';
        dropdownItem.textContent = item.textContent.trim();

        dropdownItem.addEventListener('click', function () {
          closeDropdown();

          if (item.tagName.toLowerCase() === 'a') {
            var href = item.getAttribute('href');
            var target = item.getAttribute('target');
            if (!href || href === '#') {
              item.click();
              return;
            }
            if (target === '_blank') {
              window.open(href, '_blank', 'noopener');
              return;
            }
            window.location.href = href;
            return;
          }

          item.click();
          dropdownItem.textContent = item.textContent.trim();
        });

        dropdown.appendChild(dropdownItem);
      });

      function openDropdown() {
        dropdown.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }

      function closeDropdown() {
        dropdown.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      }

      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (dropdown.classList.contains('active')) {
          closeDropdown();
        } else {
          openDropdown();
        }
      });

      dropdown.addEventListener('click', function (event) {
        event.stopPropagation();
      });

      document.addEventListener('click', closeDropdown);
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeDropdown();
      });

      navbar.appendChild(dropdown);
    });
  }

  function setupConfirmLinks() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest('[data-confirm]');
      if (!link) return;

      event.preventDefault();
      var message = link.getAttribute('data-confirm');
      if (!confirm(message)) return;

      var href = link.getAttribute('href');
      var target = link.getAttribute('target');
      if (!href || href === '#') return;

      if (target === '_blank') {
        window.open(href, '_blank', 'noopener');
      } else {
        window.location.href = href;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupThemeToggle();
    setupContactModal();
    setupCopyButtons();
    setupConfirmLinks();
    setupNavDropdowns();
  });
})();
