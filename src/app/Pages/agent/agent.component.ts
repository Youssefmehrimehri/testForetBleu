import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from 'src/app/Shared/Services/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  Agents: any ;
  page: number = 1;
  pageSize: number = 10;
  totalPages: number=0;

  constructor(private router:Router,
              private spinner: NgxSpinnerService,
              private agentService:AgentService,
              private toastr: ToastrService,
              ) { }

  ngOnInit(): void {
    //this.spinner.show();
    this.getAllAgents()
  }
blockAgent(agent:any){
  this.agentService.deleteAgent(agent.id).subscribe((res:any)=>{
    this.toastr.success(`L'agent  "${agent.first_name}"  a été supprimé avec succés`)
this.getAllAgents()
  })

}
  getAllAgents(){
    this.agentService.getAllAgents(this.page-1,this.pageSize).subscribe((res:any)=>{
      //let startFrom = new Date().getTime();
      // console.log(res,'res')
      this.Agents=res.data.content
      this.totalPages =  res.data.totalElements
      /*setTimeout(() => {
         spinner ends after 5 seconds
        this.spinner.hide();
      }, new Date().getTime() - startFrom);*/
    })
  }

  handlePageChange(event) {
    this.page = event;
    this.getAllAgents();
  }

  updateAction(agent: any) {
    this.agentService.setSharedData(agent);

    this.router.navigate(['agent/update/'+agent.id])
  }

  AddAgent() {
    this.router.navigate(['agent/add'])
  }

}
