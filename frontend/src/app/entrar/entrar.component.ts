import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2'
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    localStorage.clear()
  }

  entrar(){
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp
      environment.id = this.userLogin.id
      environment.nome = this.userLogin.nome
      environment.token = this.userLogin.token
      environment.tipoParceiro = this.userLogin.tipoParceiro
      environment.tipoDoador = this.userLogin.tipoDoador

      if(this.userLogin.tipoParceiro == false){
        this.router.navigate (['/home'])
      } else {
        this.router.navigate (['meus-produtos'])
      }
      

    },error=>{
      if( error.status == 500 ){
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Usuário ou senha incorretos!'
        })

    }}
    )
  }

}

