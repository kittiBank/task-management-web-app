import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiMessageResponse } from '../interfaces/api-response.interface';

// Http exception filter
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const errorResponse = exception.getResponse();

      response
        .status(statusCode)
        .json(this.buildHttpErrorResponse(errorResponse, statusCode));
      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: 'Internal server error',
    } satisfies ApiMessageResponse);
  }

  // Build HTTP error response
  private buildHttpErrorResponse(
    errorResponse: string | object,
    statusCode: number,
  ): ApiMessageResponse {
    if (typeof errorResponse === 'string') {
      return {
        status: false,
        message: errorResponse,
      };
    }

    const message = (errorResponse as { message?: unknown }).message;

    if (Array.isArray(message)) {
      return {
        status: false,
        message: message.join(', '),
      };
    }

    if (typeof message === 'string') {
      return {
        status: false,
        message,
      };
    }

    return {
      status: false,
      message: this.getDefaultMessage(statusCode),
    };
  }

  // Get default message by status code
  private getDefaultMessage(statusCode: number): string {
    if (statusCode === 400) {
      return 'Bad request';
    }

    if (statusCode === 404) {
      return 'Resource not found';
    }

    return 'Request failed';
  }
}
