const DequeAccordion = function () {

  return {

    init: () => {
      DequeAccordion.reset();
      DequeAccordion.listenForToggle();
    },

    reset: () => {
      /**
       * close everything and set all buttons to not pressed
       */
      document.querySelector('.parent').classList.remove('is-open');
      document.querySelector('button').setAttribute('aria-pressed', 'false');
      document.querySelector('button').setAttribute('aria-expanded', 'false');

      DequeAccordion.updateFocusable();
    },

    listenForToggle: () => {
      /**
       * listen for toggles and perform open/close
       * note: enter or space on a button is a click
       */
      const accordion = document.querySelector('.accordion');
      accordion.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;
        const parent = event.target.parentNode;
        const parentClasslist = Array.from(parent.classList);
        const targetClasslist = Array.from(target.classList);
        if (parentClasslist.indexOf('parent') !== -1) {
          if (parentClasslist.indexOf('is-open') !== -1) {
            return DequeAccordion.close(parent, target);
          }
          return DequeAccordion.open(parent, target);
        }
        return false;
      });
    },

    close: (parent, target) => {
      /**
       * close parent menu and reset target
       */
      parent.classList.remove('is-open');
      if (target.nodeName === 'BUTTON') {
        target.setAttribute('aria-pressed', 'false');
        target.setAttribute('aria-expanded', 'false');
      }

      DequeAccordion.updateFocusable();
    },

    open: (parent, target) => {
      /**
       * open parent meny and update target
       */
      parent.classList.add('is-open');
      if (target.nodeName === 'BUTTON') {
        target.setAttribute('aria-pressed', 'true');
        target.setAttribute('aria-expanded', 'true');
      }

      DequeAccordion.updateFocusable();
    },

    updateFocusable: () => {
      /**
       * when menus are closed we want to prevent actions
       */
      const subnavs = document.querySelectorAll('.subnav');

      subnavs.forEach(sub => {
        const parentClasses = Array.from(sub.parentNode.classList);

        let state = true;

        if (parentClasses.indexOf('is-open') !== -1) {
          state = false;
        }

        sub.setAttribute('aria-hidden', (state ? state : 'false'));

        const links = sub.querySelectorAll('a');
        links.forEach(link => {
          link.setAttribute('aria-hidden', (state ? state : 'false'));

          (!state || state === false)
          ? link.removeAttribute('tabindex')
          : link.setAttribute('tabindex', '-1');
        });

        const buttons = sub.querySelectorAll('button');
        buttons.forEach(button => {
          button.setAttribute('aria-hidden', (state ? state : 'false'));

          (!state || state === false)
          ? button.removeAttribute('tabindex')
          : button.setAttribute('tabindex', '-1');
        });
      });
    }
  }
}();