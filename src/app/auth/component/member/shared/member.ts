export class Member {
  constructor(
    public id?: any,
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public password?: string,
    public opassword?: string,
    public cpassword?: string,
    public role?: string,
    public created_at?: string,
    public updated_at?: string,
  ) { }
}
