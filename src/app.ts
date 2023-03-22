import express, {json} from "express"

export default (config) =>{
    const app = express();
    app.use(json())
    return app;
}
