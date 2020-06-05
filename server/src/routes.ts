import express from 'express';
import { celebrate, Joi} from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer'


import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController'

const routes = express.Router();
const upload = multer(multerConfig);


const pointcontroller = new PointsController();
const itemscontroller = new ItemsController();


routes.get('/items', itemscontroller.index);
routes.get('/points', pointcontroller.index);
routes.get('/points/:id', pointcontroller.show);

routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointcontroller.create
);


export default routes;