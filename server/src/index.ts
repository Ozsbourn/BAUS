import express from 'express'
import { headerTypes, headerValues } from './configs/corsConfigs';
import cookieParser from "cookie-parser";

import './libs/envLoader';

import authRoutes        from "./routes/auth";
import groupsRoutes      from "./routes/groups";
import pageBuilderRoutes from './routes/pageBuilder';



const app  = express();
// const port = process.env.PORT;
const port = 5000;

app.use(express.json())                         // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(function(_req, res, next) {
  res.header(headerTypes.acaOrigin,      headerValues.acaOrigin); 
  res.header(headerTypes.acaHeaders,     headerValues.acaHeaders); 
  res.header(headerTypes.acaMethods,     headerValues.acaMethods); 
  res.header(headerTypes.acaCredentials, headerValues.acaCredentials); 

  next();
});


app.use("/api/auth",        authRoutes);
app.use("/api/groups",      groupsRoutes);
app.use("/api/pagebuilder", pageBuilderRoutes);


app.listen(port, () => {
  console.log(`Running on port ${port}`)
});
