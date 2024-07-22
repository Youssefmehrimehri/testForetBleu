/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../Shared/Services/course.service';
import { course } from 'src/app/Shared/Models/course';

@Component({
  selector: 'app-detail-courses',
  templateUrl: './detail-courses.component.html',
  styleUrls: ['./detail-courses.component.css']
})
export class DetailCoursesComponent implements OnInit {
  courseId:number;
  CoursesDetail:any;
  constructor(private route: ActivatedRoute,
              private router:Router,
              private courseService:CourseService) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.id;

    this.courseService.GetCourseById(this.courseId).subscribe((res:any)=>{
      this.CoursesDetail = res

    })
  }

}
