export interface Certificate {
  label: string;
  image: string;
  description: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const REQUEST_URL = `${API_URL}/api`;


export async function getCertificates(): Promise<Certificate[] | null> {
  try {
    const res = await fetch(`${REQUEST_URL}/certificates?populate=Image`);

    if (!res.ok) throw new Error("Falha ao buscar dados dos certificados");

    const json = await res.json();

    const certificates: Certificate[] = (json.data || []).map((item: any) => {
      return {
        label: item.Label || "",

        image: item.Image?.url ? API_URL + item.Image.url : "",

        description: item.Description || [],  
      };
    });

    return certificates;
  } catch (error) {
    console.error(error);
    return null;
  }
}
