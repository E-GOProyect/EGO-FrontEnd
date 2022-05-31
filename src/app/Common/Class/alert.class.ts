import Swal from 'sweetalert2';

export class Alert {
  constructor() {}

  public alertSuccess(title: string, message: string, callback?: () => void) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  public alertError(title: string, message: string, callback?: () => void) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  public alertDesision(
    title: string,
    message: string,
    callback?: (result: any) => void
  ) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (callback) {
        callback(result);
      }
    });
  }
}
