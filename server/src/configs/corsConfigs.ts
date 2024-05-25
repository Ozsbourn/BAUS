

/* aca - Access-Control-Allow-[...] */
export const headerTypes = {
  acaOrigin:      'Access-Control-Allow-Origin',
  acaHeaders:     'Access-Control-Allow-Headers',
  acaMethods:     'Access-Control-Allow-Methods',
  acaCredentials: 'Access-Control-Allow-Credentials',
};

/* aca - Access-Control-Allow-[...] */
export const headerValues = {
  acaOrigin:      'http://localhost:3000', 
  acaHeaders:     'Origin, X-Requested-With, Content-Type, Accept',
  acaMethods:     'GET, POST, DELETE, PUT',
  acaCredentials: 'true',
};