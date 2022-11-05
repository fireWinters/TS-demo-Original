import { RouteObject } from "react-router-dom";

export interface CustomRoute extends RouteObject {
  name: string;
  path: string;
  children: CustomRoute[];
  meta?: {
    auth?: boolean;
    isNavBar: true;
  }
}