import { jest } from '@jest/globals';
import ApiAdapter from './ApiAdapter.js';


describe('ApiAdapter Constructor', () => {
  it('should set default properties when no parameters are provided', () => {
    const apiAdapter = new ApiAdapter();

    expect(apiAdapter.baseUrl).toBeUndefined();
    expect(apiAdapter.namespace).toBe('api');
    expect(apiAdapter.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(apiAdapter.allowedMethods).toEqual(['GET', 'POST', 'PUT']);
  });

  it('should set custom properties based on provided parameters', () => {
    const params = {
      baseUrl: 'https://example.com',
      namespace: 'customApi',
      allowedMethods: ['DELETE']
    };
    const apiAdapter = new ApiAdapter(params);

    expect(apiAdapter.baseUrl).toBe('https://example.com');
    expect(apiAdapter.namespace).toBe('customApi');
    expect(apiAdapter.headers).toEqual({ 'Content-Type': 'application/json' });
    expect(apiAdapter.allowedMethods).toEqual(['DELETE']);
  });
});

describe('ApiAdapter formatUrl', () => {
  it('should correctly format the URL with default namespace', () => {
    const apiAdapter = new ApiAdapter({ baseUrl: 'https://example.com' });
    const path = 'testPath';
    expect(apiAdapter.formatUrl(path)).toBe('https://example.com/api/testPath');
  });

  it('should correctly format the URL with custom namespace', () => {
    const apiAdapter = new ApiAdapter({ baseUrl: 'https://example.com', namespace: 'customNamespace' });
    const path = 'testPath';
    expect(apiAdapter.formatUrl(path)).toBe('https://example.com/customNamespace/testPath');
  });

  it('should handle leading/trailing slashes appropriately', () => {
    const apiAdapter = new ApiAdapter({ baseUrl: 'https://example.com/', namespace: '/customNamespace/' });
    const path = '/testPath';
    expect(apiAdapter.formatUrl(path)).toBe('https://example.com/customNamespace/testPath');
  });

});

describe('request', () => {
  it('should return an array of objects', async () => {
    const http = new ApiAdapter();
    const path = 'navigation';
    
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([{ id: 1, name: 'Object 1' }, { id: 2, name: 'Object 2' }])
    });
    
    const res = await http.request(path);
    
    expect(res).toEqual([{ id: 1, name: 'Object 1' }, { id: 2, name: 'Object 2' }]);
  });
  
  it('should return null if an error occurs', async () => {
    const http = new ApiAdapter();
    const path = 'badPath';
    
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const res = await http.request(path);
    
    expect(res).toBeNull();
  });
});