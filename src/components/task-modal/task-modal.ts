import { Component } from '@angular/core';
import {NavParams,ViewController} from 'ionic-angular';
import {Task} from '@models/Task'

@Component({
  selector: 'task-modal',
  templateUrl: 'task-modal.html'
})
export class TaskModal {

  private task: Task;

  /*
  There are 2 use cases to create an empty Task or to modify an existing one
   */

  constructor(public params: NavParams, public viewCtrl: ViewController ) {
    if(params.get('task')) {
      this.task = params.get('task');
    } else {
      // Initializes empty Tasklist NOTE:(Probably there is a better way to do this)
      this.task = {
        kind: '',
        id: '',
        etag: '',
        title: '',
        updated: '',
        selfLink: '',
        parent: '',
        position: '',
        notes: '',
        status: '',
        due: '',
        completed: '',
        deleted: '',
        hidden: false
      };
    }
  }

  dismiss() {
    this.viewCtrl.dismiss(this.task);
  }
}
