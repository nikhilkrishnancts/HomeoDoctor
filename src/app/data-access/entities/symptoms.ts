import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Sym2drugs } from './symptom2drug';
// import { User } from './user';

@Entity({ name: 'symptoms' })
export class Symptom extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    private _id: number = undefined;
    @Column({ name: 'chapterId' })
    private _chapterId: string = undefined;
    @Column({ name: 'parent' })
    private _parent: string = undefined;
    @Column({ name: 'bookId' })
    private _bookId: string = undefined;
    @Column({ name: 'symptomLevel' })
    private _symptomLevel: string = undefined;
    @Column({ name: 'symptom' })
    private _symptom: string = undefined;
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
    // @OneToOne(type => Sym2drugs, {lazy: true})
    // @JoinColumn({name: 'symptomId'})
    // private _sym2drugs: Sym2drugs = undefined;
    // extra
    // @OneToOne(type => Sym2drugs, symptom2drugs => symptom2drugs.symptomId)
    // symptom2drugs: Sym2drugs[];

    public get id(): number {
        return this._id;
    }


    // public get nationalId(): string {
    //     return this._nationalId;
    // }


    public get chapterId(): string {
        return this._chapterId;
    }


    public get parent(): string {
        return this._parent;
    }


    public get bookId(): string {
        return this._bookId;
    }


    public get symptomlevel(): string {
        return this._symptomLevel;
    }


    public get symptom(): string {
        return this._symptom;
    }


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


    public set id(value: number) {
        this._id = value;
    }


    public set chapterId(value: string) {
        this._chapterId = value;
    }


    public set parent(value: string) {
        this._parent = value;
    }


    public set bookId(value: string) {
        this._bookId = value;
    }


    public set symptom(value: string) {
        this._symptom = value;
    }


    public set symptomlevel(value: string) {
        this._symptomLevel = value;
    }


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
