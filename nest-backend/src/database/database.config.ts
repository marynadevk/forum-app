export default () => ({
  database: {
    type: 'postgres',
    synchronize: true,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
  },
});
