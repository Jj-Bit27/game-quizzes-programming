import { createPool } from 'mysql2/promise'

export const pool = createPool({
  host: 'bbwonjycssor4r6pmyso-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'u5khmqlkuag6cru5',
  password: 'vhEV4CBFzfUD3e8qoqIV',
  database: 'bbwonjycssor4r6pmyso',
})