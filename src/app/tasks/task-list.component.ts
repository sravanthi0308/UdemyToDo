import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Route } from '@angular/router';
import { TaskItem } from './task-item.dto';
import { NewTask } from './new-task.dto';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit  {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
    )
    {

  }



  //Service = new TaskService();
  tasks = this.taskService.getAllTasks(this.route.snapshot.params['date']);




  newTask: NewTask = new NewTask();
  // date: Date = new Date();

  ngOnInit(): void {
    var strDate = this.route.snapshot.params['date'];
     this.newTask = new NewTask(this.newTask.title,new Date(strDate));
    // console.log(date);
  }





  // tasks : TaskItem[] = [
  //   new TaskItem("Visit Ann"),
  //   new TaskItem("Call dad"),
  //   new TaskItem("Go to the gym"),
  //   new TaskItem("Wash the dishes"),
  //   new TaskItem("Shop for the party")
  // ]

 add(taskNgForm: NgForm ){

  if(taskNgForm.touched == false)
  return;

  this.taskService.addTask(this.newTask.date,this.newTask);
  // this.tasks = this.taskService.getAllTasks();

  taskNgForm.reset({date: this.newTask.date})
 }

 remove(existingTask: TaskItem){
  var userConfirmed = confirm(`Are you sure you want to remove following task? \n "${existingTask.title}"`)

  if(userConfirmed){
    this.taskService.removeTask(this.newTask.date,existingTask);
    // this.tasks = this.taskService.getAllTasks();
  }

 }
 toggleIsDone(task : TaskItem){
//alert('The task : "'+task+'" is done')
task.isDone = !task.isDone;
 }
}

