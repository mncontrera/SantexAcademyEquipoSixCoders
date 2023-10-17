import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course/course.service';
import { FilesService } from 'src/app/core/services/user/files.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';


@Component({
  selector: 'app-course-and-payments',
  templateUrl: './course-and-payments.component.html',
  styleUrls: ['./course-and-payments.component.css']
})
export class CourseAndPaymentsComponent implements OnInit {

  courseData:any;

  currentImage:any;
  elemento:any;

  courseImg:any = "";
  courseImgBase:any = "data:image/jpeg;base64,";

  disabledBtn:boolean = false;

  currentCourseId:any;

  lessonsList:any;

  lessonAttendantsList:any;

  // dataSource:any = this.lessonAttendantsList.attendants;
  // dataSource!: attendantElement[];
  displayedColumns: string[] = ['id', 'profilePic', 'name', 'lastname', 'paid', 'actions'];

  userProfileImage:any;
  currentLessonData!: lessonData;

  // dataSource = new MatTableDataSource<attendantElement>(ELEMENT_DATA);
  dataSource:any;

  courseAttendantsList:courseAttendant[] = [];

  constructor(
    private router: Router,
    private courseService: CourseService,
    private fileService: FilesService,
  ) {
    this.currentCourseId = localStorage.getItem('currentProfessorCourseId');
    this.currentLessonData = {
      id: 1,
      lessonTitle: "",
      description: "",
      courseId: 1,
      lessonDateTime: '',
    }
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  @ViewChild('empTbSort') empTbSort = new MatSort();

  //??
  @ViewChild('empTbSortWithObject') empTbSortWithObject = new MatSort();

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.dataSource.sort = this.empTbSort;
    // this.dataSourceWithObjectColumn.sort = this.empTbSortWithObject;
  }

  ngOnInit(): void {
    this.currentImage = '../../../../../assets/defaultcourse.jpg';
    try {
      this.courseService.getProfessorCourse().subscribe({
        next: (res) => {
          this.courseData = res.course;
          // console.log("course data response")
          // console.log(res);

          localStorage.setItem('currentTeacherCourseId', this.courseData.id);

          let newImgStr = this.fileService.arrayBufferToBase64(this.courseData.image.data)
          if(this.courseData.image){
            this.currentImage = "data:image/jpeg;base64," + newImgStr;
          }else{
            this.currentImage = '../../../../../assets/profile-pic-placeholder.jpeg';
          }

          this.lessonsList = res.lessons;

          // console.log(this.lessonAttendantsList);

          // this.dataSource = res.lessons;
        },
        error: (errorData) => {
          console.log(errorData);
          throw "Error en la peticion";
        },
        complete: () => {
          console.log("peticion completada")
        }
      })

      // let currentLesson = localStorage.getItem('currentLessonId');
      // this.attendanceService.getLessonAttendants(currentLesson).subscribe({
      //   next: (res) => {
      //     this.lessonAttendantsList = res.attendants;
      //     // console.log(res)
      //     for (let index = 0; index < this.lessonAttendantsList.length; index++) {
      //       const element = this.lessonAttendantsList[index];

      //       if(this.lessonAttendantsList[index].userImage) {
      //         this.lessonAttendantsList[index].userImage = "data:image/jpeg;base64," + this.fileService.arrayBufferToBase64(element.userImage.data);
      //       }
      //     }


      //     // this.dataSource = new MatTableDataSource<attendantElement>(this.lessonAttendantsList);
      //     // console.log(this.dataSource.data[0])
      //     // this.dataSource.paginator = this.paginator;
      //     // this.empTbSort.disableClear = true;
      //     // this.dataSource.sort = this.empTbSort;
      //     // this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      //     //   if (typeof data[sortHeaderId] === 'string') {
      //     //     return data[sortHeaderId].toLocaleLowerCase();
      //     //   }

      //     //   return data[sortHeaderId];
      //     // };
      //   },
      //   error: (errorData) => {
      //     console.log(errorData);
      //     throw "Error en la peticion";
      //   },
      //   complete: () => {
      //     console.log("peticion completada")
      //   }
      // })

      this.courseService.getStudentPayments().subscribe({
        next: (res) => {
          console.log("AAAAAAAAAAAAAAA response from student payments")
          console.log(res);
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            this.courseAttendantsList.push(element.UserEnrollments);
            this.courseAttendantsList[index].paid = element.paid;
            // this.courseAttendantsList[index].userId = element.id;
          }
          console.log(this.courseAttendantsList)
          for (let index = 0; index < this.courseAttendantsList.length; index++) {
            const element = this.courseAttendantsList[index];

            if(this.courseAttendantsList[index].image) {
              this.courseAttendantsList[index].image = "data:image/jpeg;base64," + this.fileService.arrayBufferToBase64(element.image.data);
            }
          }
          console.log(this.courseAttendantsList)

          this.dataSource = new MatTableDataSource<courseAttendant>(this.courseAttendantsList);
          this.dataSource.paginator = this.paginator;
          this.empTbSort.disableClear = true;
          this.dataSource.sort = this.empTbSort;
          this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
            if (typeof data[sortHeaderId] === 'string') {
              return data[sortHeaderId].toLocaleLowerCase();
            }

            return data[sortHeaderId];
          };
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  deleteCourse(){
    try {
      this.courseService.deleteCourse().subscribe({
        next: (res) => {
          console.log(res);
        }
      })
    } catch (error) {

    }
  }

  markPayment(userId:any) {
    const courseId = this.courseData.id
    let reqBody = {
      courseId,
      userId
    }
    try {
      this.courseService.markPayment(reqBody).subscribe({
        next: (res) => {
          console.log(res);
          // this.dataSource.data[0].name = "asdasdasd";
          // this.dataSource.data.map((x:any) => console.log(x.userId));

          this.dataSource.data.map((item: any) => {if (item.id === res.userId) {item.paid = res.paid} });

          console.log(this.dataSource.data)
        },
        error: (errorData) => {
          console.log(errorData);
          throw "Error en la peticion de marcar asistencia";
        },
        complete: () => {
          console.log("peticion de marcar asistencia se completado exitosamente")
        }
      })
    } catch (error) {

    }
  }

  // announceSortChange(sortState: Sort) {
  //   // This example uses English messages. If your application supports
  //   // multiple language, you would internationalize these strings.
  //   // Furthermore, you can customize the message to add additional
  //   // details about the values being sorted.
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

  sortData(sort: Sort) {
    // this.searchResults$ = this.searchResults$.pipe(map(results => {
        // sort the results like in examples
    // }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export interface attendantElement {
  attended: boolean;
  id: number;
  lastname: string;
  lessonId: string;
  name: string;
  userId: number;
  userImage: any;
}

export interface lessonData {
  id: number,
  lessonTitle: string,
  description: string,
  courseId: number,
  lessonDateTime: string,
}

const ELEMENT_DATA: attendantElement[] = [
  {attended: true, id: 1, name: 'Hydrogen', lastname: "asd", lessonId: "3", userId: 1, userImage: "a"},
  {attended: false, id: 2, name: 'acio', lastname: "qwe", lessonId: "4", userId: 3, userImage: "ab"},
  {attended: false, id: 4, name: 'ecio', lastname: "qwe", lessonId: "4", userId: 5, userImage: "ab"},
]

export interface courseAttendant {
  paid: any;
  lastname: string;
  name: string;
  id: number;
  image: any;
  telephone: string;
}
