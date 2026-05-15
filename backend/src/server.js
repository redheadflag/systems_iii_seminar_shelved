import { listen } from './app';
import { port } from './config/config';

listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
