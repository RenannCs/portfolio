// app/components/Hero.tsx
import { getHero } from "@/lib/api/heroService";
import SwiperIcons from "./SwiperIcons";

export default async function Hero() {
  const hero = await getHero();
  if (!hero) return null;

  return (
    <section className="hero section-line">
      <div className="hero__container center">
        <div className="hero__content">
          <h2 className="hero__title h1">{hero.title}</h2>
          <p className="hero__subtitle">{hero.subtitle}</p>
          <SwiperIcons icons={hero.icons} />
          <div className="hero__actions">
            {hero.buttons.map(({ label, link }, i) => (
              <a key={i} href={link} className="button button--arrow button--secondary">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="hero__image">
          <img src={hero.image} alt="Imagem ilustrativa" />
        </div>
      </div>
    </section>
  );
}
