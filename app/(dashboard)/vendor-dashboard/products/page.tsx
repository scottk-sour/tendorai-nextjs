'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { hasTierAccess } from '@/app/components/dashboard/TierGate';

type ServiceCategory = 'Photocopiers' | 'Telecoms' | 'CCTV' | 'IT';

interface Product {
  _id: string;
  manufacturer: string;
  model: string;
  description?: string;
  category: string;
  serviceCategory?: ServiceCategory;
  speed?: number;
  isA3?: boolean;
  isColour?: boolean;
  features?: string[];
  minVolume?: number;
  maxVolume?: number;
  costs?: {
    machineCost?: number;
    installation?: number;
    profitMargin?: number;
    totalMachineCost?: number;
    cpcRates?: {
      A4Mono?: number;
      A4Colour?: number;
      A3Mono?: number;
      A3Colour?: number;
    };
  };
  leaseRates?: {
    term36?: number;
    term48?: number;
    term60?: number;
  };
  service?: {
    level?: string;
    responseTime?: string;
    quarterlyService?: number;
    includesToner?: boolean;
    includesPartsLabour?: boolean;
  };
  telecomsPricing?: {
    systemType?: string;
    perUserMonthly?: number;
    minUsers?: number;
    maxUsers?: number;
    handsetCost?: number;
    handsetModel?: string;
    callPackage?: { packageType?: string; includedMinutes?: number; perMinuteRate?: number };
    broadbandIncluded?: boolean;
    broadbandSpeed?: string;
    broadbandMonthlyCost?: number;
    setupFee?: number;
    contractTermMonths?: number;
    features?: string[];
    numberPortingFee?: number;
  };
  cctvPricing?: {
    systemType?: string;
    perCameraCost?: number;
    cameraModel?: string;
    resolution?: string;
    indoor?: boolean;
    outdoor?: boolean;
    nightVision?: boolean;
    nvrCost?: number;
    nvrChannels?: number;
    installationPerCamera?: number;
    installationFlat?: number;
    monthlyMonitoring?: number;
    cloudStorageMonthly?: number;
    maintenanceAnnual?: number;
    contractTermMonths?: number;
    features?: string[];
    minCameras?: number;
    maxCameras?: number;
  };
  itPricing?: {
    serviceType?: string;
    perUserMonthly?: number;
    perDeviceMonthly?: number;
    minUsers?: number;
    maxUsers?: number;
    serverManagementMonthly?: number;
    includes?: string[];
    m365LicenceIncluded?: boolean;
    m365CostPerUser?: number;
    cybersecurityAddon?: number;
    backupPerGb?: number;
    setupFee?: number;
    projectDayRate?: number;
    contractTermMonths?: number;
    responseTimeSLA?: string;
    supportHours?: string;
    accreditations?: string[];
  };
  status: string;
}

interface ProductFormData {
  serviceCategory: ServiceCategory;
  manufacturer: string;
  model: string;
  description: string;
  category: string;
  // Copier fields
  speed: number;
  isA3: boolean;
  isColour: boolean;
  features: string[];
  minVolume: number;
  maxVolume: number;
  machineCost: number;
  installation: number;
  profitMargin: number;
  cpcA4Mono: number;
  cpcA4Colour: number;
  cpcA3Mono: number;
  cpcA3Colour: number;
  lease36: number;
  lease48: number;
  lease60: number;
  serviceLevel: string;
  responseTime: string;
  quarterlyService: number;
  includesToner: boolean;
  includesPartsLabour: boolean;
  // Telecoms fields
  telecomsSystemType: string;
  telecomsPerUserMonthly: number;
  telecomsMinUsers: number;
  telecomsMaxUsers: number;
  telecomsHandsetCost: number;
  telecomsHandsetModel: string;
  telecomsCallPackageType: string;
  telecomsBroadbandIncluded: boolean;
  telecomsBroadbandSpeed: string;
  telecomsBroadbandMonthlyCost: number;
  telecomsSetupFee: number;
  telecomsContractTermMonths: number;
  telecomsFeatures: string[];
  telecomsNumberPortingFee: number;
  // CCTV fields
  cctvSystemType: string;
  cctvPerCameraCost: number;
  cctvCameraModel: string;
  cctvResolution: string;
  cctvIndoor: boolean;
  cctvOutdoor: boolean;
  cctvNightVision: boolean;
  cctvNvrCost: number;
  cctvNvrChannels: number;
  cctvInstallationPerCamera: number;
  cctvInstallationFlat: number;
  cctvMonthlyMonitoring: number;
  cctvCloudStorageMonthly: number;
  cctvMaintenanceAnnual: number;
  cctvContractTermMonths: number;
  cctvFeatures: string[];
  cctvMinCameras: number;
  cctvMaxCameras: number;
  // IT fields
  itServiceType: string;
  itPerUserMonthly: number;
  itPerDeviceMonthly: number;
  itMinUsers: number;
  itMaxUsers: number;
  itServerManagementMonthly: number;
  itIncludes: string[];
  itM365LicenceIncluded: boolean;
  itM365CostPerUser: number;
  itCybersecurityAddon: number;
  itBackupPerGb: number;
  itSetupFee: number;
  itProjectDayRate: number;
  itContractTermMonths: number;
  itResponseTimeSLA: string;
  itSupportHours: string;
  itAccreditations: string[];
}

