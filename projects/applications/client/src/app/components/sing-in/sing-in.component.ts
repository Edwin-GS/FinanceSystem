import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, FormBuilder, Validators, AbstractControl} from '@angular/forms';


interface singIn
{
  email: string,
  password: string, 
}
@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit{
  singIn!: FormGroup;
 // myField = new FormControl;
  showAlert: boolean = false; // Variable para mostrar/ocultar la alerta


  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.singIn = this.initForm();
  }

  
  initForm(): FormGroup {
   return this.fb.group({
      email: ['', 
      [Validators.required, 
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ]],// Validación de correo electrónico)
      password: ['', 
      [Validators.required, 
        Validators.minLength(8),
        this.passwordContainsUppercase]],
        rememberMe: false, // Valor inicial para "Recordarme"
    }
    );
    
  }
  onSubmit(): void {
    if (this.singIn.valid) {
      console.log('Formulario válido. Enviando...');
      
      // Restablecer la variable showAlert a false para ocultar la alerta
      this.showAlert = false;
    } else {
      this.showAlert = true;
    }
  }
  // Función de validación personalizada para contraseña segura
// Función de validación personalizada para al menos una letra mayúscula
  passwordContainsUppercase(control: any): { [key: string]: boolean } | null {
   const password = control.value;
    if (!password) return null;

        // Validar que la contraseña contenga al menos una letra mayúscula
        if (!/[A-Z]/.test(password)) {
        return { 'missingUppercase': true };
    }

    // La contraseña cumple con la validación
      return null;
  }
}