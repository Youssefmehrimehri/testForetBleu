/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../Shared/Services/course.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { course } from 'src/app/Shared/Models/course';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from 'src/app/Shared/Services/storage.service';
import { AuthService } from 'src/app/Shared/Services/auth.service';
@Component({
  selector: 'app-consulter-courses',
  templateUrl: './consulter-courses.component.html',
  styleUrls: ['./consulter-courses.component.css'],
})
export class ConsulterCoursesComponent implements OnInit {
  Courses: course[] = [];
  page: number = 1;
  pageSize: number = 10;
  firstName = 'firstName';
  totalPages: number = 0;
  FiltreStart: boolean = false;
  ispopUpShow: boolean = false;
  StatusValue: any;
  dataRefresher: any;
  SearchStart: boolean = false;
  SearchValue: any;
  CourseObject: any;
  nomAgence: string;
  nameAgency = 'intitule';
  CourseInCurrentDay: number;
  agencyInput = '';
  agencyId!: number;
  agent: any;
  agentForagent: any;
  agentId!: number;
  agentForagentId!: number;
  FiltreShow: boolean = false;
  public daterange: any = {};
  agence: any;
  helper = new JwtHelperService();
  selectDate = '';
  agentShow = '';
  agentForAgentShow = '';
  roleLibelle = '';
  constructor(
    private courseService: CourseService,
    private router: Router,
    private toastr: ToastrService,
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getRole();

    if (this.hasRequiredRole('ENTREPRISE_ADMIN')) {
      this.getAllagent();
    }
    // console.log(this.selectDate, 'selectDate');
    this.getAllregion();
    this.getAllCourses();
    this.getCurrentDay();
    this.nomAgence = localStorage.getItem('nomAgence');
  }
  public options: any = {
    timePicker: true,
    timePicker24Hour: true,
    locale: {
      format: 'DD/MM/yyyy',
      separator: '  ',
      applyLabel: 'Filtrer',
      cancelLabel: 'Annuler',
      fromLabel: 'From',
      toLabel: 'To',
      customRangeLabel: 'Custom',
      weekLabel: 'W',
      daysOfWeek: ['Di', 'Lu', 'Ma', 'Mer', 'Jeu', 'Ven', 'Sa'],
      monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ],
      firstDay: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
  };
  getAllagent() {
    this.courseService.getAllAgent().subscribe((res: any) => {
      // console.log(res, 'agents');
      this.agentForagent = res.data;
    });
  }

  getRole() {
    this.authService
      .getInfoUser(String(localStorage.getItem('token')))
      .subscribe((resData: any) => {
        this.roleLibelle = resData.data.role[0].libelle;
      });
  }
  hasRequiredRole(requiredRole: string): boolean {
    const decodedPayload = this.helper.decodeToken(
      this.storageService.getToken()
    );
    localStorage.setItem('agentId', decodedPayload.agent_id);
    // console.log(decodedPayload.iss,'ydy')
    return this.roleLibelle === requiredRole;
  }
  resetData() {
    let event = {
      id: this.agencyId,
    };
    this.agencyInputs(event);
    this.agentShow = '';
  }
  resetDataAgency() {
    this.getAllregion();
    this.getAllCourses();
    this.getCurrentDay();
    this.agencyInput = '';

    this.agentShow = '';
  }
  agencyInputs(event: any) {
    this.agencyInput = 'youssef';
    // console.log(event.id, 'eventAgency');
    this.agencyId = event.id;
    this.getAllagentAgency(this.agencyId);
    this.courseService
      .getCourseFilterAgence(event.id, this.page - 1, this.pageSize)
      .subscribe((res: any) => {
        this.Courses = res.data.content;
        this.totalPages = res.data.totalElements;

        this.CourseInCurrentDay = res.data.totalElements;
      });
  }
  onFocusedAgency(event: any) {}

  agentInputs(event: any) {
    this.agentShow = 'true';
    // console.log(event, 'event');
    this.agentId = event.id;
    this.courseService
      .getCourseFilterAgentAgence(event.id, this.page - 1, this.pageSize)
      .subscribe((res: any) => {
        this.Courses = res.data.content;
        this.totalPages = res.data.totalElements;
        this.CourseInCurrentDay = res.data.totalElements;
      });
  }
  onFocusedAgent(event: any) {}
  agentForagentInputs(event: any) {
    this.agentForAgentShow = 'youssef';
    this.agentForagentId = event.id;
    this.courseService
      .getCourseFilterOnlyAgent(
        this.agentForagentId,
        this.page - 1,
        this.pageSize
      )
      .subscribe((res: any) => {
        this.Courses = res.data.content;
        this.totalPages = res.data.totalElements;
        this.CourseInCurrentDay = res.data.totalElements;
      });
  }
  resetDataAgentForAgent() {
    this.getCurrentDay();
    this.getAllCourses();
    this.agentForAgentShow = '';
    this.agentForagent = '';
  }

  onFocusedagentForagent(event: any) {}

  getAllagentAgency(agenceId: number) {
    this.courseService.getAgencyAgent(agenceId).subscribe((res: any) => {
      // console.log(res, 'agent');
      this.agent = res.data;
    });
  }

