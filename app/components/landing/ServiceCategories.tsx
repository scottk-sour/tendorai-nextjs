import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    link: '/suppliers/photocopiers',
    image: '/images/photocopier.png',
    fallbackColor: 'from-blue-600 to-blue-800',
    alt: 'Photocopiers and Multifunction Printers in Wales and South West England',
    title: 'Photocopier Suppliers',
    description: 'Compare photocopier quotes from local suppliers in Cardiff, Bristol, Swansea and across South Wales. Lease and purchase options for multifunction printers from established dealers.',
    features: ['Lease & Purchase Options', 'Local Service Engineers', 'Brands: Canon, Ricoh, Xerox, HP'],
  },
  {
    link: '/suppliers/telecoms',
    image: '/images/phone.png',
    fallbackColor: 'from-purple-600 to-purple-800',
    alt: 'Business Phone Systems and Telecoms in Wales and Bristol',
    title: 'Telecoms & Phone Systems',
    description: 'Find business telecoms providers in South Wales and the South West. Compare VoIP phone systems, broadband packages, and unified communications solutions from regional suppliers.',
    features: ['VoIP & Cloud Systems', 'Business Broadband', 'Local Installation & Support'],
  },
  {
    link: '/suppliers/cctv',
    image: '/images/cctv.png',
    fallbackColor: 'from-gray-700 to-gray-900',
    alt: 'CCTV and Security Systems across Wales and South West England',
    title: 'CCTV & Security',
    description: 'Request quotes for CCTV installation from security companies in Cardiff, Bristol, and the surrounding regions. HD camera systems, access control, and monitoring services.',
    features: ['HD & 4K Systems', 'Access Control', 'Local Installation Teams'],
  },
  {
    link: '/suppliers/it-services',
    image: '/images/wifi.png',
    fallbackColor: 'from-green-600 to-green-800',
    alt: 'IT Equipment and Support in South Wales and Bristol',
    title: 'IT Equipment & Support',
    description: 'Compare IT equipment suppliers and managed service providers in Wales and the South West. Computers, servers, networking, and ongoing technical support from local companies.',
    features: ['Hardware Supply', 'Network Setup', 'Managed IT Services'],
  },
];

export default function ServiceCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Office Equipment Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find suppliers for photocopiers, telecoms, CCTV, and IT equipment across Wales and South West England
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className={`relative h-48 bg-gradient-to-br ${service.fallbackColor}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-white/30">
                    {index === 0 && '🖨️'}
                    {index === 1 && '📞'}
                    {index === 2 && '📹'}
                    {index === 3 && '💻'}
                  </div>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold flex items-center gap-2">
                    View Suppliers
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
