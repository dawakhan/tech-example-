import { products } from '../data/products';

export function getSeededOrders() {
  const seeded = [
    {
      id: 'TE-10000001',
      trackingCode: 'TRK-ABC12345',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      customer: {
        fullName: 'أحمد محمد علي',
        phone: '07701234567',
        governorate: 'بغداد',
        city: 'الكرادة',
        address: 'شارع الجامعة، بناية 15، الطابق الثالث',
        notes: ''
      },
      items: [
        { productId: 'p1', quantity: 1, product: products.find(p => p.id === 'p1') },
        { productId: 'p7', quantity: 1, product: products.find(p => p.id === 'p7') },
      ],
      subtotal: 1775000,
      deliveryFee: 5000,
      total: 1780000,
      status: 'تم إنشاء الطلب',
      statusEn: 'Pending'
    },
    {
      id: 'TE-10000002',
      trackingCode: 'TRK-DEF67890',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      customer: {
        fullName: 'فاطمة حسن كريم',
        phone: '07809876543',
        governorate: 'البصرة',
        city: 'المدينة',
        address: 'منطقة العشار، قرب السوق المركزي',
        notes: 'يرجى الاتصال قبل التوصيل'
      },
      items: [
        { productId: 'p2', quantity: 1, product: products.find(p => p.id === 'p2') },
      ],
      subtotal: 1750000,
      deliveryFee: 5000,
      total: 1755000,
      status: 'قيد المراجعة',
      statusEn: 'Pending'
    },
    {
      id: 'TE-10000003',
      trackingCode: 'TRK-GHI11111',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      customer: {
        fullName: 'علي جاسم محمود',
        phone: '07501122334',
        governorate: 'أربيل',
        city: 'المركز',
        address: 'شارع 60 متر، مجمع سكني رقم 5',
        notes: ''
      },
      items: [
        { productId: 'p5', quantity: 1, product: products.find(p => p.id === 'p5') },
        { productId: 'p9', quantity: 1, product: products.find(p => p.id === 'p9') },
      ],
      subtotal: 1395000,
      deliveryFee: 5000,
      total: 1400000,
      status: 'تم تأكيد الطلب',
      statusEn: 'Confirmed'
    },
    {
      id: 'TE-10000004',
      trackingCode: 'TRK-JKL22222',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      customer: {
        fullName: 'سارة أحمد خالد',
        phone: '07702233445',
        governorate: 'نينوى',
        city: 'الموصل',
        address: 'حي الشرق، شارع النور',
        notes: ''
      },
      items: [
        { productId: 'p4', quantity: 1, product: products.find(p => p.id === 'p4') },
      ],
      subtotal: 1100000,
      deliveryFee: 5000,
      total: 1105000,
      status: 'تم تأكيد الطلب',
      statusEn: 'Confirmed'
    },
    {
      id: 'TE-10000005',
      trackingCode: 'TRK-MNO33333',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      customer: {
        fullName: 'محمد عبدالرحمن',
        phone: '07803344556',
        governorate: 'كركوك',
        city: 'المركز',
        address: 'شارع القدس، بناية رقم 20',
        notes: ''
      },
      items: [
        { productId: 'p8', quantity: 1, product: products.find(p => p.id === 'p8') },
        { productId: 'p11', quantity: 2, product: products.find(p => p.id === 'p11') },
      ],
      subtotal: 535000,
      deliveryFee: 5000,
      total: 540000,
      status: 'قيد التجهيز',
      statusEn: 'Preparing'
    },
    {
      id: 'TE-10000006',
      trackingCode: 'TRK-PQR44444',
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      customer: {
        fullName: 'نور سالم حسين',
        phone: '07504455667',
        governorate: 'النجف',
        city: 'المركز',
        address: 'حي الحسين، قرب الحرم',
        notes: ''
      },
      items: [
        { productId: 'p3', quantity: 1, product: products.find(p => p.id === 'p3') },
      ],
      subtotal: 950000,
      deliveryFee: 5000,
      total: 955000,
      status: 'قيد التجهيز',
      statusEn: 'Preparing'
    },
    {
      id: 'TE-10000007',
      trackingCode: 'TRK-STU55555',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      customer: {
        fullName: 'حسن علي فاضل',
        phone: '07705566778',
        governorate: 'كربلاء',
        city: 'المركز',
        address: 'شارع الأربعين، مجمع الأمل',
        notes: ''
      },
      items: [
        { productId: 'p14', quantity: 1, product: products.find(p => p.id === 'p14') },
        { productId: 'p12', quantity: 1, product: products.find(p => p.id === 'p12') },
      ],
      subtotal: 675000,
      deliveryFee: 5000,
      total: 680000,
      status: 'تم الشحن',
      statusEn: 'Shipped'
    },
    {
      id: 'TE-10000008',
      trackingCode: 'TRK-VWX66666',
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      customer: {
        fullName: 'زينب محمد جاسم',
        phone: '07806677889',
        governorate: 'بابل',
        city: 'الحلة',
        address: 'حي الجمهورية، شارع النيل',
        notes: ''
      },
      items: [
        { productId: 'p6', quantity: 1, product: products.find(p => p.id === 'p6') },
      ],
      subtotal: 1250000,
      deliveryFee: 5000,
      total: 1255000,
      status: 'تم التسليم',
      statusEn: 'Delivered'
    },
    {
      id: 'TE-10000009',
      trackingCode: 'TRK-YZA77777',
      date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      customer: {
        fullName: 'كمال سعد الدين',
        phone: '07507788990',
        governorate: 'ذي قار',
        city: 'الناصرية',
        address: 'شارع الكورنيش',
        notes: ''
      },
      items: [
        { productId: 'p15', quantity: 1, product: products.find(p => p.id === 'p15') },
        { productId: 'p13', quantity: 2, product: products.find(p => p.id === 'p13') },
      ],
      subtotal: 449000,
      deliveryFee: 5000,
      total: 454000,
      status: 'تم التسليم',
      statusEn: 'Delivered'
    },
    {
      id: 'TE-10000010',
      trackingCode: 'TRK-BCD88888',
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      customer: {
        fullName: 'ليث عمر خالد',
        phone: '07708899001',
        governorate: 'ديالى',
        city: 'بعقوبة',
        address: 'حي المعلمين',
        notes: 'تم إلغاء الطلب حسب طلب العميل'
      },
      items: [
        { productId: 'p16', quantity: 1, product: products.find(p => p.id === 'p16') },
      ],
      subtotal: 85000,
      deliveryFee: 5000,
      total: 90000,
      status: 'ملغي',
      statusEn: 'Cancelled'
    },
  ];
  
  return seeded;
}
