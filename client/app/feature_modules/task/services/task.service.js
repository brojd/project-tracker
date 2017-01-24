import { Injectable } from '@angular/core';
import { HttpWrapper } from '../../../core/services/HttpWrapper.service';
import { API_URL } from '../../../../config';

@Injectable()
export default class TaskService {
  
  constructor(http: HttpWrapper) {
    this._http = http;
  }
  
  getTask(id) {
    return this._http
      .get(`${API_URL}/tasks/${id}`)
      .map(res => res.json());
  }
  
  getAllProjects() {
    return this._http
      .get(`${API_URL}/projects`)
      .map(res => res.json());
  }
  
  getAllEmployees() {
    return this._http
      .get(`${API_URL}/employees`)
      .map(res => res.json());
  }
  
  saveNewTask(task) {
    return this._http
      .post(`${API_URL}/tasks`, task)
      .map(res => res.json());
  }
  
  deleteTask(id) {
    return this._http
      .delete(`${API_URL}/tasks/${id}`)
      .map(res => res.json());
  }
  
  updateTask(task) {
    return this._http
      .put(`${API_URL}/tasks`, task)
      .map(res => res.json());
  }
  
}