const CATEGORIES_MAP: Record<ServiceCategory, { value: string; label: string }[]> = {
  Photocopiers: [
    { value: 'A4 Printers', label: 'A4 Printers' },
    { value: 'A4 MFP', label: 'A4 MFP (Multifunction)' },
    { value: 'A3 MFP', label: 'A3 MFP (Multifunction)' },
    { value: 'SRA3 MFP', label: 'SRA3 MFP (Production)' },
  ],
  Telecoms: [
    { value: 'Cloud VoIP', label: 'Cloud VoIP (Hosted)' },
    { value: 'On-Premise PBX', label: 'On-Premise PBX' },
    { value: 'Microsoft Teams', label: 'Microsoft Teams Calling' },
    { value: 'Hybrid Phone System', label: 'Hybrid Phone System' },
  ],
  CCTV: [
    { value: 'IP Camera System', label: 'IP Camera System' },
    { value: 'Analogue System', label: 'Analogue System' },
    { value: 'Hybrid CCTV', label: 'Hybrid CCTV' },
    { value: 'Cloud-Based CCTV', label: 'Cloud-Based CCTV' },
  ],
  IT: [
    { value: 'Fully Managed IT', label: 'Fully Managed IT' },
    { value: 'Co-Managed IT', label: 'Co-Managed IT' },
    { value: 'Project-Based IT', label: 'Project-Based IT' },
    { value: 'IT Consultancy', label: 'IT Consultancy' },
  ],
};

const MANUFACTURERS_MAP: Record<ServiceCategory, string[]> = {
  Photocopiers: ['Canon', 'Konica Minolta', 'Xerox', 'Sharp', 'Ricoh', 'Brother', 'Lexmark', 'HP', 'Epson', 'Kyocera', 'Develop', 'Toshiba', 'Other'],
  Telecoms: ['3CX', 'Mitel', 'Avaya', 'Cisco', 'Gamma', 'RingCentral', 'Yealink', 'Poly', 'Grandstream', '8x8', 'Vonage', 'Other'],
  CCTV: ['Hikvision', 'Dahua', 'Axis', 'Avigilon', 'Hanwha', 'Uniview', 'Bosch', 'Honeywell', 'Swann', 'Other'],
  IT: ['Microsoft', 'Dell', 'HP', 'Cisco', 'Sophos', 'Datto', 'SentinelOne', 'CrowdStrike', 'Veeam', 'Other'],
};

const COPIER_FEATURES = [
  'Scanning', 'Duplex', 'Stapling', 'Booklet Finisher',
  'Hole Punch', 'Fax', 'Wi-Fi', 'Cloud Print', 'Mobile Print',
  'OCR', 'Document Management', 'Secure Print'
];

const TELECOMS_FEATURES = [
  'Auto Attendant/IVR', 'Call Recording', 'Mobile App', 'Video Conferencing',
  'CRM Integration', 'Call Queuing', 'Voicemail to Email', 'Hot Desking',
  'Call Analytics', 'Conference Bridge'
];

const CCTV_FEATURES = [
  'Night Vision', 'Motion Detection', 'Remote Mobile Viewing', 'ANPR',
  'Facial Recognition', 'Two-Way Audio', 'PTZ', 'Vandal-Proof',
  'Weatherproof (IP67)', 'AI Analytics'
];

const IT_SERVICES = [
  'Help Desk Support', 'Cloud Migration', 'Microsoft 365 Management',
  'Cybersecurity', 'Backup & Disaster Recovery', 'Network Infrastructure',
  'Hardware Procurement', 'VoIP/Telecoms', 'Server Management', 'Patch Management'
];

const SERVICE_LEVELS = ['Basic', 'Standard', 'Premium'];
const RESPONSE_TIMES = ['4hr', '8hr', 'Next day'];

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

const emptyFormData: ProductFormData = {
  serviceCategory: 'Photocopiers',
  manufacturer: '',
  model: '',
  description: '',
  category: 'A3 MFP',
  // Copier
  speed: 30,
  isA3: true,
  isColour: true,
  features: [],
  minVolume: 5000,
  maxVolume: 20000,
  machineCost: 2000,
  installation: 250,
  profitMargin: 250,
  cpcA4Mono: 0.005,
  cpcA4Colour: 0.045,
  cpcA3Mono: 0.007,
  cpcA3Colour: 0.065,
  lease36: 150,
  lease48: 120,
  lease60: 100,
  serviceLevel: 'Standard',
  responseTime: '8hr',
  quarterlyService: 75,
  includesToner: true,
  includesPartsLabour: true,
  // Telecoms
  telecomsSystemType: 'Cloud VoIP',
  telecomsPerUserMonthly: 12.50,
  telecomsMinUsers: 1,
  telecomsMaxUsers: 50,
  telecomsHandsetCost: 80,
  telecomsHandsetModel: '',
  telecomsCallPackageType: 'Unlimited UK',
  telecomsBroadbandIncluded: false,
  telecomsBroadbandSpeed: '',
  telecomsBroadbandMonthlyCost: 0,
  telecomsSetupFee: 0,
  telecomsContractTermMonths: 36,
  telecomsFeatures: [],
  telecomsNumberPortingFee: 0,
  // CCTV
  cctvSystemType: 'IP Camera System',
  cctvPerCameraCost: 150,
  cctvCameraModel: '',
  cctvResolution: 'HD 1080p',
  cctvIndoor: true,
  cctvOutdoor: true,
  cctvNightVision: true,
  cctvNvrCost: 300,
  cctvNvrChannels: 8,
  cctvInstallationPerCamera: 75,
  cctvInstallationFlat: 0,
  cctvMonthlyMonitoring: 0,
  cctvCloudStorageMonthly: 0,
  cctvMaintenanceAnnual: 0,
  cctvContractTermMonths: 36,
  cctvFeatures: [],
  cctvMinCameras: 1,
  cctvMaxCameras: 16,
  // IT
  itServiceType: 'Fully Managed',
  itPerUserMonthly: 45,
  itPerDeviceMonthly: 0,
  itMinUsers: 1,
  itMaxUsers: 100,
  itServerManagementMonthly: 0,
  itIncludes: [],
  itM365LicenceIncluded: false,
  itM365CostPerUser: 0,
  itCybersecurityAddon: 0,
  itBackupPerGb: 0,
  itSetupFee: 0,
  itProjectDayRate: 0,
  itContractTermMonths: 12,
  itResponseTimeSLA: '4 hours',
  itSupportHours: 'Business hours (9-5)',
  itAccreditations: [],
};

