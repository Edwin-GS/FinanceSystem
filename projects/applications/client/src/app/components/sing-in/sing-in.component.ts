import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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

  ngOnInit(): void {

  }

  onSubmit(Form: NgForm): void{
    console.log('Formulario enviado con los siguientes datos:', Form );
  }
}
