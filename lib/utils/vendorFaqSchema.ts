interface VendorForFaq {
  company: string;
  services?: string[];
  practiceAreas?: string[];
  vendorType?: string;
  sraNumber?: string;
  fcaNumber?: string;
  icaewFirmNumber?: string;
  propertymarkNumber?: string;
  location?: {
    city?: string;
    region?: string;
    address?: string;
    postcode?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

interface FaqItem {
  question: string;
  answer: string;
}

const REGULATORY_BODIES: Record<string, { name: string; field: keyof VendorForFaq }> = {
  solicitor: { name: 'Solicitors Regulation Authority (SRA)', field: 'sraNumber' },
  'mortgage-advisor': { name: 'Financial Conduct Authority (FCA)', field: 'fcaNumber' },
  accountant: { name: 'Institute of Chartered Accountants in England and Wales (ICAEW)', field: 'icaewFirmNumber' },
  'estate-agent': { name: 'Propertymark', field: 'propertymarkNumber' },
};

export function buildVendorFaqs(vendor: VendorForFaq): FaqItem[] {
  const faqs: FaqItem[] = [];
  const name = vendor.company;

  // Services (always present)
  const serviceList = vendor.practiceAreas?.length
    ? vendor.practiceAreas
    : vendor.services;

  if (serviceList && serviceList.length > 0) {
    faqs.push({
      question: `What services does ${name} offer?`,
      answer: `${name} offers ${serviceList.join(', ')}.`,
    });
  }

  // Regulated
  const regInfo = REGULATORY_BODIES[vendor.vendorType || ''];
  if (regInfo) {
    const regNumber = vendor[regInfo.field] as string | undefined;
    if (regNumber) {
      faqs.push({
        question: `Is ${name} regulated?`,
        answer: `Yes, ${name} is registered with the ${regInfo.name}, registration number ${regNumber}.`,
      });
    }
  }

  // Location
  if (vendor.location?.city) {
    const parts = [vendor.location.address, vendor.location.city, vendor.location.region, vendor.location.postcode]
      .filter(Boolean);
    faqs.push({
      question: `Where is ${name} located?`,
      answer: `${name} is located in ${parts.join(', ')}.`,
    });
  }

  // Specialisms
  if (vendor.practiceAreas && vendor.practiceAreas.length > 0 && serviceList !== vendor.practiceAreas) {
    // Only add if we haven't already listed practiceAreas as the services answer
  } else if (vendor.practiceAreas && vendor.practiceAreas.length > 0 && vendor.services && vendor.services.length > 0) {
    // Both services and practiceAreas exist — services were listed above, so list specialisms too
    faqs.push({
      question: `What are ${name}'s specialisms?`,
      answer: `${name} specialises in ${vendor.practiceAreas.join(', ')}.`,
    });
  }

  // Contact
  const contactParts: string[] = [];
  if (vendor.contactInfo?.phone) contactParts.push(`phone at ${vendor.contactInfo.phone}`);
  if (vendor.contactInfo?.email) contactParts.push(`email at ${vendor.contactInfo.email}`);
  if (vendor.contactInfo?.website) contactParts.push(`their website at ${vendor.contactInfo.website}`);

  if (contactParts.length > 0) {
    faqs.push({
      question: `How do I contact ${name}?`,
      answer: `You can contact ${name} by ${contactParts.join(', or ')}.`,
    });
  }

  return faqs;
}

export function buildFaqPageJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
