export class Connection {
  baseUrl: string;
  headers: Record<string, string>;
  debug: boolean;

  constructor(baseUrl?: string, headers: Record<string, string> = {}) {
    this.baseUrl = `${baseUrl || process.env.NEXT_PUBLIC_API_URL || ""}/api`;
    this.headers = {
      "Content-Type": "application/json",
      ...headers,
    };
    this.debug = process.env.NEXT_PUBLIC_DEBUG === "true";
  }

  async get<T = any>(
    endpoint: string,
    queryParams: Record<string, any> = {},
    transform?: (data: any) => T
  ): Promise<T | null> {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${this.baseUrl}/${endpoint}${queryString ? `?${queryString}` : ""}`;

    if (this.debug) console.group(`[Connection] GET ${url}`);

    try {
      if (this.debug) console.log("Request Headers:", this.headers);

      const res = await fetch(url, {
        method: "GET",
        headers: this.headers,
      });

      if (this.debug) console.log("Response Status:", res.status, res.statusText);

      if (!res.ok) {
        if (this.debug) console.error(`HTTP error: ${res.status} ${res.statusText}`);
        if (this.debug) console.groupEnd();
        return null;
      }

      const json = await res.json();

      if (this.debug) console.log("Response JSON:", json);

      if (this.debug) console.groupEnd();

      return transform ? transform(json.data) : json.data;
    } catch (error: any) {
      if (this.debug) {
        console.error("Fetch error:", error.message || error);
        console.groupEnd();
      }
      return null;
    }
  }
}
