import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PrestamoSolicitudes } from 'projects/libraries/helpers/src/lib/models/prestamo-solicitudes';
import { Client } from 'projects/libraries/helpers/src/lib/models/client.doc';
import { HandlerService } from 'projects/libraries/helpers/src/lib/services/handler.service';
import { UserService } from 'projects/libraries/helpers/src/lib/services/user.service';
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { Observable } from 'rxjs';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'app-solicitud-prestamos',
  templateUrl: './solicitud-prestamos.component.html',
  // styleUrls: ['./solicitud-prestamos.component.css'],
})

export class SolicitudPrestamosComponent implements OnInit {
  userData = this.usr.getLocalStorage();
  registerForm!: FormGroup;

  id!: string;

  baseUrl: string = `${this.userData?.userdata.name}/prestamosolicitudes/${this.userData?.app}`;
  clients: (Client | undefined)[] = [];
  clientUrl: string = `${this.userData?.userdata.name}/clientes/${this.userData?.app}`;
  schemaName = 'Solicitud de Prestamos';
  isLoading!: boolean;
  selection!: Client;

  diaSemanaSolicitud: string = '';
  diaSemanaInicioPago: string = '';
  fechaTerminacionPagos: string = '';
  cantidadCuotas: number = 0;
  importeCuota: number = 0;
  porcentajeInteres: number = 0;
  porcentajeRecargoMora: number = 0;
  cantidadGanada: number = 0;
  cuotasPagar: number = 1;

  isUpdateMode: boolean = false;

