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
import { Disease2Clinexams } from './entities/disease2clinexams';
import { Disease2Symptoms } from './entities/disease2symptoms';

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
            password: 'root',
            database: 'homdb',
            connectTimeout: 900000,
            entities: [
                Books,
                Clinexams,
                Clinsymptoms,
                Diseases,
                Chapter,
                Symptom,
                Sym2drugs,
                Drugs,
                Disease2Clinexams,
                Disease2Symptoms
            ],
            extra: {
                connectionLimit: 100
            },
            synchronize: false,
            logging: false
        };
        this.connection =  createConnection(this.options);

    }
}
