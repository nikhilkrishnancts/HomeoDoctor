import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Symptom } from './symptoms';
// import { User } from './user';

@Entity({ name: 'sym2drugs' })
export class Sym2drugs extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    private _id: number = undefined;
    
    @Column({ name: 'bookId' })
    private _bookId: number = undefined;
    @Column({ name: 'drugId' })
    private _drugId: number = undefined;
    @Column({ name: 'chapterId' })
    private _chapterId: number = undefined;
    @Column({ name: 'symptomId' })
    private _symptomId: number = undefined;
    // @Column({ name: 'symptom' })
    // private _symptom: string = undefined;
    // @Column({ name: 'person_birth_year' })
    // private _birthYear: number = undefined;
    // @Column({ name: 'person_deleted' })
    // private _deleted: boolean = undefined;
    // @Column({ name: 'person_lastmodify' })
    // private _lastModify: Date = undefined;
    // @Column({ name: 'person_work_address' })
    // private _workAddress: string = undefined;
    // @Column({ name: 'person_work_phonenum' })
    // private _workPhone: string = undefined;
   

    // @OneToOne(type => Symptom, user => user.id, {lazy: true})
    // private _symptom: Symptom = undefined;
    // extra
    // @OneToOne(type => Books, book => book.id, {lazy: true})
    // private _book: Books = undefined;

    // public get id(): number {
    //     return this._id;
    // }


    // public get nationalId(): string {
    //     return this._nationalId;
    // }


    public get chapterId(): number {
        return this._chapterId;
    }


    public get symptomId(): number {
        return this._symptomId;
    }


    public get bookId(): number {
        return this._bookId;
    }


    public get drugId(): number {
        return this._drugId;
    }


    // public get symptom(): string {
    //     return this._symptom;
    // }


    // public get birthYear(): number {
    //     return this._birthYear;
    // }


    // public get deleted(): boolean {
    //     return this._deleted;
    // }


    // public get lastModify(): Date {
    //     return this._lastModify;
    // }


    // public get workAddress(): string {
    //     return this._workAddress;
    // }


    // public get workPhone(): string {
    //     return this._workPhone;
    // }


    // public set id(value: number) {
    //     this._id = value;
    // }


    public set chapterId(value: number) {
        this._chapterId = value;
    }


    public set symptomId(value: number) {
        this._symptomId = value;
    }


    public set bookId(value: number) {
        this._bookId = value;
    }


    public set drugId(value: number) {
        this._drugId = value;
    }


    // public set symptomlevel(value: string) {
    //     this._symptomLevel = value;
    // }


    // public set fathername(value: string) {
    //     this._fathername = value;
    // }


    // public set birthYear(value: number) {
    //     this._birthYear = value;
    // }


    // public set deleted(value: boolean) {
    //     this._deleted = value;
    // }


    // public set lastModify(value: Date) {
    //     this._lastModify = value;
    // }


    // public set workAddress(value: string) {
    //     this._workAddress = value;
    // }


    // public set workPhone(value: string) {
    //     this._workPhone = value;
    // }

    // /**
    //  * Getter user
    //  * @return {User }
    //  */
    // public get user(): User {
    //     return this._user;
    // }

    // /**
    //  * Setter user
    //  * @param {User } value
    //  */
    // public set user(value: User) {
    //     this._user = value;
    // }

}
