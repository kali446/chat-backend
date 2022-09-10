import { Request, Response, NextFunction } from "express";

export function catchAsync(target: any, key: string, desc: PropertyDescriptor) {
  const method = desc.value;
  desc.value = function (req: Request, res: Response, next: NextFunction) {
    method(req, res, next).catch(next);
  };
}
