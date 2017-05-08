import { Component } from '@angular/core';
import {NavParams,ViewController} from 'ionic-angular';
import {Tasklist} from '@models/Tasklists'

@Component({
  selector: 'task-list-modal',
  templateUrl: 'task-list-modal.html'
})
export class TaskListModal {

  private tasklist: Tasklist;

  /*
  There are 2 use cases, to create an new tasklist or to modify an existing one
   */

  constructor(public params: NavParams, public viewCtrl: ViewController ) {
    if(params.get('tasklist')) {
      this.tasklist = params.get('tasklist');
    } else {
      // Initializes empty Tasklist NOTE:(Probably there is a better way to do this)
      this.tasklist = {
        kind: '',
        id: '',
        etag: '',
        title: '',
        updated: '',
        selfLink: '',
        showDropdown: false,
        tasks: []
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss(this.tasklist);
  }
}
