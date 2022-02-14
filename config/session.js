// 1. IMPORTS
const session = require("express-session");
const MongoStore = require("connect-mongo")

// 2. SESSION MANAGEMENT

const sessionManager = (app) => {
  // VERIFICAR CON EL PATRÓN DE DISEÑO PROXY QUE SI LA SESIÓN ES "EXTRAÑA", ES DECIR SE INTENTA MANIPULAR CON UNA COOKIE FALSE, EVITAR EL RUTEO
  app.set("trust proxy", 1);

  // VERIFICAR QUE LA SESIÓN SE GENERE CON SU PALABRA SECRETA, SU TICKET (COOKIE) Y SU EXPIRACIÓN
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      cookie: {
        maxAge: 8640000, // TIEMPO DE EXPIRACIÓN DEL COOKIE
        httpOnly: true,
      },
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
      }),
    })
  );
};

// 3. EXPORTS
module.exports = sessionManager