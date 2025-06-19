import { Connection } from "./connection";

export interface CertificateSection {
  title: string;
  description: string;
  anchor: string;
  certificates: Certificate[];
}

export interface Certificate {
  label: string;
  description: string;
  image: string;
}

const api = new Connection();

function mapCertificates(data: any[], baseUrl: string): Certificate[] {
  return (data || []).map((item) => ({
    label: item.label || "",
    description: item.description || "",
    image: item.image?.url ? baseUrl + item.image.url : "",
  }));
}

export async function getCertificateSection(): Promise<CertificateSection | null> {
  const params = new URLSearchParams();
  params.append("populate[certificates][populate]", "image");

  const queryString = params.toString();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  return api.get<CertificateSection | null>(`certificate-section?${queryString}`, {}, (data) => ({
    title: data.title || "",
    description: data.description || "",
    anchor: data.anchor || "",
    certificates: mapCertificates(data.certificates || [], API_URL),
  }));
}
