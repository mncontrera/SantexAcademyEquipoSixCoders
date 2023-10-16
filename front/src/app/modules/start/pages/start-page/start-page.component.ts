import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showSomething() {
    console.log("holaaaaaaaa")
  }

  watchCourseById(teacherId: any){
    console.log("hola"+teacherId)
    localStorage.setItem('currentCourseId', teacherId);
    console.log("holaaaaaaaa")
  }

}
