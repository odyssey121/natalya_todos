import { AxiosInstance } from "axios";
import store from "@/store";
/* eslint-disable */
declare module "vue/types/vue" {
  interface Vue {
    $http: AxiosInstance;
    $store:store
  }
}
