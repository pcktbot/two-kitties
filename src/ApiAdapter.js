export default class ApiAdapter {
  constructor (params = {}) {
    this.baseUrl = params.baseUrl;
    this.namespace = params.namespace || 'api';
    this.headers = {
      'Content-Type': 'application/json'
    };
    this.allowedMethods = params.allowedMethods || ['GET', 'POST', 'PUT'];
  }

  formatUrl (path) {
    return `${this.baseUrl}/${this.namespace}/${path}`;
  }

  async request (url, options = { method: 'GET', headers: this.headers, body: null }) {
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      return json;
    } catch (error) {
      return null;
    }
  }
}