  constructor(
    private readonly hs: HandlerService,
    private usr: UserService,
    private fb: FormBuilder,
    private toast: HotToastService,
    private nv: Router,
    private readonly router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.initForm();
    this.subscribeToFormChanges();
  
    this.router.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.isUpdateMode = true;
        this.loadExistingData(this.id);
      }
    });
  }
  
  loadExistingData(id: string): void {
    this.isLoading = true;
    this.hs.get(`entities/${this.baseUrl}/${id}`).subscribe((res) => {
      this.isLoading = false;
      if (!res.data) {
        console.log('Hubo un error o no se encontraron datos');
      } else {
        this.selection = res.data;
        this.registerForm.patchValue({
          // Complete the form with existing data
        });
      }
    });
  }
  

  onSubmit(changes: PrestamoSolicitudes): void {
    if (this.isUpdateMode) {
      this.updatePrestamo(this.id, changes).subscribe((resp) => {
        if (resp['success'] == false) {
          console.log('resp', resp);
          this.toast.error(
            'Error al intentar actualizar por favor intente de nuevo'
          );
        } else {
          this.toast.success('Solicitud de prestamo actualizado');
          this.goBack();
        }
      });
    } else {
      this.onCreatePrestamo(changes);
    }
  }
  

  onCreatePrestamo(Prestamo: PrestamoSolicitudes): void {
    const data: PrestamoSolicitudes = {
      // Constantes del formulario de solicitud de prestamos
      _id: Prestamo?._id,
      numerosolicitud: Prestamo?.numerosolicitud,
      ingresodiario: Prestamo.ingresodiario,
      ingresosemanal: Prestamo.ingresosemanal,
      ingresomensual: Prestamo.ingresomensual,
      fechaverificacion: Prestamo.fechaverificacion,
      aprobado: Prestamo.aprobado,
      // Informacion del solicitante
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

  updatePrestamo(id: string, data: PrestamoSolicitudes): Observable<any> {
    const url = `entities/update/${this.baseUrl}/${id}`;
    return this.hs.put(data, url);
  }
  

  initForm(): FormGroup {
    const formControls = {
      numerosolicitud: ['', [Validators.required, Validators.minLength(1)]],
      empresadondetrabaja: ['', [Validators.required, Validators.minLength(1)]],
      puestocliente: ['', [Validators.required, Validators.minLength(1)]],
      ingresodiario: ['', [Validators.required, Validators.minLength(1)]],
      ingresosemanal: ['', [Validators.required, Validators.minLength(1)]],
      ingresomensual: ['', [Validators.required, Validators.minLength(1)]],
      fechaverificacion: ['', [Validators.required]],
      client_id: ['', [Validators.required]],
      garante_id: ['', [Validators.required]],
      vehiculo_id: ['', [Validators.required]],
      propiedad_id: ['', [Validators.required]],
      fechaSolicitud: [new Date().toISOString().split('T')[0]],
      fechaInicioPago: [this.getTomorrowDate(), Validators.required],
      fechaTerminacionPagos: [''],
      diaSemanaInicioPago: [''],
      formaPago: [''],
      cantidadPrestamo: [0, [Validators.required]],
      cantidadCuotas: 1,
      cantidadGanada: 0,
      importeCuota: 0,
      porcentajeInteres: 0,
      porcentajeRecargoMora: 0,
    };
  
    const form = this.fb.group(formControls);
  
    if (this.isUpdateMode) {
      form.patchValue({
        //Update the values needed
      });
    }
  
    return form;
  }
  

  subscribeToFormChanges(): void {
    this.registerForm.get('cantidadPrestamo')?.valueChanges.subscribe(() => {
      this.calcularPrestamo();
    });
    this.registerForm.get('formaPago')?.valueChanges.subscribe(() => {
      this.calcularPrestamo();
    });
    this.registerForm.get('porcentajeInteres')?.valueChanges.subscribe(() => {
      this.calcularPrestamo();
    });
    this.registerForm.get('cantidadCuotas')?.valueChanges.subscribe(() => {
      this.calcularPrestamo();
    });
    this.registerForm.get('importeCuota')?.valueChanges.subscribe(() => {
      this.calcularPrestamo();
    });
    this.registerForm.get('fechaSolicitud')?.valueChanges.subscribe(() => {
      this.calcularPrestamo();
    });
    this.registerForm.get('fechaInicioPago')?.valueChanges.subscribe(() => {
      this.calcularPrestamo();
    });
    this.registerForm.get('fechaSolicitud')?.valueChanges.subscribe(() => {
      this.calcularPrestamo();
    });

    this.registerForm
      .get('porcentajeRecargoMora')
      ?.valueChanges.subscribe(() => {
        this.calcularPrestamo();
      });
  }

  goBack() {
    this.nv.navigate([
      `/finance-system/users/${this.userData?.userdata.name}/${this.userData?.userdata.id}/clients`,
    ]);
  }

  getTomorrowDate(): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  getDayOfTheWeek(dateString: string): string {
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return days[dayIndex];
  }

  updateDiaSemana() {
    const fechaSolicitud = this.registerForm.get('fechaSolicitud')?.value;
    this.diaSemanaSolicitud = this.getDayOfTheWeek(fechaSolicitud);

    const fechaInicioPago = this.registerForm.get('fechaInicioPago')?.value;
    this.diaSemanaInicioPago = this.getDayOfTheWeek(fechaInicioPago);
  }

  getFormattedNumber(value: number): string {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getFormattedCurrency(value: number): string {
    return value.toLocaleString('es-DO', {
      style: 'currency',
      currency: 'DOP',
    });
  }

  getFormattedDate(dateString: string): string {
    const options = {
      weekday: 'long' as const,
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const,
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
  }

  getPeriodo(formaPago: string) {
    switch (formaPago) {
      case 'Diario':
        return 1;
      case 'Semanal':
        return 7;
      case 'Mensual':
        return 30;
      default:
        throw new Error('Forma de pago no válida');
    }
  }

  calcularPrestamo() {
    const {
      cantidadPrestamo,
      porcentajeInteres,
      cantidadCuotas,
      formaPago,
      fechaInicioPago,
    } = this.registerForm.value;

    const porcentajeCalculado = cantidadPrestamo * (porcentajeInteres / 100);
    const importeCuota =
      (cantidadPrestamo + porcentajeCalculado) / cantidadCuotas;

    let fechaTerminacionPagos = '';
    if (formaPago === 'Diario') {
      fechaTerminacionPagos = this.sumarDias(fechaInicioPago, cantidadCuotas);
    } else if (formaPago === 'Semanal') {
      fechaTerminacionPagos = this.sumarSemanas(
        fechaInicioPago,
        cantidadCuotas
      );
    } else if (formaPago === 'Quincenal') {
      fechaTerminacionPagos = this.sumarQuincenas(
        fechaInicioPago,
        cantidadCuotas
      );
    } else if (formaPago === 'Mensual') {
      fechaTerminacionPagos = this.sumarMeses(fechaInicioPago, cantidadCuotas);
    }

    this.registerForm.patchValue({
      cantidadGanada: porcentajeCalculado,
      importeCuota: importeCuota,
      formaPago: formaPago,
      fechaTerminacionPagos: fechaTerminacionPagos,
    });
    this.updateDiaSemana();
  }

  sumarDias(fecha: string, dias: number): string {
    const date = new Date(fecha);
    date.setDate(date.getDate() + dias);
    return date.toISOString().split('T')[0];
  }

  sumarSemanas(fecha: string, semanas: number): string {
    const date = new Date(fecha);
    date.setDate(date.getDate() + semanas * 7);
    return date.toISOString().split('T')[0];
  }

  sumarQuincenas(fecha: string, quincenas: number): string {
    const date = new Date(fecha);
    date.setDate(date.getDate() + quincenas * 15);
    return date.toISOString().split('T')[0];
  }

  sumarMeses(fecha: string, meses: number): string {
    const date = new Date(fecha);
    date.setMonth(date.getMonth() + meses);
    return date.toISOString().split('T')[0];
  }

  getClient( id: string ): void{
    this.isLoading = true;
    this.hs.get( `entities/${this.baseUrl}/${ id }` )
    .subscribe((res) => {
      if(!res.data){
        this.isLoading = false;
        console.log('Hubo un error o no se encontraron datos');
      }
      else{
        this.isLoading = false;
        this.selection = res.data
      }
      console.log('selection', this.selection);
   })
  }

  generatePDF(){
    let docDefinition: any = {
      
      content: [
        {
          text: 'Finance System',
          style: 'Header'
        },
        {
          text: `Solicitante: ${this.selection.nombre, this.selection.apellidos}`,
          style: 'rows'
        },
        {
          text: `Tipo documento: ${this.selection.tipodocumento}`,
          style: 'rows'
        },
        {
          text: `Numero documento: ${this.selection.numerodocumento}`,
          style: 'rows'
        },
        {
          text: `Fecha solicitud: ${this.registerForm.value.fechaSolicitud}`,
          style: 'rows'
        },
        {
          text: `Fecha solicitud: ${this.registerForm.value.fechaSolicitud}`,
          style: 'rows'
        },
        {
          text: `Fecha inicio pago: ${this.registerForm.value.fechaInicioPago}`,
          style: 'rows'
        },
        {
          text: `Fecha termino de pago: ${this.registerForm.value.fechaTerminacionPagos}`,
          style: 'rows'
        },
        {
          text: `Cantidad prestamo: ${this.registerForm.value.cantidadPrestamo}`,
          style: 'rows'
        },
        {
          text: `Cantidad de cuotas: ${this.registerForm.value.cantidadCuotas}`,
          style: 'rows'
        },
        {
          text: `Cantidad a ganar: ${this.registerForm.value.cantidadGanada}`,
          style: 'rows'
        },
        {
          text: `Interés: ${this.registerForm.value.porcentajeInteres}`,
          style: 'rows'
        },
        {
          text: `Propiedad cod: ${this.registerForm.value.propiedad_id}`,
          style: 'rows'
        },
        {
          text: `Vehiculo cod: ${this.registerForm.value.vehiculo_id}`,
          style: 'rows'
        },
      ],

      columnGap: 10,
      styles: {
        Header: {
          fontSize: 22,
          bold: true,
        },
        rows: {
          fontSize: 12,
          margin: [ 5, 5 ]
        }
      }
    }

    pdfMake.createPdf(docDefinition).open()
  }
}
