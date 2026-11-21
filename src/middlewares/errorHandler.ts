import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Unhandled Error Details:", err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "An unexpected server error occurred";

  res.status(statusCode).json({
    error: message,
    // Avoid exposing technical details/stack traces in production
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
