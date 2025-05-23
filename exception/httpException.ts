class HttpException  extends Error {
    public status: number;
    public message:string;
    
    constructor(status:number ,messaage :string ){
        super(messaage)
        this.status = status
        this.message = messaage
    }
}

export default HttpException;