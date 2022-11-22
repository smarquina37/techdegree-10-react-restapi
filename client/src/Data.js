// make the GET and POST requests to the REST API
export default class Data {
  api(path, method, body = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    return fetch(url, options);
  }
  // These methods perform async operations that create and get authenticated user of our app
  // and get course/courses using the api() method
  async getUser() {}
  async createUser() {}
  async getCourses() {}
  async getCourse() {}
}
