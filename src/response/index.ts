import { ErrorMessage } from "./errorMessage";
import { SuccessMessages } from "./successMessage";

export class ApiResponse {

  // * Success Response
  public send = async (req:any, res:any, data: any, message: string) => {
    console.log('# ApiResponse -> send -> start');
    const resObj: any = {
      statusCode: 200,
      message: SuccessMessages[message]
    }
    if(data?.extraData){
      resObj.data = data.data
      resObj.extraData = data.extraData
    } else {
      resObj.data = data
    }

    res.status(200);
    return res.json(resObj);
  };

  // * Error Response
  public error (req: any, res: any, err: any, message: string) {
    console.log('# ApiResponse -> error -> start');
    const resObj: any = {
      statusCode: 400,
      data: '',
      error: err.stack || err,
      message: ErrorMessage[message]
    }

    res.status(400);
    return res.json(resObj);
  }

  // * Server Error Response
  public serverError (req: any, res: any, err: any, message: string) {
    console.log('# ApiResponse -> serverError -> start');
    const resObj: any = {
      statusCode: 500,
      data: '',
      error: err,
      message: ErrorMessage[message]
    }

    res.status(500);
    return res.json(resObj);
  }
}
