import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Properties } from 'projects/libraries/helpers/src/lib/models/properties.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent {

  constructor(
    private readonly router: ActivatedRoute,
    private readonly hs: HandlerService,
    private readonly nv: Router,
    private toast: HotToastService,
    private usr: UserService
  ){}
  
  pageTitle = 'Propiedades';
  formName: string = 'Profesion'

  userData = this.usr.getLocalStorage();
  baseUrl: string = `${this.userData?.userdata.name}/clientes/${this.userData?.app}`
  
  selection!: Properties
  props: (Properties | undefined)[] = []
  
  action!: string
  id!: string

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.id = params['id']
    })
    this.getProps()
  }

  getProps(): void{
    this.hs.get( `entities/${this.baseUrl}/${ this.id }`)
    .subscribe((res) => {
      if(!res.data) console.log('Hubo un error o no se encontraron datos');
      else{
        this.props = [...res.data.propiedades]
      }
   })
  }

  deleteProp(id: string): void{
    this.hs.delete(`entities/delete/${this.baseUrl}`, id)
      .subscribe((resp) => {
        if(resp["success"] == false ){
          console.log('Error', resp);
          this.toast.error(
            'Error al intentar eliminar, por favor, intente de nuevo'
          );
        } else{
          this.toast.success('Propiedad eliminada');
          console.log('Ok', resp);
          const currentProp = this.props.filter( props => props?._id !== id)
          this.props = [...currentProp]
        }
      })
  }

  selectProp(properties: any ): void {
    this.selection = properties.selection
    this.action = 'Actualizar propiedad'
  }

  goToCreate(){
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
      ${this.userData?.userdata.id}/properties/${this.id}/create`
    ])
  }
  
  clearValues(): void{
    this.selection = {
      _id: '',
      direccion: '',
      descripcion: '',
      numerotitulo: 0,
      clientes_id: ''
    }
    this.action = 'Registrar propiedad'
  }

  goBack(){
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
        ${this.userData?.userdata.id}/clients/details`, this.id
    ])
  }
}
