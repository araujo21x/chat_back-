declare namespace Express {
  export interface Request {
    file: Express.Multer.File & Express.MulterS3.File;
    userId: number;
    userType: import('../../../app/utils/types/enums/UserType').default;
  }
}