  getAllregion() {
    this.courseService.getallregion().subscribe((res: any) => {
      // console.log(res, 'res');
      this.agence = res.data;
    });
  }
  calendarCanceled(e: any) {
    this.selectDate = '';
    this.getAllCourses();
    this.getCurrentDay();
    this.options.locale.startDate = moment(String(new Date()));
    this.options.locale.endDate = moment(String(new Date()));
  }
  public selectedDate(value: any, datepicker?: any) {
    this.selectDate = 'youssef';
    // this is the date  selected
    // console.log(this.selectDate, 'date');
    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // use passed valuable to update state
    this.daterange.start = formatDate(
      value.start.toDate(),
      'MM/dd/yyyy HH:mm:ss',
      'en_US'
    );
    this.daterange.end = formatDate(
      value.end.toDate(),
      'MM/dd/yyyy HH:mm:ss',
      'en_US'
    );

    this.daterange.label = value.label;
    if (this.agentId && this.hasRequiredRole('ENTREPRISE_SUPER_ADMIN')) {
      // console.log('DateSuper');

      this.courseService
        .getAllCoursesFiltreDateAgentAgence(
          this.page - 1,
          this.pageSize,
          String(this.daterange.start),
          String(this.daterange.end),
          this.agentId
        )
        .subscribe((res: any) => {
          if (res.code == 200) {
            // console.log(res, 'Date');
            this.Courses = res.data.content;
            this.totalPages = res.data.totalElements;
            this.CourseInCurrentDay = res.data.totalElements;
          } else {
            this.toastr.error("une erreur s'est produite ", 'Erreur', {
              closeButton: true,
            });
          }
        });
    }
    if (this.agentForagentId && this.hasRequiredRole('ENTREPRISE_ADMIN')) {
      // console.log('DateAdmin');

      this.courseService
        .getAllCoursesFiltreDateAgentAgence(
          this.page - 1,
          this.pageSize,
          String(this.daterange.start),
          String(this.daterange.end),
          this.agentForagentId
        )
        .subscribe((res: any) => {
          if (res.code == 200) {
            this.Courses = res.data.content;
            this.totalPages = res.data.totalElements;
            this.CourseInCurrentDay = res.data.totalElements;
          } else {
            this.toastr.error("une erreur s'est produite", 'Erreur', {
              closeButton: true,
            });
          }
        });
    } else {
      // console.log('Agent');

      this.courseService
        .getAllCoursesFiltreDate(
          this.page - 1,
          this.pageSize,
          String(this.daterange.end),
          String(this.daterange.start),
      
        )
        .subscribe((res: any) => {
          if (res.code == 200) {
            this.Courses = res.data.content;
            this.totalPages = res.data.totalElements;
            this.CourseInCurrentDay = res.data.totalElements;
          } else {
            this.toastr.error("une erreur s'est produite ", 'Erreur', {
              closeButton: true,
            });
          }
        });
    }
  }
  refreshData() {
    this.dataRefresher = setInterval(() => {
      this.getAllCourses();
      //this.getStats();
    }, 20000);
  }
  getCurrentDay() {
    this.courseService.getCourseCurrentDay().subscribe((res: any) => {
      // console.log(res, 'currentDay');
      this.CourseInCurrentDay = res.data;
    });
  }
  getAllCourses() {
    this.courseService
      .GetCourseByClientId(this.page - 1, this.pageSize)
      .subscribe((res: any) => {
        // console.log(res, 'res');
        res.data.content.forEach((e: any) => {});
        this.Courses = res.data.content;
        this.totalPages = res.data.totalElements;
      });
  }
  calculateDateDifference(date1: any, date2: any): string {
    const beginDate = moment(date1);
    const endDate = moment(date2);

    const timeDifference = moment.duration(endDate.diff(beginDate));
    const seconds = timeDifference.asSeconds();

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const diff = hours + ':' + minutes + ':' + remainingSeconds;
    if (isNaN(hours) || isNaN(minutes) || isNaN(remainingSeconds)) {
      return null;
    } else {
      return diff;
    }
  }
  ShowFiltres() {
    if (this.FiltreShow) {
      this.StatusValue = 'Tous';
      this.getAllCourses();
    }
    this.FiltreShow = !this.FiltreShow;
  }

  ShowDetail(id: any, course: any) {
    this.CourseObject = course;
    this.ispopUpShow = true;
  }

  filtreData() {
    this.courseService
      .GetCourseByClientIdAndStatus(
        this.page - 1,
        this.pageSize,
        this.StatusValue
      )
      .subscribe((res: any) => {
        this.Courses = res.data.content;
        this.totalPages = res.data.totalElements;
      });
  }

  handlePageChange(event) {
    this.page = event;
    if (this.FiltreStart) {
      this.filtreData();
    } else if (this.SearchStart) {
      this.ngOnDestroy();
    } else {
      this.getAllCourses();
    }
  }
  getSearch() {
    this.courseService
      .SearchCourses(this.page - 1, this.pageSize, this.SearchValue)
      .subscribe((res: any) => {
        this.Courses = res.data.content;
        this.totalPages = res.data.totalElements;
      });
  }
  OnChangeStatus(event: any) {
    this.StatusValue = event.target.value;

    if (this.StatusValue == 'Tous') {
      this.getAllCourses();
      this.FiltreStart = false;
    } else {
      this.FiltreStart = true;
      //this.page= 1;
      this.ngOnDestroy();
      this.filtreData();
    }
  }

  ngOnDestroy() {
    clearInterval(this.dataRefresher);
  }

  changeSearch(event: any) {
    this.SearchValue = event.target.value;
    this.SearchStart = true;
    if (this.SearchValue == '') {
      this.ngOnInit();
      this.SearchStart = false;
      this.page = 1;
    } else {
      this.ngOnDestroy();
      this.SearchStart == true;
      this.getSearch();
    }
  }

  close() {
    this.ispopUpShow = false;
    this.CourseObject = {};
  }
}
