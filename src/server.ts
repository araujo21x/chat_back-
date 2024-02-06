/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import dataSource from '@db/index';
import app from './app';

dataSource
  .initialize()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      let message = 'server on';
      if (process.env.NODE_ENV !== 'prod') {
        message = `server on: ${process.env.PORT || 3000}`;
      }

      console.log(message);
    });
  })
  .catch((err) => {
    console.log(err);
  });
