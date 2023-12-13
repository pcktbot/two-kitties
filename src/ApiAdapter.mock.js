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

  async request (fail = false) {
    if (fail) {
      return jest.fn().mockRejectedValue(new Error('Request failed'));
    }
    return jest.fn().mockResolvedValue([
      { href: '/home', name: 'Home' },
      { href: '/about', name: 'About' },
    ]);
  }
}