import { jest } from '@jest/globals';
import ApiAdapter from './ApiAdapter.js';

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