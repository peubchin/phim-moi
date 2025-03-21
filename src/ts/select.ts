import { querySelectorAll } from './utility';

function run(document: Document) {
  const selectWrapperList = Array.from(
    document.querySelectorAll(
      '.custom-select-wrapper'
    ) as NodeListOf<HTMLElement>
  );
  selectWrapperList.forEach((selectWrapper) => {
    return;
    const select = selectWrapper.querySelector('select') as HTMLSelectElement;
    if (select == null) {
      return;
    }
    selectWrapper.style.width = `${select.offsetWidth}px`;
    select.size = 1;

    select.addEventListener('focus', () => {
      focusSelect(select);
    });
    select.addEventListener('blur', () => {
      blurSelect(select);
    });
    select.addEventListener('mousedown', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName == 'SELECT') {
        e.preventDefault();
      }
      select.focus();
      if (select.size == 1) {
        focusSelect(select);
      }
    });
    select.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName != 'OPTION') {
        return;
      }
      select.blur();
    });
    select.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        blurSelect(select);
        return;
      }
      if (e.key == 'Enter' || e.key == ' ') {
        if (select.size == 1) {
          focusSelect(select);
          return;
        }
        blurSelect(select);
      }
    });
  });

  function focusSelect(select: HTMLSelectElement) {
    select.size = select.childElementCount;
    select.style.padding = '0';
  }

  function blurSelect(select: HTMLSelectElement) {
    select.size = 1;
    select.style.padding = '0.375rem 2.25rem 0.375rem 0.75rem';
  }
}

const select = {
  run,
};

export default select;