export default function ProductsPage() {
  const { getCurrentToken } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState('free');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyFormData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    const token = getCurrentToken();
    if (!token) return;

    setLoading(true);
    try {
      const [productsRes, profileRes] = await Promise.all([
        fetch(`${API_URL}/api/vendors/products`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/vendors/profile`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      if (productsRes.ok) {
        const data = await productsRes.json();
        setProducts(data.data || data.products || []);
      }

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setTier(profileData.vendor?.tier || 'free');
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  }, [getCurrentToken]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Tier-aware product limits: free=3, visible=10, verified=unlimited
  const getProductLimit = (t: string) => {
    const normalized = t?.toLowerCase() || 'free';
    if (['verified', 'managed'].includes(normalized)) return Infinity;
    if (['visible', 'basic'].includes(normalized)) return 10;
    return 3;
  };
  const productLimit = getProductLimit(tier);
  const hasReachedLimit = productLimit !== Infinity && products.length >= productLimit;
  const productsRemaining = productLimit === Infinity ? null : productLimit - products.length;

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category))].filter(Boolean);

  // Filter and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesSearch =
      !searchTerm ||
      product.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.model?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Open modal for new product
  const handleAddProduct = () => {
    if (hasReachedLimit) return;
    setEditingProduct(null);
    setFormData(emptyFormData);
    setError(null);
    setSuccess(null);
    setShowModal(true);
  };

  // Open modal for editing
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    const sc = (product.serviceCategory || 'Photocopiers') as ServiceCategory;
    setFormData({
      ...emptyFormData,
      serviceCategory: sc,
      manufacturer: product.manufacturer || '',
      model: product.model || '',
      description: product.description || '',
      category: product.category || CATEGORIES_MAP[sc][0]?.value || '',
      // Copier fields
      speed: product.speed || 30,
      isA3: product.isA3 ?? true,
      isColour: product.isColour ?? true,
      features: product.features || [],
      minVolume: product.minVolume || 5000,
      maxVolume: product.maxVolume || 20000,
      machineCost: product.costs?.machineCost || 2000,
      installation: product.costs?.installation || 250,
      profitMargin: product.costs?.profitMargin || 250,
      cpcA4Mono: product.costs?.cpcRates?.A4Mono || 0.005,
      cpcA4Colour: product.costs?.cpcRates?.A4Colour || 0.045,
      cpcA3Mono: product.costs?.cpcRates?.A3Mono || 0.007,
      cpcA3Colour: product.costs?.cpcRates?.A3Colour || 0.065,
      lease36: product.leaseRates?.term36 || 150,
      lease48: product.leaseRates?.term48 || 120,
      lease60: product.leaseRates?.term60 || 100,
      serviceLevel: product.service?.level || 'Standard',
      responseTime: product.service?.responseTime || '8hr',
      quarterlyService: product.service?.quarterlyService || 75,
      includesToner: product.service?.includesToner ?? true,
      includesPartsLabour: product.service?.includesPartsLabour ?? true,
      // Telecoms
      telecomsSystemType: product.telecomsPricing?.systemType || 'Cloud VoIP',
      telecomsPerUserMonthly: product.telecomsPricing?.perUserMonthly || 12.50,
      telecomsMinUsers: product.telecomsPricing?.minUsers || 1,
      telecomsMaxUsers: product.telecomsPricing?.maxUsers || 50,
      telecomsHandsetCost: product.telecomsPricing?.handsetCost || 80,
      telecomsHandsetModel: product.telecomsPricing?.handsetModel || '',
      telecomsCallPackageType: product.telecomsPricing?.callPackage?.packageType || 'Unlimited UK',
      telecomsBroadbandIncluded: product.telecomsPricing?.broadbandIncluded || false,
      telecomsBroadbandSpeed: product.telecomsPricing?.broadbandSpeed || '',
      telecomsBroadbandMonthlyCost: product.telecomsPricing?.broadbandMonthlyCost || 0,
      telecomsSetupFee: product.telecomsPricing?.setupFee || 0,
      telecomsContractTermMonths: product.telecomsPricing?.contractTermMonths || 36,
      telecomsFeatures: product.telecomsPricing?.features || [],
      telecomsNumberPortingFee: product.telecomsPricing?.numberPortingFee || 0,
      // CCTV
      cctvSystemType: product.cctvPricing?.systemType || 'IP Camera System',
      cctvPerCameraCost: product.cctvPricing?.perCameraCost || 150,
      cctvCameraModel: product.cctvPricing?.cameraModel || '',
      cctvResolution: product.cctvPricing?.resolution || 'HD 1080p',
      cctvIndoor: product.cctvPricing?.indoor ?? true,
      cctvOutdoor: product.cctvPricing?.outdoor ?? true,
      cctvNightVision: product.cctvPricing?.nightVision ?? true,
      cctvNvrCost: product.cctvPricing?.nvrCost || 300,
      cctvNvrChannels: product.cctvPricing?.nvrChannels || 8,
      cctvInstallationPerCamera: product.cctvPricing?.installationPerCamera || 75,
      cctvInstallationFlat: product.cctvPricing?.installationFlat || 0,
      cctvMonthlyMonitoring: product.cctvPricing?.monthlyMonitoring || 0,
      cctvCloudStorageMonthly: product.cctvPricing?.cloudStorageMonthly || 0,
      cctvMaintenanceAnnual: product.cctvPricing?.maintenanceAnnual || 0,
      cctvContractTermMonths: product.cctvPricing?.contractTermMonths || 36,
      cctvFeatures: product.cctvPricing?.features || [],
      cctvMinCameras: product.cctvPricing?.minCameras || 1,
      cctvMaxCameras: product.cctvPricing?.maxCameras || 16,
      // IT
      itServiceType: product.itPricing?.serviceType || 'Fully Managed',
      itPerUserMonthly: product.itPricing?.perUserMonthly || 45,
      itPerDeviceMonthly: product.itPricing?.perDeviceMonthly || 0,
      itMinUsers: product.itPricing?.minUsers || 1,
      itMaxUsers: product.itPricing?.maxUsers || 100,
      itServerManagementMonthly: product.itPricing?.serverManagementMonthly || 0,
      itIncludes: product.itPricing?.includes || [],
      itM365LicenceIncluded: product.itPricing?.m365LicenceIncluded || false,
      itM365CostPerUser: product.itPricing?.m365CostPerUser || 0,
      itCybersecurityAddon: product.itPricing?.cybersecurityAddon || 0,
      itBackupPerGb: product.itPricing?.backupPerGb || 0,
      itSetupFee: product.itPricing?.setupFee || 0,
      itProjectDayRate: product.itPricing?.projectDayRate || 0,
      itContractTermMonths: product.itPricing?.contractTermMonths || 12,
      itResponseTimeSLA: product.itPricing?.responseTimeSLA || '4 hours',
      itSupportHours: product.itPricing?.supportHours || 'Business hours (9-5)',
      itAccreditations: product.itPricing?.accreditations || [],
    });
    setError(null);
    setSuccess(null);
    setShowModal(true);
  };

  // Toggle product status
  const handleToggleStatus = async (product: Product) => {
    const token = getCurrentToken();
    if (!token) return;

    const newStatus = product.status === 'active' ? 'inactive' : 'active';

    try {
      const response = await fetch(`${API_URL}/api/vendors/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchProducts();
        setSuccess(`Product ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle feature toggle (generic for any feature list)
  const handleFeatureToggle = (feature: string, field: keyof ProductFormData = 'features') => {
    setFormData(prev => {
      const current = prev[field] as string[];
      return {
        ...prev,
        [field]: current.includes(feature)
          ? current.filter(f => f !== feature)
          : [...current, feature],
      };
    });
  };

  // Handle service category switch
  const handleServiceCategoryChange = (sc: ServiceCategory) => {
    const firstCategory = CATEGORIES_MAP[sc][0]?.value || '';
    setFormData(prev => ({
      ...prev,
      serviceCategory: sc,
      category: firstCategory,
      manufacturer: '',
    }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getCurrentToken();
    if (!token) return;

    // Validate required fields
    if (!formData.manufacturer || !formData.model || !formData.category) {
      setError('Manufacturer, model, and category are required');
      return;
    }

    setSaving(true);
    setError(null);

    // Build category-specific product data
    const baseData = {
      serviceCategory: formData.serviceCategory,
      manufacturer: formData.manufacturer,
      model: formData.model,
      description: formData.description,
      category: formData.category,
      status: 'active',
    };

    let productData: Record<string, unknown>;

    if (formData.serviceCategory === 'Telecoms') {
      productData = {
        ...baseData,
        telecomsPricing: {
          systemType: formData.telecomsSystemType,
          perUserMonthly: formData.telecomsPerUserMonthly,
          minUsers: formData.telecomsMinUsers,
          maxUsers: formData.telecomsMaxUsers,
          handsetCost: formData.telecomsHandsetCost,
          handsetModel: formData.telecomsHandsetModel,
          callPackage: {
            packageType: formData.telecomsCallPackageType,
          },
          broadbandIncluded: formData.telecomsBroadbandIncluded,
          broadbandSpeed: formData.telecomsBroadbandSpeed,
          broadbandMonthlyCost: formData.telecomsBroadbandMonthlyCost,
          setupFee: formData.telecomsSetupFee,
          contractTermMonths: formData.telecomsContractTermMonths,
          features: formData.telecomsFeatures,
          numberPortingFee: formData.telecomsNumberPortingFee,
        },
      };
    } else if (formData.serviceCategory === 'CCTV') {
      productData = {
        ...baseData,
        cctvPricing: {
          systemType: formData.cctvSystemType,
          perCameraCost: formData.cctvPerCameraCost,
          cameraModel: formData.cctvCameraModel,
          resolution: formData.cctvResolution,
          indoor: formData.cctvIndoor,
          outdoor: formData.cctvOutdoor,
          nightVision: formData.cctvNightVision,
          nvrCost: formData.cctvNvrCost,
          nvrChannels: formData.cctvNvrChannels,
          installationPerCamera: formData.cctvInstallationPerCamera,
          installationFlat: formData.cctvInstallationFlat,
          monthlyMonitoring: formData.cctvMonthlyMonitoring,
          cloudStorageMonthly: formData.cctvCloudStorageMonthly,
          maintenanceAnnual: formData.cctvMaintenanceAnnual,
          contractTermMonths: formData.cctvContractTermMonths,
          features: formData.cctvFeatures,
          minCameras: formData.cctvMinCameras,
          maxCameras: formData.cctvMaxCameras,
        },
      };
    } else if (formData.serviceCategory === 'IT') {
      productData = {
        ...baseData,
        itPricing: {
          serviceType: formData.itServiceType,
          perUserMonthly: formData.itPerUserMonthly,
          perDeviceMonthly: formData.itPerDeviceMonthly,
          minUsers: formData.itMinUsers,
          maxUsers: formData.itMaxUsers,
          serverManagementMonthly: formData.itServerManagementMonthly,
          includes: formData.itIncludes,
          m365LicenceIncluded: formData.itM365LicenceIncluded,
          m365CostPerUser: formData.itM365CostPerUser,
          cybersecurityAddon: formData.itCybersecurityAddon,
          backupPerGb: formData.itBackupPerGb,
          setupFee: formData.itSetupFee,
          projectDayRate: formData.itProjectDayRate,
          contractTermMonths: formData.itContractTermMonths,
          responseTimeSLA: formData.itResponseTimeSLA,
          supportHours: formData.itSupportHours,
          accreditations: formData.itAccreditations,
        },
      };
    } else {
      // Photocopiers
      productData = {
        ...baseData,
        speed: formData.speed,
        isA3: formData.isA3,
        isColour: formData.isColour,
        features: formData.features,
        minVolume: formData.minVolume,
        maxVolume: formData.maxVolume,
        paperSizes: {
          primary: formData.isA3 ? 'A3' : 'A4',
          supported: formData.isA3 ? ['A3', 'A4'] : ['A4'],
        },
        costs: {
          machineCost: formData.machineCost,
          installation: formData.installation,
          profitMargin: formData.profitMargin,
          totalMachineCost: formData.machineCost + formData.installation + formData.profitMargin,
          cpcRates: {
            A4Mono: formData.cpcA4Mono,
            A4Colour: formData.cpcA4Colour,
            A3Mono: formData.cpcA3Mono,
            A3Colour: formData.cpcA3Colour,
          },
        },
        leaseRates: {
          term36: formData.lease36,
          term48: formData.lease48,
          term60: formData.lease60,
        },
        service: {
          level: formData.serviceLevel,
          responseTime: formData.responseTime,
          quarterlyService: formData.quarterlyService,
          includesToner: formData.includesToner,
          includesPartsLabour: formData.includesPartsLabour,
        },
      };
    }

    try {
      const url = editingProduct
        ? `${API_URL}/api/vendors/products/${editingProduct._id}`
        : `${API_URL}/api/vendors/products`;

      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowModal(false);
        fetchProducts();
        const slots = data.remainingSlots;
        const slotsMsg = slots !== null && slots !== undefined ? ` (${slots} slot${slots !== 1 ? 's' : ''} remaining)` : '';
        setSuccess((editingProduct ? 'Product updated successfully' : 'Product created successfully') + slotsMsg);
        setTimeout(() => setSuccess(null), 5000);
      } else if (response.status === 403) {
        setError(data.message || 'Product limit reached. Upgrade your plan to add more products.');
      } else {
        setError(data.message || data.errors?.join(', ') || 'Failed to save product');
      }
    } catch (err) {
      console.error('Failed to save product:', err);
      setError('Failed to save product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.manufacturer} ${product.model}"?`)) {
      return;
    }

    const token = getCurrentToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/vendors/products/${product._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        fetchProducts();
        setSuccess('Product deleted');
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  // Get product card summary based on service category
  const getProductSummary = (product: Product) => {
    const sc = product.serviceCategory || 'Photocopiers';
    if (sc === 'Telecoms' && product.telecomsPricing) {
      return [
        { label: 'Per user/mo', value: `£${product.telecomsPricing.perUserMonthly?.toFixed(2) || '—'}` },
        { label: 'Users', value: `${product.telecomsPricing.minUsers || '—'} - ${product.telecomsPricing.maxUsers || '—'}` },
        { label: 'System', value: product.telecomsPricing.systemType || '—' },
      ];
    }
    if (sc === 'CCTV' && product.cctvPricing) {
      return [
        { label: 'Per camera', value: `£${product.cctvPricing.perCameraCost?.toFixed(0) || '—'}` },
        { label: 'Cameras', value: `${product.cctvPricing.minCameras || '—'} - ${product.cctvPricing.maxCameras || '—'}` },
        { label: 'Resolution', value: product.cctvPricing.resolution || '—' },
      ];
    }
    if (sc === 'IT' && product.itPricing) {
      return [
        { label: 'Per user/mo', value: `£${product.itPricing.perUserMonthly?.toFixed(2) || '—'}` },
        { label: 'Users', value: `${product.itPricing.minUsers || '—'} - ${product.itPricing.maxUsers || '—'}` },
        { label: 'SLA', value: product.itPricing.responseTimeSLA || '—' },
      ];
    }
    // Copier
    return [
      { label: 'Speed', value: product.speed ? `${product.speed} ppm` : '—' },
      { label: 'Volume', value: product.minVolume && product.maxVolume ? `${product.minVolume.toLocaleString()} - ${product.maxVolume.toLocaleString()}` : '—' },
      { label: 'Mono CPC', value: product.costs?.cpcRates?.A4Mono ? `£${product.costs.cpcRates.A4Mono.toFixed(4)}` : '—' },
    ];
  };

  const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
    Photocopiers: 'Copiers',
    Telecoms: 'Telecoms',
    CCTV: 'CCTV',
    IT: 'IT',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg">{success}</div>
      )}

      {/* Tier Limit Warning */}
      {productLimit !== Infinity && (
        <div className={`p-4 rounded-lg ${hasReachedLimit ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              {hasReachedLimit ? (
                <>
                  <p className="font-medium text-amber-800">Product limit reached ({productLimit} products)</p>
                  <p className="text-sm text-amber-600">
                    You&apos;ve used all {productLimit} product slots on your current plan. Upgrade to add more products.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-blue-800">{productsRemaining} product slot{productsRemaining !== 1 ? 's' : ''} remaining</p>
                  <p className="text-sm text-blue-600">
                    {!hasTierAccess(tier, 'visible')
                      ? 'Upgrade to Visible for up to 10 products and AI visibility insights.'
                      : 'Upgrade to Verified for unlimited products and maximum AI ranking.'}
                  </p>
                </>
              )}
            </div>
            <Link
              href="/vendor-dashboard/settings?tab=subscription"
              className="btn-primary py-2 px-4 text-sm whitespace-nowrap"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={handleAddProduct}
          disabled={hasReachedLimit}
          className={`btn-primary py-2 px-4 ${hasReachedLimit ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
          </div>
          {categories.length > 0 && (
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="input w-full sm:w-48"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{products.length}</div>
          <div className="text-sm text-gray-500">Total Products</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {products.filter((p) => p.status === 'active').length}
          </div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">
            {products.filter((p) => p.status !== 'active').length}
          </div>
          <div className="text-sm text-gray-500">Inactive</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
          <div className="text-sm text-gray-500">Categories</div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="card p-8 text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          {searchTerm || filterCategory !== 'all' ? (
            <p>No products match your search</p>
          ) : (
            <>
              <p>No products yet</p>
              <p className="text-sm mt-1">Add products to your catalog to get started</p>
              <button onClick={handleAddProduct} className="btn-primary py-2 px-4 mt-4">
                Add Your First Product
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="card-hover p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {product.manufacturer} {product.model}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-sm text-gray-500">{product.category}</p>
                    {product.serviceCategory && product.serviceCategory !== 'Photocopiers' && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">
                        {SERVICE_CATEGORY_LABELS[product.serviceCategory as ServiceCategory] || product.serviceCategory}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleToggleStatus(product)}
                  className={`px-2 py-0.5 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                    product.status === 'active'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {product.status || 'active'}
                </button>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                {getProductSummary(product).map(({ label, value }) => (
                  value !== '—' && (
                    <div key={label} className="flex justify-between">
                      <span>{label}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  )
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="flex-1 btn-secondary py-1.5 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product)}
                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="flex min-h-full items-start justify-center p-4 pt-16">
            <div className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>
                )}

                {/* Service Category Selector */}
                {!editingProduct && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['Photocopiers', 'Telecoms', 'CCTV', 'IT'] as ServiceCategory[]).map(sc => (
                        <button
                          key={sc}
                          type="button"
                          onClick={() => handleServiceCategoryChange(sc)}
                          className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                            formData.serviceCategory === sc
                              ? 'bg-purple-600 text-white border-purple-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {SERVICE_CATEGORY_LABELS[sc]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manufacturer <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleInputChange}
                        className="input"
                        required
                      >
                        <option value="">Select manufacturer</option>
                        {MANUFACTURERS_MAP[formData.serviceCategory].map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        className="input"
                        placeholder={formData.serviceCategory === 'Telecoms' ? 'e.g. Cloud VoIP Business' : formData.serviceCategory === 'CCTV' ? 'e.g. 8-Camera Bundle' : formData.serviceCategory === 'IT' ? 'e.g. Managed IT Pro' : 'e.g. iR-ADV C5535i'}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="input"
                        required
                      >
                        {CATEGORIES_MAP[formData.serviceCategory].map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    {formData.serviceCategory === 'Photocopiers' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Speed (ppm)
                        </label>
                        <input
                          type="number"
                          name="speed"
                          value={formData.speed}
                          onChange={handleInputChange}
                          className="input"
                          min="1"
                          max="200"
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="input"
                      rows={2}
                      placeholder="Brief description of the product..."
                    />
                  </div>
                  {formData.serviceCategory === 'Photocopiers' && (
                    <div className="mt-4 flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="isColour"
                          checked={formData.isColour}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-purple-600 rounded"
                        />
                        <span className="text-sm text-gray-700">Colour capable</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="isA3"
                          checked={formData.isA3}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-purple-600 rounded"
                        />
                        <span className="text-sm text-gray-700">A3 capable</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* ==================== COPIER FIELDS ==================== */}
                {formData.serviceCategory === 'Photocopiers' && (
                  <>
                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {COPIER_FEATURES.map(feature => (
                          <button
                            key={feature}
                            type="button"
                            onClick={() => handleFeatureToggle(feature, 'features')}
                            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                              formData.features.includes(feature)
                                ? 'bg-purple-100 border-purple-300 text-purple-700'
                                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {feature}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Volume Range */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Volume Range (pages/month)</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Volume</label>
                          <input type="number" name="minVolume" value={formData.minVolume} onChange={handleInputChange} className="input" min="0" step="1000" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Volume</label>
                          <input type="number" name="maxVolume" value={formData.maxVolume} onChange={handleInputChange} className="input" min="0" step="1000" />
                        </div>
                      </div>
                    </div>

                    {/* Machine Costs */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Machine Costs (£)</h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Machine Cost</label>
                          <input type="number" name="machineCost" value={formData.machineCost} onChange={handleInputChange} className="input" min="0" step="100" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Installation</label>
                          <input type="number" name="installation" value={formData.installation} onChange={handleInputChange} className="input" min="0" step="50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Profit Margin</label>
                          <input type="number" name="profitMargin" value={formData.profitMargin} onChange={handleInputChange} className="input" min="0" step="50" />
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Total: £{(formData.machineCost + formData.installation + formData.profitMargin).toLocaleString()}
                      </p>
                    </div>

                    {/* CPC Rates */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">CPC Rates (£ per click)</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">A4 Mono</label>
                          <input type="number" name="cpcA4Mono" value={formData.cpcA4Mono} onChange={handleInputChange} className="input" min="0" step="0.001" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">A4 Colour</label>
                          <input type="number" name="cpcA4Colour" value={formData.cpcA4Colour} onChange={handleInputChange} className="input" min="0" step="0.001" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">A3 Mono</label>
                          <input type="number" name="cpcA3Mono" value={formData.cpcA3Mono} onChange={handleInputChange} className="input" min="0" step="0.001" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">A3 Colour</label>
                          <input type="number" name="cpcA3Colour" value={formData.cpcA3Colour} onChange={handleInputChange} className="input" min="0" step="0.001" />
                        </div>
                      </div>
                    </div>

                    {/* Lease Rates */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Quarterly Lease Rates (£)</h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">36 months</label>
                          <input type="number" name="lease36" value={formData.lease36} onChange={handleInputChange} className="input" min="0" step="10" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">48 months</label>
                          <input type="number" name="lease48" value={formData.lease48} onChange={handleInputChange} className="input" min="0" step="10" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">60 months</label>
                          <input type="number" name="lease60" value={formData.lease60} onChange={handleInputChange} className="input" min="0" step="10" />
                        </div>
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Service Details</h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Service Level</label>
                          <select name="serviceLevel" value={formData.serviceLevel} onChange={handleInputChange} className="input">
                            {SERVICE_LEVELS.map(level => (<option key={level} value={level}>{level}</option>))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Response Time</label>
                          <select name="responseTime" value={formData.responseTime} onChange={handleInputChange} className="input">
                            {RESPONSE_TIMES.map(time => (<option key={time} value={time}>{time}</option>))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Quarterly Service (£)</label>
                          <input type="number" name="quarterlyService" value={formData.quarterlyService} onChange={handleInputChange} className="input" min="0" step="10" />
                        </div>
                      </div>
                      <div className="mt-4 flex gap-6">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" name="includesToner" checked={formData.includesToner} onChange={handleInputChange} className="w-4 h-4 text-purple-600 rounded" />
                          <span className="text-sm text-gray-700">Includes toner</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" name="includesPartsLabour" checked={formData.includesPartsLabour} onChange={handleInputChange} className="w-4 h-4 text-purple-600 rounded" />
                          <span className="text-sm text-gray-700">Includes parts &amp; labour</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {/* ==================== TELECOMS FIELDS ==================== */}
                {formData.serviceCategory === 'Telecoms' && (
                  <>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Telecoms Pricing</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">System Type</label>
                          <select name="telecomsSystemType" value={formData.telecomsSystemType} onChange={handleInputChange} className="input">
                            <option value="Cloud VoIP">Cloud VoIP</option>
                            <option value="On-Premise PBX">On-Premise PBX</option>
                            <option value="Microsoft Teams">Microsoft Teams</option>
                            <option value="Hybrid">Hybrid</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Per User / Month (£) <span className="text-red-500">*</span></label>
                          <input type="number" name="telecomsPerUserMonthly" value={formData.telecomsPerUserMonthly} onChange={handleInputChange} className="input" min="0" step="0.50" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Min Users</label>
                          <input type="number" name="telecomsMinUsers" value={formData.telecomsMinUsers} onChange={handleInputChange} className="input" min="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Max Users</label>
                          <input type="number" name="telecomsMaxUsers" value={formData.telecomsMaxUsers} onChange={handleInputChange} className="input" min="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Handset Model</label>
                          <input type="text" name="telecomsHandsetModel" value={formData.telecomsHandsetModel} onChange={handleInputChange} className="input" placeholder="e.g. Yealink T54W" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Handset Cost (£)</label>
                          <input type="number" name="telecomsHandsetCost" value={formData.telecomsHandsetCost} onChange={handleInputChange} className="input" min="0" step="10" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Call Package</label>
                          <select name="telecomsCallPackageType" value={formData.telecomsCallPackageType} onChange={handleInputChange} className="input">
                            <option value="Unlimited UK">Unlimited UK</option>
                            <option value="Unlimited UK + Mobiles">Unlimited UK + Mobiles</option>
                            <option value="Pay per minute">Pay per minute</option>
                            <option value="Bundled minutes">Bundled minutes</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Setup Fee (£)</label>
                          <input type="number" name="telecomsSetupFee" value={formData.telecomsSetupFee} onChange={handleInputChange} className="input" min="0" step="50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Contract Term (months)</label>
                          <input type="number" name="telecomsContractTermMonths" value={formData.telecomsContractTermMonths} onChange={handleInputChange} className="input" min="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Number Porting Fee (£)</label>
                          <input type="number" name="telecomsNumberPortingFee" value={formData.telecomsNumberPortingFee} onChange={handleInputChange} className="input" min="0" />
                        </div>
                      </div>
                      <div className="mt-4 flex gap-6">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" name="telecomsBroadbandIncluded" checked={formData.telecomsBroadbandIncluded} onChange={handleInputChange} className="w-4 h-4 text-purple-600 rounded" />
                          <span className="text-sm text-gray-700">Broadband included</span>
                        </label>
                      </div>
                      {!formData.telecomsBroadbandIncluded && (
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Broadband Speed</label>
                            <input type="text" name="telecomsBroadbandSpeed" value={formData.telecomsBroadbandSpeed} onChange={handleInputChange} className="input" placeholder="e.g. 80/20 FTTC" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Broadband Monthly (£)</label>
                            <input type="number" name="telecomsBroadbandMonthlyCost" value={formData.telecomsBroadbandMonthlyCost} onChange={handleInputChange} className="input" min="0" step="5" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {TELECOMS_FEATURES.map(feature => (
                          <button key={feature} type="button" onClick={() => handleFeatureToggle(feature, 'telecomsFeatures')}
                            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${formData.telecomsFeatures.includes(feature) ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                          >{feature}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ==================== CCTV FIELDS ==================== */}
                {formData.serviceCategory === 'CCTV' && (
                  <>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">CCTV Pricing</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">System Type</label>
                          <select name="cctvSystemType" value={formData.cctvSystemType} onChange={handleInputChange} className="input">
                            <option value="IP Camera System">IP Camera System</option>
                            <option value="Analogue">Analogue</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Cloud-Based">Cloud-Based</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Per Camera Cost (£) <span className="text-red-500">*</span></label>
                          <input type="number" name="cctvPerCameraCost" value={formData.cctvPerCameraCost} onChange={handleInputChange} className="input" min="0" step="10" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Camera Model</label>
                          <input type="text" name="cctvCameraModel" value={formData.cctvCameraModel} onChange={handleInputChange} className="input" placeholder="e.g. DS-2CD2143G2-IS" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
                          <select name="cctvResolution" value={formData.cctvResolution} onChange={handleInputChange} className="input">
                            <option value="HD 1080p">HD 1080p</option>
                            <option value="2K 1440p">2K 1440p</option>
                            <option value="4K 2160p">4K 2160p</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">NVR Cost (£)</label>
                          <input type="number" name="cctvNvrCost" value={formData.cctvNvrCost} onChange={handleInputChange} className="input" min="0" step="50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">NVR Channels</label>
                          <input type="number" name="cctvNvrChannels" value={formData.cctvNvrChannels} onChange={handleInputChange} className="input" min="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Installation / Camera (£)</label>
                          <input type="number" name="cctvInstallationPerCamera" value={formData.cctvInstallationPerCamera} onChange={handleInputChange} className="input" min="0" step="10" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Flat Installation Fee (£)</label>
                          <input type="number" name="cctvInstallationFlat" value={formData.cctvInstallationFlat} onChange={handleInputChange} className="input" min="0" step="50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Monitoring (£)</label>
                          <input type="number" name="cctvMonthlyMonitoring" value={formData.cctvMonthlyMonitoring} onChange={handleInputChange} className="input" min="0" step="5" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cloud Storage / Month (£)</label>
                          <input type="number" name="cctvCloudStorageMonthly" value={formData.cctvCloudStorageMonthly} onChange={handleInputChange} className="input" min="0" step="5" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Maintenance (£)</label>
                          <input type="number" name="cctvMaintenanceAnnual" value={formData.cctvMaintenanceAnnual} onChange={handleInputChange} className="input" min="0" step="50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Contract Term (months)</label>
                          <input type="number" name="cctvContractTermMonths" value={formData.cctvContractTermMonths} onChange={handleInputChange} className="input" min="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Min Cameras</label>
                          <input type="number" name="cctvMinCameras" value={formData.cctvMinCameras} onChange={handleInputChange} className="input" min="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Max Cameras</label>
                          <input type="number" name="cctvMaxCameras" value={formData.cctvMaxCameras} onChange={handleInputChange} className="input" min="1" />
                        </div>
                      </div>
                      <div className="mt-4 flex gap-6">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" name="cctvIndoor" checked={formData.cctvIndoor} onChange={handleInputChange} className="w-4 h-4 text-purple-600 rounded" />
                          <span className="text-sm text-gray-700">Indoor</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" name="cctvOutdoor" checked={formData.cctvOutdoor} onChange={handleInputChange} className="w-4 h-4 text-purple-600 rounded" />
                          <span className="text-sm text-gray-700">Outdoor</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" name="cctvNightVision" checked={formData.cctvNightVision} onChange={handleInputChange} className="w-4 h-4 text-purple-600 rounded" />
                          <span className="text-sm text-gray-700">Night Vision</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {CCTV_FEATURES.map(feature => (
                          <button key={feature} type="button" onClick={() => handleFeatureToggle(feature, 'cctvFeatures')}
                            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${formData.cctvFeatures.includes(feature) ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                          >{feature}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* ==================== IT FIELDS ==================== */}
                {formData.serviceCategory === 'IT' && (
                  <>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">IT Pricing</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                          <select name="itServiceType" value={formData.itServiceType} onChange={handleInputChange} className="input">
                            <option value="Fully Managed">Fully Managed</option>
                            <option value="Co-Managed">Co-Managed</option>
                            <option value="Project-Based">Project-Based</option>
                            <option value="Consultancy">Consultancy</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Per User / Month (£)</label>
                          <input type="number" name="itPerUserMonthly" value={formData.itPerUserMonthly} onChange={handleInputChange} className="input" min="0" step="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Per Device / Month (£)</label>
                          <input type="number" name="itPerDeviceMonthly" value={formData.itPerDeviceMonthly} onChange={handleInputChange} className="input" min="0" step="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Project Day Rate (£)</label>
                          <input type="number" name="itProjectDayRate" value={formData.itProjectDayRate} onChange={handleInputChange} className="input" min="0" step="50" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Min Users</label>
                          <input type="number" name="itMinUsers" value={formData.itMinUsers} onChange={handleInputChange} className="input" min="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Max Users</label>
                          <input type="number" name="itMaxUsers" value={formData.itMaxUsers} onChange={handleInputChange} className="input" min="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Server Management / Month (£)</label>
                          <input type="number" name="itServerManagementMonthly" value={formData.itServerManagementMonthly} onChange={handleInputChange} className="input" min="0" step="10" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Setup Fee (£)</label>
                          <input type="number" name="itSetupFee" value={formData.itSetupFee} onChange={handleInputChange} className="input" min="0" step="100" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">M365 Cost / User (£)</label>
                          <input type="number" name="itM365CostPerUser" value={formData.itM365CostPerUser} onChange={handleInputChange} className="input" min="0" step="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cybersecurity Addon / User (£)</label>
                          <input type="number" name="itCybersecurityAddon" value={formData.itCybersecurityAddon} onChange={handleInputChange} className="input" min="0" step="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Backup / GB (£)</label>
                          <input type="number" name="itBackupPerGb" value={formData.itBackupPerGb} onChange={handleInputChange} className="input" min="0" step="0.01" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Contract Term (months)</label>
                          <input type="number" name="itContractTermMonths" value={formData.itContractTermMonths} onChange={handleInputChange} className="input" min="1" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Response Time SLA</label>
                          <select name="itResponseTimeSLA" value={formData.itResponseTimeSLA} onChange={handleInputChange} className="input">
                            <option value="1 hour">1 hour</option>
                            <option value="2 hours">2 hours</option>
                            <option value="4 hours">4 hours</option>
                            <option value="8 hours">8 hours</option>
                            <option value="Next business day">Next business day</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Support Hours</label>
                          <select name="itSupportHours" value={formData.itSupportHours} onChange={handleInputChange} className="input">
                            <option value="24/7">24/7</option>
                            <option value="Business hours (8-6)">Business hours (8-6)</option>
                            <option value="Extended (7-10)">Extended (7-10)</option>
                            <option value="Business hours (9-5)">Business hours (9-5)</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-6">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" name="itM365LicenceIncluded" checked={formData.itM365LicenceIncluded} onChange={handleInputChange} className="w-4 h-4 text-purple-600 rounded" />
                          <span className="text-sm text-gray-700">M365 licence included</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Included Services</h3>
                      <div className="flex flex-wrap gap-2">
                        {IT_SERVICES.map(service => (
                          <button key={service} type="button" onClick={() => handleFeatureToggle(service, 'itIncludes')}
                            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${formData.itIncludes.includes(service) ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                          >{service}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Submit */}
                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-secondary py-2 px-4"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary py-2 px-6 disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
