import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  mensajeError: string | null = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { 
    this.formularioLogin = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],  
    })
  }

  ngOnInit() {
  }

  loguearse(){
    if(this.formularioLogin.valid){
      const {username, password} = this.formularioLogin.value;

      this.authService.login(username, password).subscribe(
        // Manejo de respuesta positiva
        (response) => {
          this.authService.insertar_token(response.accessToken)
          this.navCtrl.navigateRoot('/listado-productos') // redirige a pagina productos
          
        },
        (error) => {
          this.mensajeError = "Usuario o contraseña invalida"
        }
      )
    }else{
      this.mensajeError = "Complete todos los campos"
    }
  }

}
