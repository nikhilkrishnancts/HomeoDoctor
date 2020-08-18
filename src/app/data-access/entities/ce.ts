import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
// import { Person } from './person';

@Entity({ name: 'clinexams' })
export class Clinexams extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'ID' })
    private _id: number = undefined;
    @Column({ name: 'Name' })
    private _name: string = undefined;
    @Column({ name: 'Expr1' })
    private _expr: string = undefined;
    // @Column({ name: 'user_is_admin' })
    // private _isAdmin: boolean = undefined;
    // @Column({ name: 'user_insert_access' })
    // private _insertAccess: boolean = undefined;
    // @Column({ name: 'user_update_access' })
    // private _updateAccess: boolean = undefined;
    // @Column({ name: 'user_deleted' })
    // private _deleted: boolean = undefined;
    // @Column({ name: 'user_lastmodify' })
    // private _lastModify: Date = undefined;
    // @OneToOne(type => Person, {lazy: true})
    // @JoinColumn({name: 'user_person'})
    // private _person: Person = undefined;


    /**
     * Getter id
     * @return {number }
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Getter username
     * @return {string }
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Getter password
     * @return {string }
     */
    public get expr(): string {
        return this._expr;
    }

    // /**
    //  * Getter isAdmin
    //  * @return {boolean }
    //  */
    // public get isAdmin(): boolean {
    //     return this._isAdmin;
    // }

    // /**
    //  * Getter insertAccess
    //  * @return {boolean }
    //  */
    // public get insertAccess(): boolean {
    //     return this._insertAccess;
    // }

    // /**
    //  * Getter updateAccess
    //  * @return {boolean }
    //  */
    // public get updateAccess(): boolean {
    //     return this._updateAccess;
    // }

    /**
    //  * Getter deleted
    //  * @return {boolean }
    //  */
    // public get deleted(): boolean {
    //     return this._deleted;
    // }

    // /**
    //  * Getter lastModify
    //  * @return {Date }
    //  */
    // public get lastModify(): Date {
    //     return this._lastModify;
    // }

    // /**
    //  * Getter person
    //  * @return {Person }
    //  */
    // public get person(): Person {
    //     return this._person;
    // }

    /**
     * Setter id
     * @param {number } value
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Setter username
     * @param {string } value
     */
    public set username(value: string) {
        this._name = value;
    }

    /**
     * Setter password
     * @param {string } value
     */
    public set expr(value: string) {
        this._expr = value;
    }

    // /**
    //  * Setter isAdmin
    //  * @param {boolean } value
    //  */
    // public set isAdmin(value: boolean) {
    //     this._isAdmin = value;
    // }

    // /**
    //  * Setter insertAccess
    //  * @param {boolean } value
    //  */
    // public set insertAccess(value: boolean) {
    //     this._insertAccess = value;
    // }

    // /**
    //  * Setter updateAccess
    //  * @param {boolean } value
    //  */
    // public set updateAccess(value: boolean) {
    //     this._updateAccess = value;
    // }

    // /**
    //  * Setter deleted
    //  * @param {boolean } value
    //  */
    // public set deleted(value: boolean) {
    //     this._deleted = value;
    // }

    // /**
    //  * Setter lastModify
    //  * @param {Date } value
    //  */
    // public set lastModify(value: Date) {
    //     this._lastModify = value;
    // }

    // /**
    //  * Setter person
    //  * @param {Person } value
    //  */
    // public set person(value: Person) {
    //     this._person = value;
    // }

}
