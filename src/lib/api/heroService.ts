import { Connection } from "./connection";
import { Button, Icon } from "@/types/common";

export interface HeroSection {
  anchor: string;
  title: string;
  description: string;
  image: string;
  icons: Icon[];
  buttons: Button[];
}

const api = new Connection();

function mapIcons(icons: any[], baseUrl: string): Icon[] {
  return (icons || []).map((icon) => ({
    label: icon.label || "",
    image: icon.image?.[0]?.url ? baseUrl + icon.image[0].url : "",
  }));
}

function mapButtons(buttons: any[]): Button[] {
  return (buttons || []).map((btn) => ({
    label: btn.label,
    link: btn.link,
  }));
}

export async function getHero(): Promise<HeroSection | null> {
  const params = new URLSearchParams();
  params.append("populate[icons][populate]", "image");
  params.append("populate[image][populate]", "*");
  params.append("populate[buttons][populate]", "*");

  const queryString = params.toString();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
  
  return api.get<HeroSection>(`hero-section?${queryString}`, {}, (data) => ({
    anchor: data.anchor || "",
    title: data.title || "",
    description: data.description || "",
    image: data.image?.url ? API_URL + data.image.url : "",
    icons: mapIcons(data.icons, API_URL),
    buttons: mapButtons(data.buttons),
  }));
}
