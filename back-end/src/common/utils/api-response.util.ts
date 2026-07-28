import {
  ApiMessageResponse,
  ApiResponse,
} from '../interfaces/api-response.interface';

// Success data response
export function successResponse<T>(message: string, data: T): ApiResponse<T> {
  return {
    status: true,
    message,
    data,
  };
}

// Delete success message response
export function successMessageResponse(message: string): ApiMessageResponse {
  return {
    status: true,
    message,
  };
}
