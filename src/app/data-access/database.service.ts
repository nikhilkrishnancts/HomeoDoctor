import { Injectable } from '@angular/core';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { Books } from './entities/book';
import { Clinexams } from './entities/ce';
import { Clinsymptoms } from './entities/cp';
import { Diseases } from './entities/diseases';
import { Chapter } from './entities/chapters';
import { Symptom } from './entities/symptoms';
import { Sym2drugs } from './entities/symptom2drug';
import { Drugs } from './entities/drugs';

@Injectable()
export class DatabaseService {

    public connection: Promise<Connection>;
    private readonly options: ConnectionOptions;

    constructor() {
        this.options = {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'admin',
            database: 'homdb',
            acquireTimeout: 900000,
            entities: [
                Books,
                Clinexams,
                Clinsymptoms,
                Diseases,
                Chapter,
                Symptom,
                Sym2drugs,
                Drugs
            ],
            extra: {
                connectionLimit: 100
            },
            synchronize: false,
            logging: false
        };
        this.connection = createConnection(this.options);
    }
}
