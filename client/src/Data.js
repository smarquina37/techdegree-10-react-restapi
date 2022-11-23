import config from "./config";
import { UpdateCourse } from "./components/UpdateCourse";

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
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
    if (requiresAuth) {
    }

    return fetch(url, options);
  }
  // GET User
  async getUser() {
    const response = await this.api(`/users`, "GET", null);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  // Create User
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  // GET all courses
  async getCourses() {
    const response = await this.api(`/courses`, "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }
  //GET a Course
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }
  //DELETE a Course
  async deleteCourse(id) {
    const response = await this.api(`/courses/${id}`, "DELETE");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }
  async UpdateCourse(id, data) {
    const response = await this.api(`/courses/${id}`, "PUT", null);
    if (response.status === 200) {
      return response.json().then((data) => {
        console.warn(data);
      });
      // } else if (response.status === 401) {
      //   return null;
    } else {
      throw new Error();
    }
  }
}
