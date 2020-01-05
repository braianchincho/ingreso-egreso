export class IngresoEgreso {
    descripcion: string;
    monto: number;
    tipo: string;
   
    constructor(obj) {
        if (obj) {
          
          this.descripcion = obj.descripcion || null;
          this.monto = obj.monto  || null;
          this.tipo = obj.tipo  || null;
        }
    }
}