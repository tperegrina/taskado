import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import {AuthenticationStoreProvider} from "./authentication-store-provider";
import {TasklistResponse} from "@models/TasklistResponse";

/*
  Implements Google API rest services
  Possible Upgrades: ]
  - All requests are using the same Headers
  - Multiple Urls are similar they should share a builder
  - Use method to build body section of the request
*/
@Injectable()
export class GoogleTasksProvider {
  private baseUrl = 'https://www.googleapis.com/tasks/v1/';
  private listTaskListsUrl = 'users/@me/lists';
  private authTokenSubs: Subscription;
  private authToken: string;

  constructor(public http: Http, private authenticationStore: AuthenticationStoreProvider) {
    console.debug('GoogleTasksProvider');
    this.authTokenSubs = this.authenticationStore.getAuthToken().subscribe(
      (token) => {
        this.authToken = token;
      }
    );
  }

  public listTaskLists() : Observable<TasklistResponse> {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authToken});
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseUrl + this.listTaskListsUrl, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  public insertTaskList(taskListTitle) : Observable<any> {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authToken});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + this.listTaskListsUrl, {"title": taskListTitle}, options)
      .map((res:Response) => res.json())
      .catch((error:Response) => Observable.throw(error.json().error || 'Server Error'));
  }

  public updateTaskList(taskListData) : Observable<any> {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authToken});
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.baseUrl + this.listTaskListsUrl + '/' + taskListData.id, {"id":taskListData.id,"title":taskListData.title}, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  public deleteTaskList(taskListId) : Observable<any> {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authToken});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(this.baseUrl + this.listTaskListsUrl + '/' + taskListId, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  public listTasks(parentListId) : Observable<any> {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authToken});
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.baseUrl + 'lists/' + parentListId + '/tasks', options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  public insertTask(task, parentListId) : Observable<any> {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authToken});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.baseUrl + 'lists/' + parentListId + '/tasks', {"title": task.title, "notes": task.notes}, options)
      .map((res:Response) => res.json())
      .catch((error:Response) => Observable.throw(error.json().error || 'Server Error'));
  }

  public updateTask(task) : Observable<any> {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authToken});
    let options = new RequestOptions({headers: headers});
    return this.http.put(task.selfLink, {"id": task.id, "title": task.title, "notes": task.notes}, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  public deleteTask(taskUrl) : Observable<any> {
    let headers = new Headers({'Authorization': 'Bearer ' + this.authToken});
    let options = new RequestOptions({headers: headers});
    return this.http.delete(taskUrl, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }




}
