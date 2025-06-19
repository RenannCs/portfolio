// app/components/Hero.tsx
import { getHero } from "@/lib/api/heroService";
import SwiperIcons from "./SwiperIcons";

export default async function Hero() {
  const hero = await getHero();

  if (!hero) return null;
  
  return (
    <section id={hero.anchor} className="hero section-line">
      <div className="hero__container center">
        <div className="hero__content">
          {hero.title && <h2 className="hero__title h1">{hero.title}</h2>}
          {hero.description && (
            <p className="hero__subtitle">{hero.description}</p>
          )}
          {hero.icons?.length > 0 && <SwiperIcons icons={hero.icons} />}
          {hero.buttons?.length > 0 && (
            <div className="hero__actions">
              {hero.buttons.map(({ label, link }, i) =>
                label && link ? (
                  <a
                    key={i}
                    href={link}
                    className="button button--arrow button--secondary"
                  >
                    {label}
                  </a>
                ) : null
              )}
            </div>
          )}
        </div>
        {hero.image && (
          <div className="hero__image">
            <img src={hero.image} alt="Imagem ilustrativa" />
          </div>
        )}
      </div>
    </section>
  );
}
