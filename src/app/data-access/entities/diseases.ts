import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from 'typeorm';
// import { User } from './user';

@Entity({ name: 'diseases' })
export class Diseases extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    private _id: number = undefined;
    @Column({ name: 'name' })
    private _name: string = undefined;
    // @Column({ name: 'image' })
    // private _image: string = undefined;
    // @Column({ name: 'readonly' })
    // private _readonly: string = undefined;
    // @Column({ name: 'person_address' })
    // private _address: string = undefined;
    // @Column({ name: 'person_father_name' })
    // private _fathername: string = undefined;
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

    // extra
    // @OneToOne(type => User, user => user.person, {lazy: true})
    // private _user: User = undefined;

    public get id(): number {
        return this._id;
    }


    // public get nationalId(): string {
    //     return this._nationalId;
    // }


    public get name(): string {
        return this._name;
    }


    // public get image(): string {
    //     return this._image;
    // }


    // public get readonly(): string {
    //     return this._readonly;
    // }


    // public get address(): string {
    //     return this._address;
    // }


    // public get fathername(): string {
    //     return this._fathername;
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


    public set id(value: number) {
        this._id = value;
    }


    public set name(value: string) {
        this._name = value;
    }


    // public set image(value: string) {
    //     this._image = value;
    // }


    // public set readonly(value: string) {
    //     this._readonly = value;
    // }


    // public set phone(value: string) {
    //     this._phone = value;
    // }


    // public set address(value: string) {
    //     this._address = value;
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
