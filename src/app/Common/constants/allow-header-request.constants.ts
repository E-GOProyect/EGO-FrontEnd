import { HttpHeaders } from "@angular/common/http";

const backEndSite= '';
    
export const headers= new HttpHeaders({
    'Access-Control-Allow-Origin': 'https://ego-forms-backend.herokuapp.com'
})