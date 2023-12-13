export default class MockApiAdapter {
  constructor (params = {}) {
    this.baseUrl = params.baseUrl;
    this.namespace = params.namespace || 'api';
    this.headers = {
      'Content-Type': 'application/json'
    };
    this.allowedMethods = params.allowedMethods || ['GET', 'POST', 'PUT'];
  }

  formatUrl (path) {
    return jest.fn().mockReturnValue(`expectedURL/${path}`);
  }

  async request(url) {
    if (url.includes('return-error')) {
      return jest.fn().mockRejectedValue(new Error('Request failed'));
    }

    const res = jest.fn().mockResolvedValue([
      { href: '/home', name: 'Home' },
      { href: '/about', name: 'About' },
    ]);
    return res();
  }
}