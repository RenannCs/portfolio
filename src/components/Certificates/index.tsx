import { getCertificates } from "@/lib/api/certificateService";
import SwiperCertificates from "./SwiperCertificates";

export default async function Certificates() {
  const certificates = await getCertificates();
  if (!certificates) return null;

  return (
    <section className="certificates section-line">
      <div className="certificates__container">
        <h2 className="certificates__title">Certificados</h2>
        <SwiperCertificates certificates={certificates} />
      </div>
    </section>
  );
}
