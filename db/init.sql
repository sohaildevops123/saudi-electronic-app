-- Database schema and seed data for Saudi Electronics & Software Solutions

-- Drop tables if exists (for clean initialization)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50) NOT NULL
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER DEFAULT 10,
    brand VARCHAR(100),
    specs JSONB DEFAULT '{}',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Services Table (Software Solutions)
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    estimated_time VARCHAR(100),
    starting_price NUMERIC(10, 2) NOT NULL,
    badge VARCHAR(50),
    icon VARCHAR(50)
);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    city VARCHAR(100) DEFAULT 'Riyadh',
    order_type VARCHAR(20) CHECK (order_type IN ('PRODUCT', 'SERVICE')),
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL
);

-- Seed Categories
INSERT INTO categories (name_en, name_ar, slug, icon) VALUES
('Monitors', 'الشاشات', 'monitors', 'Monitor'),
('Cables & Adapters', 'الكابلات والمحولات', 'cables', 'Cable'),
('Desktop PCs', 'أجهزة الكمبيوتر المكتبي', 'desktops', 'Cpu'),
('Storage (SSD / HDD)', 'وحدات التخزين', 'storage', 'HardDrive'),
('Pendrives & USB', 'الفلاشات ووحدات USB', 'pendrives', 'Usb');

