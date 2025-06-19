import { getCertificateSection } from "@/lib/api/certificateService";
import SwiperCertificates from "./SwiperCertificates";

export default async function Certificates() {
  const certificatesSection = await getCertificateSection();
  if (!certificatesSection) return null;

  return (
    <section className="certificates section-line">
      <div className="certificates__container">
        <h2 className="certificates__title">{certificatesSection.title}</h2>
        {certificatesSection.description && (<p className="certificates__description">{certificatesSection.description}</p>)}
        <SwiperCertificates certificates={certificatesSection.certificates} />
      </div>
    </section>
  );
}
