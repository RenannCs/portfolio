export interface HeroData {
  title: string;
  subtitle: string;
  image: string;
  icons: HeroIcon[];
  buttons: HeroButton[];
}

export interface HeroButton {
  label: string;
  link: string;
}

export interface HeroIcon {
  label: string;
  image: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const REQUEST_URL = `${API_URL}/api`;

export async function getHero(): Promise<HeroData | null> {
  try {
    const res = await fetch(
      `${REQUEST_URL}/hero-sections?populate[Icons][populate]=Image&populate[Image][populate]&populate[Buttons][populate]`
    );

    if (!res.ok) throw new Error("Falha ao buscar dados do Hero");

    const json = await res.json();
    const data = json.data?.[0];

    if (!data) return null;

    const icons: HeroIcon[] = (data.Icons || []).map((icon: any) => {
      const label = icon.Label || "";
      const imageUrl = icon.Image?.[0]?.url ? API_URL + icon.Image[0].url : "";
      return { label, image: imageUrl };
    });

    const buttons: HeroButton[] = (data.Buttons || [])
      .filter((button: any) => button.Label && button.Link)
      .map((button: any) => ({
        label: button.Label,
        link: button.Link,
      }));

    return {
      title: data.Title || "",
      subtitle: data.Subtitle || "",
      image: data.Image?.url ? API_URL + data.Image.url : "",
      icons,
      buttons,
    };
  } catch (error) {
    return null;
  }
}