-- Seed Products
INSERT INTO products (category_id, name_en, name_ar, description_en, description_ar, price, stock, brand, specs, image_url) VALUES
-- Monitors
(1, 'Samsung Odyssey G7 27" 240Hz Gaming Monitor', 'شاشة ألعاب سامسونج أوديسي جي7 27 بوصة 240 هرتز', '27-inch QHD curved 1000R gaming monitor with 1ms response time and G-Sync support.', 'شاشة ألعاب منحنية 27 بوصة بدقة QHD وزمن استجابة 1 ميلي ثانية.', 1899.00, 8, 'Samsung', '{"refresh_rate": "240Hz", "resolution": "2560x1440", "panel": "VA"}', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80'),
(1, 'LG UltraGear 24" Full HD 144Hz Monitor', 'شاشة ال جي الترا جير 24 بوصة 144 هرتز', '24-inch FHD IPS gaming monitor with AMD FreeSync Premium and HDR10 support.', 'شاشة ألعاب 24 بوصة IPS بدقة كاملة ودعم الفري سينك.', 749.00, 15, 'LG', '{"refresh_rate": "144Hz", "resolution": "1920x1080", "panel": "IPS"}', 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&q=80'),

-- Cables
(2, 'UGREEN Braided 8K HDMI 2.1 Cable (2 Meters)', 'كابل يوجرين HDMI 2.1 بدقة 8K طول 2 متر', 'Ultra high speed 48Gbps HDMI 2.1 cable supporting 8K@60Hz and 4K@120Hz gaming.', 'كابل HDMI فائقة السرعة يكتمل دعم 8K و 4K ألعاب.', 79.00, 50, 'UGREEN', '{"length": "2M", "bandwidth": "48Gbps", "version": "HDMI 2.1"}', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80'),
(2, 'Baseus 100W USB-C to USB-C Fast Charging Cable', 'كابل بيسوس USB-C بقدرة 100 واط شحن سريع', 'Durable nylon braided 100W Power Delivery cable with LED display.', 'كابل شحن سريع بقوة 100 واط مع شاشة عرض الطاقة.', 49.00, 40, 'Baseus', '{"power": "100W", "length": "1.5M", "data_rate": "480Mbps"}', 'https://images.unsplash.com/photo-1616440342231-64585a37d730?w=500&q=80'),

-- Desktops
(3, 'Apex Beast RTX 4070 Ti Gaming PC', 'كمبيوتر ألعاب ايبكس بيست RTX 4070 Ti', 'Custom Gaming PC with Intel Core i7-13700K, RTX 4070 Ti 12GB, 32GB DDR5 RAM, and 1TB NVMe SSD.', 'جهاز كمبيوتر ألعاب محترف بمعالج i7 وكارت شاشة RTX 4070 Ti وذاكرة 32 جيجا.', 6999.00, 3, 'Custom Build', '{"cpu": "Core i7-13700K", "gpu": "RTX 4070 Ti", "ram": "32GB DDR5", "storage": "1TB NVMe"}', 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&q=80'),
(3, 'ProWork Workstation Ryzen 9 7900X', 'جهاز عمل محترف رايزن 9 7900X', 'High-performance workstation for video editing, 3D rendering, and heavy multitasking.', 'محطة عمل فائقة الأداء للمونتاج والتصميم ثلاثي الأبعاد.', 5499.00, 5, 'Custom Build', '{"cpu": "Ryzen 9 7900X", "gpu": "RTX 4060 Ti 16GB", "ram": "64GB DDR5", "storage": "2TB NVMe"}', 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80'),

-- Storage (SSD/HDD)
(4, 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD', 'قرص صلب سامسونج 990 برو 2 تيرابايت NVMe SSD', 'Flagship NVMe SSD with read speeds up to 7,450 MB/s for PC and PS5.', 'أسرع قرص تخزين NVMe سرعة قراءة تصل إلى 7450 ميجابايت/ثانية.', 799.00, 20, 'Samsung', '{"capacity": "2TB", "read_speed": "7450 MB/s", "interface": "PCIe Gen4"}', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&q=80'),
(4, 'Seagate BarraCuda 4TB Internal Hard Drive HDD', 'قرص صلب داخلي سيجيت باراكودا 4 تيرابايت HDD', '3.5-inch 5400 RPM SATA 6Gb/s desktop hard drive for mass storage.', 'قرص تخزين داخلي بسعة 4 تيرابايت لحفظ البيانات والنسخ الاحتياطي.', 349.00, 18, 'Seagate', '{"capacity": "4TB", "rpm": "5400", "factor": "3.5 Inch"}', 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&q=80'),

-- Pendrives
(5, 'SanDisk Ultra Dual Drive Luxe 128GB USB Type-C', 'فلاشة سانديسك الترا 128 جيجابايت USB Type-C', '2-in-1 all-metal flash drive for USB Type-C and Type-A devices.', 'فلاشة معدنية مزدوجة 2 في 1 للهواتف والكمبيوتر.', 89.00, 35, 'SanDisk', '{"capacity": "128GB", "interface": "USB 3.1 & Type-C", "speed": "150 MB/s"}', 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=500&q=80'),
(5, 'Kingston DataTraveler Max 256GB USB 3.2 Gen 2', 'فلاشة كينجستون داتا ترافلر 256 جيجابايت', 'High performance USB drive with speeds up to 1000MB/s read.', 'فلاش ميموري فائقة السرعة تصل إلى 1000 ميجابايت/ثانية.', 149.00, 25, 'Kingston', '{"capacity": "256GB", "interface": "USB 3.2 Gen 2", "speed": "1000 MB/s"}', 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=500&q=80');

-- Seed Software Solutions / Services
INSERT INTO services (title_en, title_ar, description_en, description_ar, estimated_time, starting_price, badge, icon) VALUES
('BIOS / Motherboard Flashing & Recovery', 'تحديث وتفليش البيوس واللوحة الأم', 'Expert flashing of corrupt BIOS, updating firmware for new CPU compatibility, and brick recovery.', 'تحديث وتفليش البيوس لحل مشاكل التوافقية أو الأجهزة المعطلة بأمان.', '1 - 2 Hours', 99.00, 'Popular', 'Cpu'),
('Windows / OS Clean Installation & Tuning', 'تثبيت وتحديث نظام الويندوز وتجهيزه', 'Fresh Windows 11/10 installation with genuine driver updates, optimization, and essential software.', 'تثبيت نظام ويندوز جديد مع تعريفات أصلية وتحسين أداء الجهاز.', '45 Minutes', 75.00, 'Essential', 'Monitor'),
('Virus, Malware & Ransomware Cleanup', 'إزالة الفيروسات والبرمجيات الخبيثة', 'Comprehensive deep scan, removal of spyware, adware, and security optimization.', 'تنظيف الجهاز من الفيروسات وتأمين البيانات وتحسين سرعة النظام.', '1 Hour', 120.00, 'Protection', 'ShieldCheck'),
('Hard Drive & SSD Data Recovery', 'استرجاع البيانات والملفات المفقودة', 'Data extraction from damaged HDDs, formatted SSDs, and corrupted USB pendrives.', 'استرجاع الملفات والصور الهامة من الأقراص التالفة أو المحذوفة.', '24 - 48 Hours', 250.00, 'Advanced', 'HardDrive'),
('Custom PC Assembly & Cable Management', 'تجميع الكمبيوتر وتنسيق الأسلاك', 'Professional PC building, thermal paste application, airflow optimization, and stress testing.', 'تجميع قطع الكمبيوتر باحترافية عالية وتنظيم الكابلات واختبار الأداء.', '2 - 3 Hours', 150.00, 'Pro Service', 'Wrench');
