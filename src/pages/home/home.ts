import {Component, OnDestroy} from '@angular/core';
import {NavController,ModalController} from 'ionic-angular';
import {Subscription} from 'rxjs';
import {TaskListModal} from '../../components/task-list-modal/task-list-modal';
import {ConfirmDeleteModal} from '../../components/confirm-delete-modal/confirm-delete-modal';
import {TaskModal} from '../../components/task-modal/task-modal';
import {ProfileStoreProvider} from '../../providers/profile-store-provider';
import {AuthenticationStoreProvider} from '../../providers/authentication-store-provider';
import {GoogleTasksProvider} from '../../providers/google-tasks-provider';
import {Profile} from '@models/Profile'
import {TasklistResponse} from '@models/TasklistResponse'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {
  public userProfile: Profile;
  public isUserLoggedIn: boolean;
  private subscription: Subscription;
  private taskListSubscription: Subscription;
  private loggedInSubscription: Subscription;
  public tasklists: TasklistResponse;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
              private profileStore: ProfileStoreProvider, private googleTasks: GoogleTasksProvider,
              private authenticationStore: AuthenticationStoreProvider) {

    this.subscription = this.profileStore.getProfile().subscribe(
      (profile) => {
        this.userProfile = profile;

      }
    );

    this.loggedInSubscription = this.authenticationStore.isLoggedIn().subscribe(
      (isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
        //As soon as user is logged in we fetch the Tasks
        this.updateTaskLists();
      }
    );

  }
  // Fetches Tasklists and tasks  associated with each tasklist
  private updateTaskLists() {
    this.taskListSubscription = this.googleTasks.listTaskLists().subscribe(
      (tasklists) => {
        this.tasklists = tasklists;
        // When we have a TasklistResponse we need to do 2 things
        for (let _i = 0; _i < tasklists.items.length; _i++ ) {
          // 1- Initialize the dropdownFunctionality
          tasklists.items[_i].showDropdown = false;
          // 2 - Fetch the tasks associated with each tasklist
          this.googleTasks.listTasks(tasklists.items[_i].id).subscribe(
            (tasks) => {
              this.tasklists.items[_i].tasks = tasks;

            })
        }
      })
  }

  // Update tasklist to show or hide the tasks accordion
  public toggleDropdown(tasklist) {
    if (tasklist.showDropdown) {
      tasklist.showDropdown = false;
    } else {
      tasklist.showDropdown = true;
    }
  }

  //Tasklist Actions
  public getTasklists() {
    this.updateTaskLists();
  }

  public createTaskList() {
    let taskListModal = this.modalCtrl.create(TaskListModal);
    taskListModal.onDidDismiss(data => {
      if(data) {
        this.taskListSubscription = this.googleTasks.insertTaskList(data.title).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            // TODO show error message
          },
          () => {
            this.updateTaskLists();
          })
      }
    });
    taskListModal.present();
  }

  public deleteTaskList(id:string) {
    let deleteTaskListModal = this.modalCtrl.create(ConfirmDeleteModal, {},  {cssClass: 'deleteModal'});
    deleteTaskListModal.onDidDismiss((accepted: boolean) => {
      if (accepted) {
        this.googleTasks.deleteTaskList(id).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            // TODO show error message
          },
          () => {
            this.updateTaskLists();
          }
        )
      }
    });
    deleteTaskListModal.present();
  }

  public editTaskList(tasklist) {
    let updateTasklistModal = this.modalCtrl.create(TaskListModal, {tasklist: tasklist});
      updateTasklistModal.onDidDismiss((data) => {
        if(data) {
          this.googleTasks.updateTaskList(data).subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              // TODO show error message
            },
            () => {
              this.updateTaskLists();
            })
        }
      });
      updateTasklistModal.present();
  }

  //Task actions, note that we dont have a getTask implementation, that is done by updateTasklists
  public createTask(taskListId) {
    let createTaskModal = this.modalCtrl.create(TaskModal);
    createTaskModal.onDidDismiss(task => {
      if(task) {
        this.googleTasks.insertTask(task, taskListId).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            // TODO show error message
          },
          () => {
            this.updateTaskLists();
          })
      }
    })
    createTaskModal.present();
  }

  public editTask(task) {
    let updateTasklistModal = this.modalCtrl.create(TaskModal, {task: task});
    updateTasklistModal.onDidDismiss((data) => {
      if(data) {
        this.googleTasks.updateTask(data).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            // TODO show error message
          },
          () => {
            this.updateTaskLists();
          })
      }
    });
    updateTasklistModal.present();
  }

  public deleteTask(selfUrl:string) {
    this.googleTasks.deleteTask(selfUrl).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        // TODO show error message
      },
      () => {
        this.updateTaskLists();
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.taskListSubscription.unsubscribe();
  }

}
