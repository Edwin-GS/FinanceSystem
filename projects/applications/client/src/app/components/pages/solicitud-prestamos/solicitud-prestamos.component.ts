import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PrestamoSolicitudes } from 'projects/libraries/helpers/src/lib/models/prestamo-solicitudes';
import { Client } from 'projects/libraries/helpers/src/lib/models/client.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';

@Component({
  selector: 'app-solicitud-prestamos',
  templateUrl: './solicitud-prestamos.component.html',
  styleUrls: ['./solicitud-prestamos.component.css'],
})
export class SolicitudPrestamosComponent implements OnInit {
  userData = this.usr.getLocalStorage();
  registerForm!: FormGroup;

  baseUrl: string = `${this.userData?.userdata.name}/prestamosolicitudes/${this.userData?.app}`;

  clients: (Client | undefined)[] = [];
  clientUrl: string = `${this.userData?.userdata.name}/clientes/${this.userData?.app}`;

  schemaName = 'Solicitud de Prestamos';
  isLoading!: boolean;

  constructor(
    private readonly hs: HandlerService,
    private usr: UserService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private nv: Router
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.registerForm = this.initForm();
  }

  onSubmit(changes: PrestamoSolicitudes): void {
    this.onCreatePrestamo(changes);
  }

  onCreatePrestamo(Prestamo: PrestamoSolicitudes): void {
    const data: PrestamoSolicitudes = {
      //Constantes del formulario de solicitud d prestamos
      _id: Prestamo?._id,
      numerosolicitud: Prestamo?.numerosolicitud,
      empresadondetrabaja: Prestamo.empresadondetrabaja,
      puestocliente: Prestamo.puestocliente,
      ingresodiario: Prestamo.ingresodiario,
      ingresosemanal: Prestamo.ingresosemanal,
      ingresomensual: Prestamo.ingresomensual,
      fechaverificacion: Prestamo.fechaverificacion,

      //Informacion del solicitante
      client_id: Prestamo.client_id,
      garante_id: Prestamo.garante_id,
      vehiculo_id: Prestamo.vehiculo_id,
      propiedad_id: Prestamo.propiedad_id,
    };
    this.createPrestamo(data);
  }

  createPrestamo(Prestamo: PrestamoSolicitudes | undefined): void {
    this.hs
      .post(Prestamo, `entities/create/${this.baseUrl}`)
      .subscribe((resp: any) => {
        if (resp['success'] == false) {
          console.log('resp', resp);
          this.toast.error(
            'Error al intentar actualizar por favor intente de nuevo'
          );
        } else {
          this.toast.success('Solicitud de prestamo registrado');
          this.goBack();
        }
      });
  }

  initForm(): FormGroup {
    return this.fb.group({
      //Constantes del formulario de solicitud d prestamos
      numerosolicitud: ['', [Validators.required, Validators.minLength(1)]],
      empresadondetrabaja: ['', [Validators.required, Validators.minLength(1)]],
      puestocliente: ['', [Validators.required, Validators.minLength(1)]],
      ingresodiario: ['', [Validators.required, Validators.minLength(1)]],
      ingresosemanal: ['', [Validators.required, Validators.minLength(1)]],
      ingresomensual: ['', [Validators.required, Validators.minLength(1)]],
      fechaverificacion: ['', [Validators.required]],

      //Informacion del solicitante
      client_id: ['', [Validators.required]],
      garante_id: ['', [Validators.required]],
      vehiculo_id: ['', [Validators.required]],
      propiedad_id: ['', [Validators.required]],

      //Constantes de los campos de calculos
      fechaInicioPago: [''],
      diaSemanaInicioPago: [''],
      formaPago: [''],
      cantidadPrestamo: [0, [Validators.required]],
      cantidadCuotas: [''],
      importeCuota: [''],
      fechaTerminacionPagos: [''],
      porcentajeInteres: 0,
      porcentajeRecargoMora: 0,
    });
  }

  getClients(): void {
    this.isLoading = true;
    this.hs.get(`entities/${this.clientUrl}`).subscribe((res) => {
      if (!res.data) {
        this.isLoading = false;
        console.log('Hubo un error o no se encontraron datos', res.error);
      } else {
        this.isLoading = false;
        this.clients = [...res.data];
      }
    });
  }

  goBack() {
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/
      ${this.userData?.userdata.id}/clients`,
    ]);
  }

  // onCantidadPrestamoChange() {
  //   const cantidadPrestamo = this.registerForm.get('cantidadPrestamo')?.value;
  //   this.registerForm.set('cantidadPrestamo', `RD$${cantidadPrestamo}`);
  // }
}
