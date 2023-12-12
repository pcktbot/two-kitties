import { createEl } from './navigation';

describe('createEl', () => {
  it('should create an element with a valid tag and class selector', () => {
    const test = 'div.test';
    const el = createEl(test);
    expect(el.tagName).toEqual('DIV');
    expect(el.classList.contains('test')).toBe(true);
  });

  it('should create an element with a valid tag and id selector', () => {
    const test = 'div#test';
    const el = createEl(test);
    expect(el.tagName).toEqual('DIV');
    expect(el.id).toEqual('test');
  });

  it('should create an element with a valid tag and no selector', () => {
    const test = 'div';
    const el = createEl(test);
    expect(el.tagName).toEqual('DIV');
  });

  it('should create an element with a valid tag and multiple classes', () => {
    const test = 'div.test.test2.test3';
    const el = createEl(test);
    expect(el.tagName).toEqual('DIV');
    expect(el.classList.contains('test')).toBe(true);
    expect(el.classList.contains('test2')).toBe(true);
    expect(el.classList.contains('test3')).toBe(true);
  });

  it('should create an element with a valid id when more than one provided', () => {
    const test = 'div#test#test2#test3';
    const el = createEl(test);
    expect(el.tagName).toEqual('DIV');
    expect(el.id).toEqual('test');
  });
});