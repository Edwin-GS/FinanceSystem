import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private readonly hs: HandlerService,
    private toast: HotToastService,
    private usr: UserService,
    private fb: FormBuilder
  ){}
  
  userData = this.usr.getLocalStorage();
  baseUrl: string = `${this.userData?.userdata.name}/propiedades/${this.userData?.app}`
  pageTitle = 'Propiedades';
  formName: string = 'Profesion'
  selection!: Properties
  props: (Properties | undefined)[] = []
  success: boolean = false
  error: boolean = false
  action!: string
  registerForm!: FormGroup

  ngOnInit(): void {
    this.getProps()
    this.registerForm = this.initForm()
  }

  initForm(): FormGroup{
    return this.fb.group({
      direccion: [this.selection?.direccion, [Validators.required, Validators.minLength(7)]],
      descripcion: [this.selection?.descripcion, [Validators.required, Validators.minLength(7)]],
      numerotitulo: [this.selection?.numerotitulo, [Validators.required, Validators.min(1)]],
      nombrepropietario: [this.selection?.nombrepropietario, [Validators.required, Validators.minLength(3)]]
    })
  }

  getProps(): void{
    this.hs.get( `entities/${this.baseUrl}` )
    .subscribe((res) => {
      if(!res.data) console.log('Hubo un error o no se encontraron datos');
      else{
        this.props = [...res.data]
      }
   })
  }

  createProp ( prop: Properties ): void {
    const data = {
      direccion         : prop.direccion,
      descripcion       : prop.descripcion,
      numerotitulo      : prop.numerotitulo,
      nombrepropietario : prop.nombrepropietario
    }
    
    this.hs.post(data, `entities/create/${this.baseUrl}`)
      .subscribe((res) => {
        if ( res['success'] == false ) {
          this.toast.error(
            'Error al intentar registrar, por favor, intente de nuevo'
          );
          console.log('Error', res);
        } else {
          this.toast.success('Propiedad registrada');
          console.log('OK');
          const resp: Properties = { 
            _id               : res.data._id, 
            direccion         : prop.direccion,
            descripcion       : prop.descripcion,
            numerotitulo      : prop.numerotitulo,
            nombrepropietario : prop.nombrepropietario
          }
          // console.log('resp', resp);
          this.props?.push(resp)
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

  updateProp( properties: Properties | undefined ): void{
    this.hs.put(properties , `entities/update/${this.baseUrl}/${properties?._id}`)
      .subscribe((resp: any) => {
        if ( resp['success'] == false ) {
          console.log('resp', resp);
          this.toast.error(
            'Error al intentar actualizar, por favor, intente de nuevo'
          );
        } else {
          console.log('resp', resp);
          this.toast.success('Propiedad actualizada');
          const currentProps = this.props.filter((items) => items?._id !== properties?._id)
          this.props = [...currentProps, properties]
        }
      })
  }

  selectProp(properties: any ): void {
    this.registerForm = this.initForm()
    this.selection = properties.selection
    this.action = 'Actualizar propiedad'
  }

  showSucessMessage(): void{
    this.success = true
    setTimeout(() => {
      this.success = false
    }, 5000);
  }

  showErrorMessage(): void{
    this.error = true
    setTimeout(() => {
      this.error = false
    }, 5000);
  }

  clearValues(): void{
    this.selection = {
      _id: '',
      direccion: '',
      descripcion: '',
      numerotitulo: 0,
      nombrepropietario: ''
    }
    this.action = 'Registrar propiedad'
  }
}
