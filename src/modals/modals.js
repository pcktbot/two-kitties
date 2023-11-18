class Modals {
  constuctor () {
    this.btns = [];
    this.modals = [];
  }
  
  init () {
    this.btns = document.querySelectorAll('.btn');
    this.modals = Array.from(document.querySelectorAll('.modal'));
    console.log('%c#init %c', 'color: #e15241;', this.modals);
    this.makeButtons();
  }

  makeButtons (btns = this.btns) {
    for (let btn of btns) {
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      console.log('%c#makeButtons, a button has come...', 'color: #e15241;', `id: ${id}, action: ${action}!`);
      const eventHandler = function () {
        if (!action) return console.log('#eventHandler', 'This btn doesn\'t have an action.');
        let modal = this.modal(id);
        if (!modal) {
          console.log('#eventHandler', 'No modal with provided id.');
          modal = this.findParent(btn, '.modal');
          if (!modal) return console.log('#eventHandler', 'No modal found as parent.');
        }

        switch (action) {
          case 'open':
            this.show(modal);
            break;
          case 'cancel':
            this.close(modal);
            break;
          case 'confirm':
            console.log('Confirmed!');
            this.close(modal);
            break;
          default:
            console.log('#eventHandler', 'No method for provided action.');
        }
      }
      btn.addEventListener('click', eventHandler.bind(this));
    }
  }

  findParent (el, selector) {
    console.log('%c#findParent, a parent has come...', 'color: #e15241;', `selector: ${selector}!`);
    let parent = el;
    while (parent) {
      if (parent.matches(selector)) return parent;
      parent = parent.parentElement;
    }
    return null;
  }

  modal (id) {
    if (!id) {
      console.log('%cНе передан id', 'color: #e15241;');
      return null;
    }
    return this.modals.find(modal => modal.id === id);
  }

  show(modal) {
    const align = modal?.dataset?.align;
    const justify = modal?.dataset?.justify;

    let classes;
    if (!align || !justify) {
      console.log('Не переданы align или justify');
      classes = ['align-center', 'justify-center'];
    } else {
      classes = [`align-${align}`, `justify-${justify}`];
    }

    modal.classList.add(...classes);
    modal.classList.remove('hidden');
    const modalBtns = modal.querySelectorAll('.btn');
    this.makeButtons(modalBtns);

  }

  close (modal) {
    modal.classList.add('hidden');
  }
}

const modals = new Modals();
modals.init();