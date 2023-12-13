import {jest} from '@jest/globals';
import MockApiAdapter from './ApiAdapter.mock';
import { createEl, loadNav } from './navigation';
import ApiAdapter from './ApiAdapter';

jest.unstable_mockModule('./ApiAdapter', () => {
  return { default: MockApiAdapter };
});

describe('MockApiAdapter', () => {
  it('should return a mock response when request is called', () => {
    const mockResponse = { data: 'mock data' };
    MockApiAdapter.request = jest.fn().mockReturnValue(mockResponse);

    const response = MockApiAdapter.request('navigation');

    expect(response).toEqual(mockResponse);
    expect(MockApiAdapter.request).toHaveBeenCalledWith('navigation');
  });
});

describe('loadNav', () => {
  beforeEach(async () => {
    document.body.innerHTML = '<div class="navigation"></div>';
  });
  
  it('should call request with "navigation"', async () => {
    await loadNav();
    expect(MockApiAdapter).toHaveBeenCalledWith('navigation');
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