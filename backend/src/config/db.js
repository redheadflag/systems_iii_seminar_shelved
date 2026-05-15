import { createPool } from 'mysql2';
import { config } from './config';

app.listen(config.port);
const pool = createPool(config.db);

export default pool.promise();
