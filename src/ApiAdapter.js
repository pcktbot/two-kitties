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
    path = path.replace(/^\/|\/$/g, '');
    if (this.baseUrl.endsWith('/')) {
      this.baseUrl = this.baseUrl.slice(0, -1);
    }
    if (this.namespace.startsWith('/')) {
      this.namespace = this.namespace.slice(1);
    }
    if (this.namespace.endsWith('/')) {
      this.namespace = this.namespace.slice(0, -1);
    }
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