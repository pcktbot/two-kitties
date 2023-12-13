import {jest} from '@jest/globals';
import ApiAdapter from './ApiAdapter';
import { createEl, loadNav } from './navigation';

jest.mock('./ApiAdapter');

describe('loadNav', () => {
  beforeEach(async () => {
    document.body.innerHTML = '<div class="navigation"></div>';
    // ApiAdapter.mockClear();
    ApiAdapter.prototype.request = jest.fn().mockResolvedValue([
      { href: '/home', name: 'Home' },
      { href: '/about', name: 'About' },
    ]);
  });

  it('should call request with "navigation"', async () => {
    await loadNav();
    const mockApiAdapterInstance = ApiAdapter.mock.instances[0];
    const mockRequest = mockApiAdapterInstance.request;
    expect(mockRequest).toHaveBeenCalledWith('expectedURL');
  });

  it('should append navigation elements to the DOM', async () => {
    await loadNav();
    const nav = document.querySelector('.navigation');
    expect(nav.innerHTML).toContain('<ul class="nav-list">');
    expect(nav.innerHTML).toContain('<li class="nav-item">');
    expect(nav.innerHTML).toContain('<a class="nav-link" href="/home">HOME</a>');
  });

});

describe('createEl', () => {
  it('should create an element with a valid tag and class selector', () => {
    const it = 'div.it';
    const el = createEl(it);
    expect(el.tagName).toEqual('DIV');
    expect(el.classList.contains('it')).toBe(true);
  });

  it('should create an element with a valid tag and id selector', () => {
    const it = 'div#it';
    const el = createEl(it);
    expect(el.tagName).toEqual('DIV');
    expect(el.id).toEqual('it');
  });

  it('should create an element with a valid tag and no selector', () => {
    const it = 'div';
    const el = createEl(it);
    expect(el.tagName).toEqual('DIV');
  });

  it('should create an element with a valid tag and multiple classes', () => {
    const it = 'div.it.it2.it3';
    const el = createEl(it);
    expect(el.tagName).toEqual('DIV');
    expect(el.classList.contains('it')).toBe(true);
    expect(el.classList.contains('it2')).toBe(true);
    expect(el.classList.contains('it3')).toBe(true);
  });

  it('should create an element with a valid id when more than one provided', () => {
    const it = 'div#it#it2#it3';
    const el = createEl(it);
    expect(el.tagName).toEqual('DIV');
    expect(el.id).toEqual('it');
  });
});