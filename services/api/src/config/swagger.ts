import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { setup, serve } from 'swagger-ui-express';

function initSwagger(app: Express) {
  const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'GymU API',
        version: '0.0.1',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['src/routes//*.ts'],
  };

  const specs = swaggerJsdoc(options);
  app.use('/docs', serve, setup(specs, { explorer: true }));
}

export default initSwagger;
