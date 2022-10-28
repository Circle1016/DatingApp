import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {}
  users: any;

  constructor(public accountService: AccountService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {


  }

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe(response =>{
      this.router.navigateByUrl('/members');
      
    }, error =>{
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
 


}

