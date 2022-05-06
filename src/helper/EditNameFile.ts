import { Request } from "express";

export const editFileName = (req: Request, file: Express.Multer.File, callback: any) => {
    const name = file.originalname ? file.originalname.split('.')[0] : file.filename.split('.')[0];
    const fileExtName = file.originalname ? file.originalname.split('.')[1] : file.filename.split('.')[1];
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}.${fileExtName}`);
};

export const imageFileFilter = (req: Request, file: Express.Multer.File, callback: any) => {
    console.log(file.originalname);
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};