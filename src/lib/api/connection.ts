// ApiConnection.ts
export class ApiConnection {
  baseUrl: string;
  headers: Record<string, string>;

  constructor(baseUrl?: string, headers: Record<string, string> = {}) {
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_API_URL || "";
    this.headers = headers;
  }
}
