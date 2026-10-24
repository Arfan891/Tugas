import { type CMSState } from '../types';

export const initialCMSData: CMSState = {
  companyInfo: {
    name: "CV NURRIZKY CIPTA KARYA",
    tagline: "Solusi Terpadu Percetakan, Sablon & Digital Printing Berkualitas Tinggi",
    shortBio: "Mitra terpercaya kebutuhan cetak promosi, tekstil, sablon, desain grafis, layout, dan percetakan umum untuk instansi, perusahaan, UMKM, dan personal.",
    fullAbout: "CV Nurrizky Cipta Karya adalah perusahaan manufaktur dan jasa percetakan modern yang berkomitmen menghadirkan hasil cetakan presisi, warna tajam, dan ketepatan waktu pengiriman. Didukung armada mesin berteknologi mutakhir mulai dari digital printing hi-res outdoor/indoor, mesin sablon presisi, mesin sublimasi textile, hingga mesin offset berkapasitas besar.",
    vision: "Menjadi perusahaan percetakan dan kreatif terdepan yang terpercaya dalam mutu, ketepatan waktu, dan inovasi teknologi cetak di Indonesia.",
    mission: [
      "Memberikan pelayanan cetak berkualitas prima dengan kalibrasi warna presisi dan daya tahan tinggi.",
      "Menyediakan solusi menyeluruh satu atap mulai dari konsep desain, tata letak (layout), produksi hingga finishing akhir.",
      "Menerapkan sistem kerja efektif dan tepat waktu dengan harga kompetitif bagi seluruh lapisan pelanggan.",
      "Terus memperbarui teknologi mesin dan kapabilitas tim tenaga ahli percetakan."
    ],
    address: "Jalan Raya Centex No.55 Ciracas Jakarta Timur",
    mapsUrl: "https://maps.google.com/?q=Jalan+Raya+Centex+No.55+Ciracas+Jakarta+Timur",
    phone: "+6285883404488",
    whatsapp: "+6285883404488",
    email: "raudhatulihsan50@gmail.com",
    workingHours: {
      weekdays: "Senin - Jumat: 08.00 - 18.00 WIB",
      saturday: "Sabtu: 08.30 - 15.00 WIB",
      sunday: "Minggu & Hari Libur: Layanan Darurat / Chat Admin"
    },
    socialMedia: {
      instagram: "@nurrizkyciptakarya",
      facebook: "CV Nurrizky Cipta Karya",
      tiktok: "@nurrizkyprinting"
    },
    stats: {
      projectsCompleted: 2500,
      satisfiedClients: 800,
      yearsExperience: 15,
      serviceTypes: 7,
      productionMachines: 18
    },
    navigation: {
      beranda: "Beranda",
      layanan: "Layanan & Produk",
      tentang: "Tentang Kami",
      kontak: "Kontak"
    },
    promoBanner: {
      enabled: true,
      text: "🎉 Promo Spesial Musim Ini: Diskon 15% untuk Pembuatan Kalender 2027 & Merchandise Perusahaan! Konsultasi Gratis Sekarang.",
      badge: "PROMO TERBATAS",
      linkText: "Minta Penawaran"
    }
  },
  services: [
    {
      id: "srv-dp-01",
      title: "Spanduk & Banner Outdoor / Indoor",
      category: "digital-printing",
      shortDesc: "Cetak banner tahan cuaca, warna tajam hi-res dengan berbagai pilihan ketebalan flexi dan finishing mata ayam.",
      fullDesc: "Layanan cetak spanduk promosi, x-banner, roll up banner, dan baliho menggunakan tinta solvent & eco-solvent tahan panas dan hujan. Pilihan bahan mulai dari Flexi Frontlite China 280g, 340g, 440g hingga Flexi Korea/German yang tebal dan matte.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 18.000 / m²",
      minOrder: "1 meter",
      leadTime: "1 Hari Kerja (Bisa Express)",
      materials: ["Flexi China 280g", "Flexi Korea 440g", "Flexi Jerman 510g", "Albatros", "Luster"],
      popular: true,
      features: ["Tinta anti luntur UV", "Finishing mata ayam / selongsong", "Resolusi cetak hingga 1440 DPI", "Bisa siap cetak dalam hitungan jam"]
    },
    {
      id: "srv-dp-02",
      title: "Stiker Vinyl, Cromo & Cutting Sticker",
      category: "digital-printing",
      shortDesc: "Stiker label produk botol, toples makanan, stiker hologram, cutting vinyl die-cut & kiss-cut presisi tinggi.",
      fullDesc: "Cocok untuk label kemasan makanan minuman, branding packaging, dan merchandise. Tersedia stiker vinyl tahan air (waterproof), stiker cromo ekonomis, stiker transparan, serta stiker hologram dengan opsi laminasi doff / glossy.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 10.000 / A3+",
      minOrder: "5 Lembar A3+",
      leadTime: "1 - 2 Hari Kerja",
      materials: ["Vinyl Matte / Glossy", "Cromo / Kromo", "Vinyl Transparan", "Silver / Gold Foil", "Stiker Pecah Telur"],
      popular: true,
      features: ["Mesin Cutting Mimaki / Roland presisi", "Laminasi Doff & Glossy pelindung", "Tahan cuaca & goresan", "Bisa potong bentuk pola custom"]
    },
    {
      id: "srv-sb-01",
      title: "Sablon Kaos Plastisol & Rubber Manual",
      category: "sablon",
      shortDesc: "Sablon kaos komunitas, kaos distro, seragam kerja dengan kualitas tinta plastisol premium dan handfeel lembut.",
      fullDesc: "Sablon manual presisi meja rel dengan tinta Plastisol imported dan Rubber waterbase terbaik. Menghasilkan detail garis tajam, raster halus, daya rekat tinggi pada serat katun tanpa retak setelah dicuci berulang kali.",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 45.000 / pcs (Include Kaos)",
      minOrder: "24 pcs",
      leadTime: "5 - 7 Hari Kerja",
      materials: ["Cotton Combed 24s/30s", "Tinta Plastisol Doff/Glossy", "Rubber Matsui", "Discharge", "High Density (Timbul)"],
      popular: true,
      features: ["Curing suhu tinggi anti rontok", "Tersedia efek timbul & glow in the dark", "Termasuk packing plastik rapi per kaos", "Quality control ketat"]
    },
    {
      id: "srv-sb-02",
      title: "Sablon Tote Bag, Spunbond & Merchandise",
      category: "sablon",
      shortDesc: "Sablon tas seminar, goodie bag spunbond, totebag kanvas, pouch, dan suvenir acara kantor.",
      fullDesc: "Solusi merchandise promosi untuk seminar, pameran, event institusi dan pernikahan. Pilihan bahan totebag blacu, kanvas drill, dan kain spunbond aneka warna dengan sablon presisi awet.",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 4.500 / pcs",
      minOrder: "50 pcs",
      leadTime: "3 - 5 Hari Kerja",
      materials: ["Kain Spunbond 75 gsm", "Kain Blacu Katun", "Kanvas Tebal", "Drill American"],
      popular: false,
      features: ["Jahitan kuat dan rapi", "Sablon multi warna", "Pilihan ukuran custom", "Bagus untuk souvenir branding"]
    },
    {
      id: "srv-tx-01",
      title: "Textile Printing Sublimasi Jersey & Kain",
      category: "textile-printing",
      shortDesc: "Cetak kain sublimasi full-color untuk jersey olahraga, futsal, sepeda, running, hijab voal, dan seragam printing.",
      fullDesc: "Menggunakan mesin sublimasi roll-to-roll kecepatan tinggi dan transfer paper grade A. Tinta sublimasi asli bersertifikasi OEKO-TEX aman untuk kulit, menyerap ke dalam pori-pori kain poliester sehingga tidak kaku dan tidak memudar.",
      image: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 85.000 / stel (Jersey)",
      minOrder: "12 pcs",
      leadTime: "4 - 6 Hari Kerja",
      materials: ["Dryfit Jarum/Milano/Benzema", "Kain Voal Arabian/Ultrafeel", "Satin Velvet", "Bahan Spandex"],
      popular: true,
      features: ["Gradasi warna cerah tak terbatas", "Desain custom nama & nomor punggung", "Tinta menyatu dengan kain (breathable)", "Layanan jahit pola profesional"]
    },
    {
      id: "srv-tx-02",
      title: "Cetak DTF (Direct to Film) Satuan & Meteran",
      category: "textile-printing",
      shortDesc: "Solusi cetak sablon digital full color tanpa batasan warna, tanpa minimal order, cocok untuk kaos custom satuan.",
      fullDesc: "Cetak transfer film DTF resolusi tinggi dengan white ink density solid dan hotmelt powder berkualitas. Bisa diaplikasikan ke semua jenis kain (katun, poliester, kanvas, denim, jaket fleece). Tersedia print meteran untuk konveksi dan vendor.",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 35.000 / meter",
      minOrder: "1 meter / 1 pcs Kaos",
      leadTime: "1 - 2 Hari Kerja",
      materials: ["PET Film Anti-Static", "Bubuk Powder TPU Premium", "Tinta DTF Hi-Density"],
      popular: true,
      features: ["Gradasi warna foto realistis", "Bisa sablon kaos satuan tanpa minimal", "Hasil elastis tidak kaku", "Warna putih pekat menutup sempurna"]
    },
    {
      id: "srv-dg-01",
      title: "Jasa Desain Grafis & Brand Identity",
      category: "desain-grafis",
      shortDesc: "Pembuatan logo profesional, brand guideline, kemasan produk, materi promosi, dan visual marketing bisnis.",
      fullDesc: "Tim desainer grafis internal kami siap menerjemahkan ide bisnis Anda menjadi visual bernilai jual tinggi. Mulai dari konsep logo filosofis, warna korporat, kemasan produk UMKM, hingga feed media sosial dan materi cetak siap produksi.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 150.000 / proyek",
      minOrder: "1 Konsep",
      leadTime: "2 - 4 Hari Kerja",
      materials: ["File Master AI, PSD, PDF, EPS", "Resolusi Cetak 300 DPI CMYK", "Format Web PNG / JPG"],
      popular: true,
      features: ["Revisi fleksibel", "File siap cetak tanpa error warna", "Konsultasi langsung dengan Art Director", "Hak cipta penuh milik klien"]
    },
    {
      id: "srv-ly-01",
      title: "Jasa Layout Buku, Majalah & Company Profile",
      category: "layout",
      shortDesc: "Tata letak naskah buku ber-ISBN, majalah, annual report, company profile, dan katalog produk yang elegan dan rapi.",
      fullDesc: "Layanan penataan layout profesional menggunakan Adobe InDesign dengan standar tipografi internasional. Kami memperhatikan hierarki teks, baseline grid, keterbacaan (readability), margins, dan keindahan estetika publikasi Anda.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 15.000 / halaman",
      minOrder: "20 Halaman",
      leadTime: "3 - 7 Hari Kerja",
      materials: ["File Layout InDesign INDD", "PDF Press-Ready Cetak", "e-Book EPUB / Interactive PDF"],
      popular: false,
      features: ["Sesuai kaidah tata letak standar penerbit", "Termasuk penataan foto & tabel data", "Konsultasi pemilihan jenis kertas cetak", "Integrasi langsung ke mesin cetak kami"]
    },
    {
      id: "srv-oc-01",
      title: "Brosur, Flyer, Poster & Map Folder",
      category: "percetakan-umum",
      shortDesc: "Cetak materi promosi kertas offset & digital untuk pameran, event kantor, penawaran produk, dan sales kit.",
      fullDesc: "Cetak brosur lipat 2/3 (bifold / trifold), flyer A5/A4, poster, dan stopmap folder kantong dengan kertas Art Paper & Art Carton berkualitas. Ditambah finishing laminasi doff, glossy, atau spot UV mengkilap pada logo.",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 250 / lembar (Rim/Oplah)",
      minOrder: "1 Rim (500 Lembar)",
      leadTime: "2 - 4 Hari Kerja",
      materials: ["Art Paper 120/150 gsm", "Art Carton 210/260 gsm", "Matte Paper", "HVS 80/100 gsm"],
      popular: true,
      features: ["Cetak 2 sisi full color CMYK tajam", "Finishing lipat mesin otomatis", "Opsi spot UV & hot print emas/perak", "Kapasitas produksi hingga 100.000+ lembar"]
    },
    {
      id: "srv-oc-02",
      title: "Kalender Dinding & Meja Custom",
      category: "percetakan-umum",
      shortDesc: "Pembuatan kalender promosi akhir tahun untuk perusahaan, caleg, organisasi, dan suvenir keluarga.",
      fullDesc: "Spesialis pembuatan kalender dinding klem seng / spiral, dan kalender meja dudukan linen / hardboard exclusive. Desain custom menampilkan foto kegiatan, produk unggulan, penanggalan hijriyah & jawa serta libur nasional resmi.",
      image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 12.000 / pcs",
      minOrder: "50 pcs",
      leadTime: "5 - 10 Hari Kerja",
      materials: ["Art Carton 210/260/310 gsm", "Spiral Kawat Putih/Hitam", "Klem Seng", "Board No. 30/40 Linen"],
      popular: true,
      features: ["Bisa request layout foto & sponsor", "Kawat spiral kokoh & rapi", "Warna stabil di semua lembar", "Pilihan laminasi doff / glossy"]
    },
    {
      id: "srv-oc-03",
      title: "Nota NCR, Faktur, Surat Jalan & Kuitansi",
      category: "percetakan-umum",
      shortDesc: "Cetak nota rangkap 2, 3, 4 ply tanpa perlu karbon manual, nomorator rapi, porporasi sobekan mudah.",
      fullDesc: "Perlengkapan administrasi bisnis esensial: buku nota, faktur pajak, kwitansi, surat jalan, dan form purchase order. Menggunakan kertas NCR tembus nyata dengan nomorator berurutan dan porporasi memudahkan penyobekan.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 180.000 / rim folio",
      minOrder: "1 Rim Folio (Bisa potong jadi buku)",
      leadTime: "3 - 5 Hari Kerja",
      materials: ["NCR Top / Middle / Bottom (Putih, Merah, Kuning, Hijau, Biru)", "Cover Samson / Kraft"],
      popular: false,
      features: ["Tembusan warna tajam tanpa karbon", "Nomor urut otomatis (Nomorator)", "Porporasi lubang sobek presisi", "Jilid lem kuat dan tahan lama"]
    },
    {
      id: "srv-oc-04",
      title: "Box Packaging & Kemasan Custom",
      category: "percetakan-umum",
      shortDesc: "Kemasan produk makanan, kosmetik, packaging corrugated box, paper bag, dan sleeve packaging eksklusif.",
      fullDesc: "Tingkatkan nilai jual produk Anda dengan packaging cetak custom. Kami melayani pembuatan dus kue, food pail, kemasan skincare, paper bag butik, dan box corrugated dengan pisau pond presisi dan food grade certification.",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80",
      startingPrice: "Rp 1.500 / pcs",
      minOrder: "500 pcs",
      leadTime: "7 - 12 Hari Kerja",
      materials: ["Ivory 250 - 350 gsm (Food Grade)", "Duplex 250 - 400 gsm", "Kraft Cokelat Eco", "Corrugated E-Flute"],
      popular: true,
      features: ["Pond & lipat presisi", "Anti minyak & rembes (opsi laminasi PE)", "Finishing Hot Stamping Foil & Emboss", "Bisa buat prototipe sampel dummy"]
    }
  ],
  portfolio: [
    {
      id: "port-01",
      title: "Jersey Sublimasi Sepakbola Komunitas Garuda FC",
      client: "Garuda Football Club",
      category: "textile-printing",
      image: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=900&q=80",
      description: "Produksi 120 stel jersey dryfit Milano full sublimasi warna emas gradasi hitam dengan detail nomor punggung dan logo tim bordir woven.",
      date: "Agustus 2026",
      specs: "Bahan Dryfit Milano, Jahitan Kumis Rantai, Sublimasi Epson SureColor"
    },
    {
      id: "port-02",
      title: "Sablon Kaos Plastisol Event Musik SoundFest",
      client: "SoundFest Event Organizer",
      category: "sablon",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
      description: "Cetak sablon 1.500 pcs kaos merchandise official festival musik dengan 5 warna plastisol presisi tinggi dan efek raster halus.",
      date: "Juli 2026",
      specs: "Cotton Combed 24s Hitam Reaktif, Tinta Wilflex Plastisol, Meja Rel Presisi"
    },
    {
      id: "port-03",
      title: "Branding Booth & Roll Banner Pameran Otomotif",
      client: "PT Astra Megah Sentosa",
      category: "digital-printing",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80",
      description: "Pemasangan backdrop 6x3 meter dan 8 unit Roll Up Banner Alumunium Luxury dengan bahan Luster high resolution tanpa pantulan lampu.",
      date: "Juni 2026",
      specs: "Luster Paper 230g Matte, Eco-Solvent Roland 1440 DPI, Stand Alumunium Premium"
    },
    {
      id: "port-04",
      title: "Layout & Cetak Annual Report 120 Halaman",
      client: "BUMD Cipta Karya Makmur",
      category: "layout",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
      description: "Pengerjaan tata letak laporan tahunan perusahaan lengkap dengan visual infografis data keuangan, jilid jahit benang hard cover eksklusif.",
      date: "Mei 2026",
      specs: "Cover Art Carton 310g Doff + Spot UV, Isi Matte Paper 150g, Jilid Lem Panas + Jahit Benang"
    },
    {
      id: "port-05",
      title: "Dus Kemasan Skincare Glow Series Custom",
      client: "Nusantara Beauty Cosmetic",
      category: "percetakan-umum",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80",
      description: "Produksi 10.000 pcs kotak kemasan skincare dengan finishing Soft Touch Laminating dan Hot Stamp Foil Rose Gold pada logo utama.",
      date: "April 2026",
      specs: "Ivory Premium 350g, Foil Rose Gold, Pond Presisi Otomatis, Lem Otomatis"
    },
    {
      id: "port-06",
      title: "Identitas Visual & Rebranding Cafe Kopitiam",
      client: "Kedai Kopi Rukun Rasa",
      category: "desain-grafis",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
      description: "Desain sistem identitas merek lengkap mulai dari logo filosofis, palet warna vintage, desain cup kopi, buku menu makanan, hingga apron kasir.",
      date: "Maret 2026",
      specs: "Brand Guidelines Book, File Vektor Master AI, Mockup 3D Realistis"
    },
    {
      id: "port-07",
      title: "Stiker Vinyl Die-Cut Tahan Air Brand Minuman",
      client: "Segar Juice Bar",
      category: "digital-printing",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
      description: "Cetak dan cutting 50.000 pcs label botol stiker vinyl anti air dengan laminasi doff, daya rekat kuat di dalam kulkas dan freezer.",
      date: "Februari 2026",
      specs: "Vinyl Ritrama White Glossy, Laminasi Doff Dingin, Mesin Kiss-Cut Digital"
    },
    {
      id: "port-08",
      title: "Kalender Meja Eksklusif Perbankan",
      client: "Bank Daerah Syariah",
      category: "percetakan-umum",
      image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=900&q=80",
      description: "Produksi 3.000 pcs kalender meja 13 lembar isi foto heritage nusantara dengan dudukan board linen hitam kaku dan spiral kawat emas.",
      date: "Januari 2026",
      specs: "Art Carton 260g Cetak 2 Muka, Spiral Emas 5/16, Board No. 30 Lapis Kain Linen"
    }
  ],
  quotations: [
    {
      id: "rfq-101",
      ticketNumber: "RFQ-NCK-2026-0012",
      createdAt: "2026-09-12 10:15",
      customerName: "Hendro Wibowo",
      companyName: "PT Sinar Logistik Nusantara",
      phone: "081399887766",
      email: "hendro@sinarlogistik.co.id",
      city: "Jakarta Timur",
      serviceCategory: "percetakan-umum",
      serviceName: "Brosur, Flyer, Poster & Map Folder",
      quantity: 2500,
      unit: "lembar",
      material: "Art Paper 150 gsm (Brosur Trifold)",
      dimensions: "A4 Lipat 3",
      finishing: ["Laminasi Doff 2 Sisi", "Lipat Mesin 3 Panel"],
      deadlineDate: "2026-09-25",
      notes: "Mohon penawaran harga terbaik untuk kebutuhan pameran logistik akhir bulan.",
      fileLink: "https://drive.google.com/contoh-file-desain-brosur",
      estimatedPrice: 2850000,
      status: "contacted",
      adminNotes: "Sudah dikirim penawaran via WhatsApp & Email pada 12 Sept."
    },
    {
      id: "rfq-102",
      ticketNumber: "RFQ-NCK-2026-0013",
      createdAt: "2026-09-14 09:30",
      customerName: "Siti Rahmawati",
      companyName: "Komunitas Lari Pagi Nusantara",
      phone: "085712345678",
      email: "siti.rahma@gmail.com",
      city: "Bandung",
      serviceCategory: "textile-printing",
      serviceName: "Textile Printing Sublimasi Jersey & Kain",
      quantity: 80,
      unit: "pcs",
      material: "Dryfit Milano",
      dimensions: "Ukuran S - XXL (Campur)",
      finishing: ["Jahit Rantai", "Label Kerah Sablon"],
      deadlineDate: "2026-09-28",
      notes: "Desain jersey sudah siap format AI. Mohon dibuatkan sample 1 pcs terlebih dahulu.",
      fileLink: "https://wetransfer.com/contoh-jersey-lari",
      estimatedPrice: 6800000,
      status: "pending",
      adminNotes: "Perlu cek ketersediaan stok bahan dryfit milano warna neon."
    }
  ],
  testimonials: [
    {
      id: "t-01",
      name: "Bambang Sudibyo",
      role: "Marketing Director",
      company: "PT Global Megaprima",
      content: "Sudah 3 tahun mempercayakan seluruh materi promosi kantor dan kalender akhir tahun ke CV Nurrizky Cipta Karya. Warnanya selalu konsisten, pengerjaan cepat, dan timnya sangat komunikatif.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "t-02",
      name: "Rina Kusuma",
      role: "Owner",
      company: "Dapur Rasa Hijab & Fashion",
      content: "Kualitas cetak textile dan hijab voal di sini luar biasa halus. Warna tidak luntur meski dicuci berkali-kali. Pelanggan toko kami sangat puas. Recommended banget untuk pebisnis fashion!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "t-03",
      name: "Donny Prasetyo",
      role: "Ketua Panitia",
      company: "Festival Musik Nusantara",
      content: "Order 1.200 pcs kaos sablon plastisol dengan deadline mepet 5 hari tetap selesai tepat waktu dengan kualitas rapi tanpa cacat satupun. Penawaran harganya sangat transparan.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
  ],
  facilities: [
    {
      id: "fac-01",
      name: "Mesin Digital Outdoor & Indoor Hi-Res",
      category: "Digital Printing",
      specs: "Lebar Cetak 3.2 Meter, 8 Printhead Konica Minolta / Epson DX5",
      capability: "Kapasitas 1.500 m² per hari dengan resolusi 1440 DPI warna tajam",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "fac-02",
      name: "Mesin Sublimasi Tekstil Roll to Roll",
      category: "Textile Printing",
      specs: "Epson SureColor Series & Mesin Rotary Heat Press 1.8 Meter",
      capability: "Kapasitas 500 meter kain jersey/hijab per hari dengan transfer panas merata",
      image: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "fac-03",
      name: "Mesin Offset Heidelberg 4 Warna",
      category: "Percetakan Umum",
      specs: "Format Speedmaster SM 74 CMYK",
      capability: "Kapasitas 15.000 plano per jam untuk brosur, buku, map, dan packaging box",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "fac-04",
      name: "Meja Sablon Presisi & Tunnel Dryer",
      category: "Sablon",
      specs: "Meja Rel Presisi 48 Pallet dengan Hot Press Pneumatic & Flash Curing",
      capability: "Kapasitas hingga 1.000 pcs kaos per hari dengan tingkat presisi register 0.1 mm",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    }
  ]
};
