declare namespace Express {
    export interface Response {
      sendResponse: (data: any) => Response; 
    }
    interface Request {
      user: {
        role:string;
        email: string;
        password?: string;
      };
    }
  }