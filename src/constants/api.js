export const BASE_URL = "https://norexam.herokuapp.com/api/";
//export const BASE_URL = "https://noroff-exam.herokuapp.com/api/";

export const PRODUCTS_URL = BASE_URL + "products?populate=*";

export function itemUrl(id) {
  return BASE_URL + "products/" + id + "?populate=*";
}

export const LOGIN_URL = "https://norexam.herokuapp.com/api/auth/local";

/* in strapi - permissions need to be set again after production!! */
