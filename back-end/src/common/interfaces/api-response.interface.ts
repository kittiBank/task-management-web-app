export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface ApiMessageResponse {
  status: boolean;
  message: string;
}
