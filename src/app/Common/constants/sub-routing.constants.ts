import { RouterNavigate } from 'src/app/Common/enums';
import { ParalelicRoutes } from "./paralelic-routes.cosntants";
import { RouterNavigateConst } from './router-navigate.constants';

export const SUB_ROUTING:{[key:string]:any} = {
  CHECK_IN: 'authentication',
  LOGIN: 'authentication',
  SIGN_UP: 'authentication',
  GUEST_USERNAME: 'authentication',
  CREATE_FORMS: 'form',
  FORM_NAME: 'form',
  ADD_QUESTION:'form',
  REVIEW_FORM: 'form',
  QUESTION_STEP: 'game',
  QUESTION_AWAIT_STEP: 'game',
  RESULT: 'game',
  WAITING_ROOM: 'game',
  CHATROOM: 'game',
  FINAL_STEP: 'game',
};


export const nav = (rute:any)=> {
  const route= ParalelicRoutes[rute];
  console.log(route);
  console.log("Route1: ", SUB_ROUTING[route]);
  console.log("Route2: ", RouterNavigateConst[route]);

  return [ SUB_ROUTING[route] ,RouterNavigateConst[route]];
}