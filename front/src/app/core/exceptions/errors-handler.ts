import { HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs';

export function handleError(error:HttpErrorResponse){
  if(error.status===0){
    console.error('Se ha producio un error ', error.error);
  }
  else{
    console.error('Backend retornó el código de estado ', error.status, error.error);
  }
  return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
}

export default handleError
