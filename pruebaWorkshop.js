import http from "k6/http";
import { check, sleep } from "k6";
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const indice = [1, 2, 3, 4]
const endpoint = "http://172.18.0.4:8080/api/todos"


// Prueba de carga
export let options = {
  stages: [
    { duration: "20s", target: 10 },
    { duration: "20s", target: 1000 },
    { duration: "20s", target: 1000 },
    { duration: "20s", target: 333 },
    { duration: "20s", target: 800 },
    { duration: "20s", target: 75 },
  ]
};

export default function () {
 
  const response = http.get(
    endpoint, 
    { headers: { Accepts: "application/json" } }
  );
  // Inicio de prueba
  check(response, { "Status Code indice is 200": (r) => r.status === 200 });
  sleep(.300);

  const randomindice = randomItem(indice);
  const responseShow = http.get(
    `${endpoint}/${randomindice}`,
    { headers: { Accepts: "application/json" } }
  );
  
  check(responseShow, { "Status Code Show is 200": (r) => r.status === 200 });
  sleep(.300);

  const body = {
    "title": randomString(8),
    "description": randomString(18),
    "completed": false
  }

  const responseCreate = http.post(
    endpoint,
    JSON.stringify(body),
    { headers: { Accepts: "application/json" } }
  );

  check(responseCreate, { "Status Code Create is 201": (r) => r.status === 201 });
  sleep(.300);

};