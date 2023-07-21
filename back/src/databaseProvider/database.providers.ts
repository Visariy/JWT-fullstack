import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const  dataSource = new DataSource({
                type: 'postgres',
                url: 'postgres://jwt_jlzi_user:ZxioX0HKHc7urIkkJcfnbqGX5eXB14tF@dpg-cirvgv98g3n42on19p70-a.frankfurt-postgres.render.com/jwt_jlzi',
                port: 5432,
                ssl: true,
                username: 'postgres',
                password: 'admin',
                database: 'JWT-test',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        }
    }
]
