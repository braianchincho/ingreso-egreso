export class IngresoEgreso {
    descripcion: string;
    monto: number;
    tipo: string;
    uuid?: string;
    constructor(obj) {
        if (obj) {
          this.uuid = obj.uuid || null;
          this.descripcion = obj.descripcion || null;
          this.monto = obj.monto  || null;
          this.tipo = obj.tipo  || null;
        }
    }
}