import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskListModal } from './task-list-modal';

@NgModule({
  declarations: [
    TaskListModal,
  ],
  imports: [
    IonicPageModule.forChild(TaskListModal),
  ],
  exports: [
    TaskListModal
  ]
})
export class TaskListModalModule {}
