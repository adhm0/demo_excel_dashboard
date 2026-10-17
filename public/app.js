/**
 * Property Engine - Full-Stack Simulation Dashboard Client (Light Mode Only)
 * Single Source of Truth: ./property_engine.xlsx
 */

// UI Translations Dictionary (English & Arabic)
const I18N = {
  en: {
    appTitle: 'Property Engine',
    downloadExcel: 'Download Updated Excel',
    uploadExcel: 'Upload / Replace',
    cleanOrphans: 'Clean Orphans',
    navOverview: 'Overview & Workbook',
    navLocations: 'Geo-Locations',
    navTaxonomy: 'Property Taxonomy',
    navEAV: 'Dynamic EAV Engine',
    navProperties: 'Properties & Rules',
    navUnits: 'Bookable Units',
    navSheets: 'Raw Sheets & i18n',
    sheetsLabel: 'Total Sheets',
    recordsLabel: 'Total Records',
    concurrencyLabel: 'Mutex Guard',
    overviewHeroTitle: 'Property Engine Excel Simulation System',
    overviewHeroDesc: 'Simulating relational database operations, foreign key cascades, polymorphic translations, and dynamic EAV specification engines directly on property_engine.xlsx.',
    sheetsCardTitle: 'All 17 Workbook Sheets',
    sheetsCardSub: 'Click any sheet to jump to its raw data table or management module',
    refresh: 'Refresh Stats',
    geoTitle: 'Geographic Hierarchy Manager',
    geoSubtitle: 'Cascading management for Countries, Cities, and Districts with localized Arabic/English names',
    addCountry: 'Add Country',
    addCity: 'Add City',
    addDistrict: 'Add District',
    countries: 'Countries',
    cities: 'Cities',
    districts: 'Districts',
    taxonomyTitle: 'Property Taxonomy & Combination Matrix',
    taxonomySubtitle: 'Define structural types, quality tiers, and toggle valid combinations with one click',
    addPropertyType: 'Add Property Type',
    addClassification: 'Add Classification',
    matrixTitle: 'Type-Classification Pairing Matrix',
    matrixDesc: 'Click any checkbox to immediately enable or disable an allowed combination in PropertyTypeClassification',
    eavTitle: 'Dynamic EAV Specification Engine',
    eavSubtitle: 'Manage Attribute Groups, Definitions, ENUM Options, and map attributes to Unit Types',
    propTitle: 'Properties & House Rules Manager',
    propSubtitle: 'Manage real-estate properties, physical addresses, GPS coordinates, multi-lingual details, and policies',
    addProperty: 'Add New Property',
    unitsTitle: 'Bookable Units & Dynamic Attribute Engine',
    unitsSubtitle: 'Individual inventory units with typed EAV values, pricing, capacity, and live filterAttributes JSON sync',
    addUnit: 'Add Bookable Unit',
    rawTitle: 'Raw Workbook Explorer & Localization Matrix',
    rawSubtitle: 'Direct access to all 17 Excel sheets, foreign key labels, and central Translation dictionary',
    addRow: 'Add Row to Active Sheet',
    actions: 'Actions',
    cancel: 'Cancel',
    save: 'Save Changes',
    delete: 'Delete',
    edit: 'Edit',
    confirmDelete: 'Are you sure you want to delete this record?'
  },
  ar: {
    appTitle: 'محرك العقارات',
    downloadExcel: 'تحميل ملف Excel المحدث',
    uploadExcel: 'رفع / استبدال الملف',
    cleanOrphans: 'تنظيف السجلات الفارغة',
    navOverview: 'نظرة عامة والمصنف',
    navLocations: 'المواقع الجغرافية',
    navTaxonomy: 'تصنيف العقارات',
    navEAV: 'محرك الخصائص والمواصفات (EAV)',
    navProperties: 'العقارات والسياسات',
    navUnits: 'الوحدات القابلة للحجز',
    navSheets: 'الجداول المباشرة والترجمة',
    sheetsLabel: 'إجمالي الجداول',
    recordsLabel: 'إجمالي السجلات',
    concurrencyLabel: 'قفل التزامن (Mutex)',
    overviewHeroTitle: 'نظام محاكاة محرك العقارات عبر Excel',
    overviewHeroDesc: 'محاكاة كاملة لقواعد البيانات العلائقية، والمفاتيح الأجنبية، والترجمات المتعددة، ومحرك الخصائص الديناميكي مباشرة على ملف property_engine.xlsx.',
    sheetsCardTitle: 'جميع أوراق المصنف الـ 17',
    sheetsCardSub: 'انقر على أي جدول لمعاينة بياناته مباشرة أو إدارتها',
    refresh: 'تحديث الإحصائيات',
    geoTitle: 'إدارة الهيكل الجغرافي',
    geoSubtitle: 'إدارة متسلسلة للدول والمدن والأحياء مع دعم الترجمة العربية والإنجليزية',
    addCountry: 'إضافة دولة',
    addCity: 'إضافة مدينة',
    addDistrict: 'إضافة حي',
    countries: 'الدول',
    cities: 'المدن',
    districts: 'الأحياء',
    taxonomyTitle: 'تصنيف العقارات ومصفوفة الربط',
    taxonomySubtitle: 'تحديد الأنواع الإنشائية والمستويات التجارية وربطها بنقرة واحدة',
    addPropertyType: 'إضافة نوع عقار',
    addClassification: 'إضافة تصنيف عقار',
    matrixTitle: 'مصفوفة الربط بين الأنواع والتصنيفات',
    matrixDesc: 'انقر فوق أي مربع لتفعيل أو تعطيل هذا المزيج في جدول PropertyTypeClassification فوراً',
    eavTitle: 'محرك الخصائص والمواصفات الديناميكي (EAV)',
    eavSubtitle: 'إدارة مجموعات الخصائص، والتعريفات، وخيارات القوائم، وربط الخصائص بأنواع الوحدات',
    propTitle: 'إدارة العقارات والسياسات والشروط',
    propSubtitle: 'إدارة المنشآت العقارية، والعناوين التفصيلية، والإحداثيات الجغرافية، والسياسات',
    addProperty: 'إضافة عقار جديد',
    unitsTitle: 'الوحدات القابلة للحجز والخصائص المباشرة',
    unitsSubtitle: 'إدارة الوحدات والأسعار والسعة، مع مزامنة فورية لمواصفات البحث بصيغة JSON',
    addUnit: 'إضافة وحدة جديدة',
    rawTitle: 'مستعرض الجداول المباشر ومصفوفة الترجمات',
    rawSubtitle: 'الوصول المباشر إلى الـ 17 جدولاً في ملف الإكسل مع أسماء المفاتيح المترجمة',
    addRow: 'إضافة صف للجدول الحالي',
    actions: 'الإجراءات',
    cancel: 'إلغاء',
    save: 'حفظ التغييرات',
    delete: 'حذف',
    edit: 'تعديل',
    confirmDelete: 'هل أنت متأكد من رغبتك في حذف هذا السجل؟'
  }
};

class DashboardApp {
  constructor() {
    this.currentLang = 'ar';
    this.activeTab = 'overview';
    this.stats = null;
    this.locations = { countries: [], cities: [], districts: [] };
    this.selectedCountryId = null;
    this.selectedCityId = null;
    this.taxonomy = null;
    this.eav = null;
    this.properties = [];
    this.units = [];
    this.currentSheet = 'Property';
    this.activeRawData = [];

    this.init();
  }

  async init() {
    this.bindEvents();
    this.applyLanguage(this.currentLang);
    await this.refreshAll();
  }

  bindEvents() {
    // Navigation Tabs
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Language Toggle
    document.getElementById('btnLangToggle').addEventListener('click', () => {
      this.toggleLanguage();
    });

    // Clean Orphans
    document.getElementById('btnCleanOrphans').addEventListener('click', async () => {
      await this.cleanOrphans();
    });

    // Upload Modal
    document.getElementById('btnUploadModal').addEventListener('click', () => {
      this.openUploadModal();
    });

    // Geo Search Inputs
    const countrySearch = document.getElementById('countrySearch');
    if (countrySearch) {
      countrySearch.addEventListener('input', () => this.renderCountryList());
    }
    const citySearch = document.getElementById('citySearch');
    if (citySearch) {
      citySearch.addEventListener('input', () => this.renderCityList());
    }
    const districtSearch = document.getElementById('districtSearch');
    if (districtSearch) {
      districtSearch.addEventListener('input', () => this.renderDistrictList());
    }

    // Property Search and Filters
    const propSearch = document.getElementById('propertySearch');
    if (propSearch) propSearch.addEventListener('input', () => this.renderProperties());
    const propStatus = document.getElementById('propertyStatusFilter');
    if (propStatus) propStatus.addEventListener('change', () => this.renderProperties());
    const propType = document.getElementById('propertyTypeFilter');
    if (propType) propType.addEventListener('change', () => this.renderProperties());

    // Unit Search and Filters
    const unitSearch = document.getElementById('unitSearch');
    if (unitSearch) unitSearch.addEventListener('input', () => this.renderUnits());
    const unitProp = document.getElementById('unitPropertyFilter');
    if (unitProp) unitProp.addEventListener('change', () => this.renderUnits());
    const unitType = document.getElementById('unitTypeFilter');
    if (unitType) unitType.addEventListener('change', () => this.renderUnits());

    // Raw Sheet Search
    const rawSearch = document.getElementById('rawSearchInput');
    if (rawSearch) rawSearch.addEventListener('input', () => this.renderRawTable());
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.applyLanguage(this.currentLang);
  }

  applyLanguage(lang) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.getElementById('currentLangLabel').textContent = lang === 'ar' ? 'English' : 'العربية';

    const strings = I18N[lang] || I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (strings[key]) {
        el.textContent = strings[key];
      }
    });

    this.renderCurrentView();
    if (window.lucide) window.lucide.createIcons();
  }

  async fetchAPI(url, options = {}) {
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.error || 'Request failed');
      }
      return data;
    } catch (err) {
      this.showToast(err.message, 'error');
      throw err;
    }
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    const colors = {
      success: 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-emerald-600/10',
      error: 'bg-rose-50 border-rose-300 text-rose-800 shadow-rose-600/10',
      info: 'bg-white border-slate-300 text-slate-800 shadow-slate-600/10',
      warning: 'bg-amber-50 border-amber-300 text-amber-800 shadow-amber-600/10'
    };
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-triangle' : 'info';

    toast.className = `pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-xl text-xs font-semibold toast-slide-in ${colors[type] || colors.info}`;
    toast.innerHTML = `
      <i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  switchTab(tabId, param = null) {
    this.activeTab = tabId;
    document.querySelectorAll('.nav-item').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      if (pane.id === `tab-${tabId}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    if (tabId === 'sheets' && param) {
      this.currentSheet = param;
    }

    this.renderCurrentView();
    if (window.lucide) window.lucide.createIcons();
  }

  renderCurrentView() {
    switch (this.activeTab) {
      case 'overview':
        this.renderOverview();
        break;
      case 'locations':
        this.renderLocations();
        break;
      case 'taxonomy':
        this.renderTaxonomy();
        break;
      case 'eav':
        this.renderEAV();
        break;
      case 'properties':
        this.renderProperties();
        break;
      case 'units':
        this.renderUnits();
        break;
      case 'sheets':
        this.renderRawSheets();
        break;
    }
  }

  async refreshAll() {
    try {
      const statsRes = await this.fetchAPI('/api/workbook/stats');
      this.stats = statsRes.data;

      // Update Header & Sidebar Badges
      document.getElementById('headerTotalRows').textContent = `${this.stats.totalRows} records`;
      document.getElementById('sidebarTotalRecords').textContent = this.stats.totalRows;

      // Load data in parallel
      const [locRes, taxRes, eavRes, propRes, unitRes] = await Promise.all([
        this.fetchAPI('/api/locations'),
        this.fetchAPI('/api/taxonomy'),
        this.fetchAPI('/api/eav-schema'),
        this.fetchAPI('/api/properties'),
        this.fetchAPI('/api/bookable-units')
      ]);

      this.locations = locRes.data;
      this.taxonomy = taxRes.data;
      this.eav = eavRes.data;
      this.properties = propRes.data;
      this.units = unitRes.data;

      this.populatePropertyFilterDropdowns();
      this.renderCurrentView();
      if (window.lucide) window.lucide.createIcons();
    } catch (err) {
      console.error('Error refreshing dashboard:', err);
    }
  }

  /* ========================================================
     MODULE 1: OVERVIEW & WORKBOOK MANAGER
     ======================================================== */
  renderOverview() {
    if (!this.stats) return;

    // Metrics Grid
    const keySheets = [
      { name: 'Property', label: 'Properties', icon: 'building', color: 'cyan', count: this.stats.sheets.Property || 0 },
      { name: 'BookableUnit', label: 'Bookable Units', icon: 'door-open', color: 'rose', count: this.stats.sheets.BookableUnit || 0 },
      { name: 'District', label: 'Districts', icon: 'map-pin', color: 'blue', count: this.stats.sheets.District || 0 },
      { name: 'PropertyType', label: 'Taxonomy Types', icon: 'tag', color: 'purple', count: this.stats.sheets.PropertyType || 0 },
      { name: 'AttributeDefinition', label: 'EAV Attributes', icon: 'sliders', color: 'amber', count: this.stats.sheets.AttributeDefinition || 0 },
      { name: 'Translation', label: 'Translations', icon: 'globe', color: 'emerald', count: this.stats.sheets.Translation || 0 }
    ];

    const grid = document.getElementById('overviewMetricsGrid');
    grid.innerHTML = keySheets.map(item => `
      <div onclick="app.switchTab('${this.getSheetTargetTab(item.name)}')" class="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3.5 space-y-2 cursor-pointer transition-all hover:shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs text-slate-500 font-medium">${item.label}</span>
          <div class="w-7 h-7 rounded-lg bg-${item.color}-100 text-${item.color}-700 flex items-center justify-center">
            <i data-lucide="${item.icon}" class="w-4 h-4"></i>
          </div>
        </div>
        <div class="text-xl font-bold text-slate-900 tracking-tight">${item.count}</div>
      </div>
    `).join('');

    // All 17 Sheets Grid
    const allSheetsContainer = document.getElementById('allSheetsGrid');
    allSheetsContainer.innerHTML = Object.entries(this.stats.sheets).map(([sheetName, count]) => `
      <div onclick="app.switchTab('sheets', '${sheetName}')" class="p-3 bg-slate-50/70 border border-slate-200 hover:border-emerald-500/60 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:bg-emerald-50/30">
        <div class="flex items-center gap-2.5">
          <i data-lucide="table" class="w-4 h-4 text-emerald-600"></i>
          <div>
            <div class="text-xs font-bold text-slate-900">${sheetName}</div>
            <div class="text-[10px] text-slate-500 font-medium">${this.getSheetCategory(sheetName)}</div>
          </div>
        </div>
        <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">${count}</span>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  getSheetTargetTab(sheetName) {
    if (['Country', 'City', 'District'].includes(sheetName)) return 'locations';
    if (['PropertyType', 'PropertyClassification', 'PropertyTypeClassification'].includes(sheetName)) return 'taxonomy';
    if (['AttributeGroup', 'AttributeDefinition', 'AttributeOption', 'UnitTypeAttribute'].includes(sheetName)) return 'eav';
    if (['Property', 'PropertyRule'].includes(sheetName)) return 'properties';
    if (['BookableUnit', 'BookableUnitType', 'BookableUnitAttributeValue'].includes(sheetName)) return 'units';
    return 'sheets';
  }

  getSheetCategory(sheetName) {
    if (['Country', 'City', 'District'].includes(sheetName)) return 'Geographic Hierarchy';
    if (['PropertyType', 'PropertyClassification', 'PropertyTypeClassification'].includes(sheetName)) return 'Taxonomy & Matrix';
    if (['Property', 'PropertyRule'].includes(sheetName)) return 'Core Inventory';
    if (['BookableUnit', 'BookableUnitType'].includes(sheetName)) return 'Units Catalog';
    if (['AttributeGroup', 'AttributeDefinition', 'AttributeOption', 'UnitTypeAttribute', 'BookableUnitAttributeValue'].includes(sheetName)) return 'EAV Engine';
    return 'Localization';
  }

  async cleanOrphans() {
    try {
      const res = await this.fetchAPI('/api/workbook/clean-orphans', { method: 'POST' });
      this.showToast(res.message, 'success');
      await this.refreshAll();
    } catch (err) {
      this.showToast('Clean orphans failed: ' + err.message, 'error');
    }
  }

  openUploadModal() {
    this.openModal(`
      <div class="p-6 space-y-4 max-w-md w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <i data-lucide="upload-cloud" class="w-5 h-5 text-blue-600"></i>
            <h3 class="text-base font-bold text-slate-900">Upload & Replace property_engine.xlsx</h3>
          </div>
          <button onclick="app.closeModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Select an updated <code>property_engine.xlsx</code> file. The current workbook will be automatically backed up, replaced, and hot-reloaded into memory.
        </p>
        <form id="uploadForm" class="space-y-4">
          <div class="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center cursor-pointer bg-slate-50">
            <input type="file" id="excelFileInput" accept=".xlsx" class="hidden" required>
            <label for="excelFileInput" class="cursor-pointer space-y-2 block">
              <i data-lucide="file-spreadsheet" class="w-10 h-10 text-blue-600 mx-auto"></i>
              <div id="fileUploadLabel" class="text-xs text-slate-700 font-semibold">Click to choose .xlsx file</div>
              <div class="text-[10px] text-slate-500">Only .xlsx format is supported</div>
            </label>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" onclick="app.closeModal()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button>
            <button type="submit" id="btnSubmitUpload" class="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 shadow-sm">
              <i data-lucide="upload" class="w-3.5 h-3.5"></i> Upload & Hot-Reload
            </button>
          </div>
        </form>
      </div>
    `);

    const fileInput = document.getElementById('excelFileInput');
    const label = document.getElementById('fileUploadLabel');
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        label.textContent = fileInput.files[0].name;
        label.classList.add('text-blue-600');
      }
    });

    document.getElementById('uploadForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!fileInput.files.length) return;
      const formData = new FormData();
      formData.append('file', fileInput.files[0]);

      const submitBtn = document.getElementById('btnSubmitUpload');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Uploading...';
      if (window.lucide) window.lucide.createIcons();

      try {
        const res = await fetch('/api/workbook/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Upload failed');
        this.showToast('Workbook replaced and hot-reloaded successfully!', 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) {
        this.showToast(err.message, 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i data-lucide="upload" class="w-3.5 h-3.5"></i> Upload & Hot-Reload';
      }
    });
  }

  /* ========================================================
     MODULE 2: GEO-LOCATION MANAGER (3-Column View)
     ======================================================== */
  renderLocations() {
    this.renderCountryList();
    this.renderCityList();
    this.renderDistrictList();
  }

  renderCountryList() {
    const query = (document.getElementById('countrySearch')?.value || '').toLowerCase();
    const list = document.getElementById('countryList');
    if (!list) return;

    const countries = this.locations.countries.filter(c => 
      c.name.toLowerCase().includes(query) || 
      (c.code && c.code.toLowerCase().includes(query)) ||
      (c.slug && c.slug.toLowerCase().includes(query))
    );

    document.getElementById('countryCountBadge').textContent = countries.length;

    // Auto select first country if none selected
    if (!this.selectedCountryId && countries.length > 0) {
      this.selectedCountryId = countries[0].id;
    }

    list.innerHTML = countries.map(c => {
      const isSelected = c.id === this.selectedCountryId;
      const arName = c.translations?.ar?.name || c.name;
      const enName = c.translations?.en?.name || c.name;

      return `
        <div onclick="app.selectCountry('${c.id}')" class="p-3 rounded-xl border cursor-pointer transition-all ${
          isSelected 
            ? 'bg-blue-50/80 border-blue-400 shadow-sm' 
            : 'bg-white border-slate-200 hover:bg-slate-50'
        }">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded bg-blue-100 text-blue-700 font-mono text-xs font-bold flex items-center justify-center">${c.code || 'GL'}</span>
              <span class="text-xs font-bold text-slate-900">${this.currentLang === 'ar' ? arName : enName}</span>
            </div>
            <div class="flex items-center gap-1">
              <button onclick="event.stopPropagation(); app.editGeoItem('Country', '${c.id}')" class="p-1 text-slate-400 hover:text-slate-700" title="Edit">
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              </button>
              <button onclick="event.stopPropagation(); app.deleteGeoItem('Country', '${c.id}')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-mono">
            <span>slug: ${c.slug}</span>
            <span>dial: ${c.key || ''}</span>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  selectCountry(countryId) {
    this.selectedCountryId = countryId;
    this.selectedCityId = null;
    this.renderCountryList();
    this.renderCityList();
    this.renderDistrictList();
  }

  renderCityList() {
    const query = (document.getElementById('citySearch')?.value || '').toLowerCase();
    const list = document.getElementById('cityList');
    if (!list) return;

    let cities = this.locations.cities;
    if (this.selectedCountryId) {
      cities = cities.filter(c => c.countryId === this.selectedCountryId);
      const parentCountry = this.locations.countries.find(co => co.id === this.selectedCountryId);
      document.getElementById('selectedCountryName').textContent = parentCountry ? parentCountry.name : 'Selected';
    } else {
      document.getElementById('selectedCountryName').textContent = 'All Countries';
    }

    if (query) {
      cities = cities.filter(c => c.name.toLowerCase().includes(query) || (c.slug && c.slug.toLowerCase().includes(query)));
    }

    document.getElementById('cityCountBadge').textContent = cities.length;

    if (!this.selectedCityId && cities.length > 0) {
      this.selectedCityId = cities[0].id;
    }

    list.innerHTML = cities.map(c => {
      const isSelected = c.id === this.selectedCityId;
      const arName = c.translations?.ar?.name || c.name;
      const enName = c.translations?.en?.name || c.name;

      return `
        <div onclick="app.selectCity('${c.id}')" class="p-3 rounded-xl border cursor-pointer transition-all ${
          isSelected 
            ? 'bg-emerald-50/80 border-emerald-400 shadow-sm' 
            : 'bg-white border-slate-200 hover:bg-slate-50'
        }">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-900">${this.currentLang === 'ar' ? arName : enName}</span>
            <div class="flex items-center gap-1">
              <button onclick="event.stopPropagation(); app.editGeoItem('City', '${c.id}')" class="p-1 text-slate-400 hover:text-slate-700" title="Edit">
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              </button>
              <button onclick="event.stopPropagation(); app.deleteGeoItem('City', '${c.id}')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-mono">
            <span>slug: ${c.slug}</span>
            <span>${c.countryName || ''}</span>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  selectCity(cityId) {
    this.selectedCityId = cityId;
    this.renderCityList();
    this.renderDistrictList();
  }

  renderDistrictList() {
    const query = (document.getElementById('districtSearch')?.value || '').toLowerCase();
    const list = document.getElementById('districtList');
    if (!list) return;

    let districts = this.locations.districts;
    if (this.selectedCityId) {
      districts = districts.filter(d => d.cityId === this.selectedCityId);
      const parentCity = this.locations.cities.find(ci => ci.id === this.selectedCityId);
      document.getElementById('selectedCityName').textContent = parentCity ? parentCity.name : 'Selected';
    } else {
      document.getElementById('selectedCityName').textContent = 'All Cities';
    }

    if (query) {
      districts = districts.filter(d => d.name.toLowerCase().includes(query) || (d.slug && d.slug.toLowerCase().includes(query)));
    }

    document.getElementById('districtCountBadge').textContent = districts.length;

    list.innerHTML = districts.map(d => {
      const arName = d.translations?.ar?.name || d.name;
      const enName = d.translations?.en?.name || d.name;

      return `
        <div class="p-3 rounded-xl border bg-white border-slate-200 hover:bg-slate-50 transition-all shadow-2xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-900">${this.currentLang === 'ar' ? arName : enName}</span>
            <div class="flex items-center gap-1">
              <button onclick="app.editGeoItem('District', '${d.id}')" class="p-1 text-slate-400 hover:text-slate-700" title="Edit">
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              </button>
              <button onclick="app.deleteGeoItem('District', '${d.id}')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-mono">
            <span>slug: ${d.slug}</span>
            <span>city: ${d.cityName || ''}</span>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  openGeoModal(type, existingItem = null) {
    const isEdit = Boolean(existingItem);
    const title = `${isEdit ? 'Edit' : 'Add'} ${type}`;
    const countries = this.locations.countries;
    const cities = this.locations.cities;

    let parentSelector = '';
    if (type === 'City') {
      parentSelector = `
        <div class="space-y-1">
          <label class="text-xs text-slate-700 font-semibold">Country (Foreign Key) *</label>
          <select name="countryId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-blue-500">
            ${countries.map(c => `
              <option value="${c.id}" ${existingItem && existingItem.countryId === c.id ? 'selected' : (this.selectedCountryId === c.id ? 'selected' : '')}>
                ${c.name} (${c.code})
              </option>
            `).join('')}
          </select>
        </div>
      `;
    } else if (type === 'District') {
      parentSelector = `
        <div class="space-y-1">
          <label class="text-xs text-slate-700 font-semibold">City (Foreign Key) *</label>
          <select name="cityId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-blue-500">
            ${cities.map(ci => `
              <option value="${ci.id}" ${existingItem && existingItem.cityId === ci.id ? 'selected' : (this.selectedCityId === ci.id ? 'selected' : '')}>
                ${ci.name} (${ci.countryName})
              </option>
            `).join('')}
          </select>
        </div>
      `;
    }

    const countryExtraFields = type === 'Country' ? `
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1">
          <label class="text-xs text-slate-700 font-semibold">ISO Code (e.g. SA, AE) *</label>
          <input type="text" name="code" value="${existingItem?.code || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono uppercase focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="space-y-1">
          <label class="text-xs text-slate-700 font-semibold">Dialing Key (e.g. +966) *</label>
          <input type="text" name="key" value="${existingItem?.key || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono focus:ring-2 focus:ring-blue-500">
        </div>
      </div>
    ` : '';

    this.openModal(`
      <div class="p-6 space-y-4 max-w-lg w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 class="text-base font-bold text-slate-900">${title}</h3>
          <button onclick="app.closeModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <form id="geoForm" class="space-y-3">
          ${parentSelector}
          <div class="space-y-1">
            <label class="text-xs text-slate-700 font-semibold">URL Lookup Slug (e.g. riyadh, al-olaya) *</label>
            <input type="text" name="slug" value="${existingItem?.slug || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono lowercase focus:ring-2 focus:ring-blue-500">
          </div>
          ${countryExtraFields}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Name (Arabic - العربية) *</label>
              <input type="text" name="name_ar" value="${existingItem?.translations?.ar?.name || existingItem?.name || ''}" dir="rtl" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-arabic focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Name (English) *</label>
              <input type="text" name="name_en" value="${existingItem?.translations?.en?.name || existingItem?.name || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-blue-500">
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button type="button" onclick="app.closeModal()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm">
              Save
            </button>
          </div>
        </form>
      </div>
    `);

    document.getElementById('geoForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = {
        name: fd.get('name_en') || fd.get('name_ar'),
        slug: fd.get('slug'),
        translations: {
          ar: { name: fd.get('name_ar') },
          en: { name: fd.get('name_en') }
        }
      };

      if (type === 'Country') {
        payload.code = fd.get('code');
        payload.key = fd.get('key');
      } else if (type === 'City') {
        payload.countryId = fd.get('countryId');
      } else if (type === 'District') {
        payload.cityId = fd.get('cityId');
      }

      const endpoint = type === 'Country' ? '/api/countries' : type === 'City' ? '/api/cities' : '/api/districts';
      const url = isEdit ? `${endpoint}/${existingItem.id}` : endpoint;
      const method = isEdit ? 'PUT' : 'POST';

      try {
        await this.fetchAPI(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        this.showToast(`${type} saved successfully!`, 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) {}
    });
  }

  editGeoItem(type, id) {
    let item = null;
    if (type === 'Country') item = this.locations.countries.find(c => c.id === id);
    else if (type === 'City') item = this.locations.cities.find(c => c.id === id);
    else if (type === 'District') item = this.locations.districts.find(d => d.id === id);
    if (item) this.openGeoModal(type, item);
  }

  async deleteGeoItem(type, id) {
    if (!confirm(`Are you sure you want to delete this ${type}? Dependent records may be affected.`)) return;
    const endpoint = type === 'Country' ? '/api/countries' : type === 'City' ? '/api/cities' : '/api/districts';
    try {
      await this.fetchAPI(`${endpoint}/${id}?cascade=true`, { method: 'DELETE' });
      this.showToast(`${type} deleted.`, 'success');
      await this.refreshAll();
    } catch (err) {}
  }

  /* ========================================================
     MODULE 3: PROPERTY TAXONOMY & MATRIX
     ======================================================== */
  renderTaxonomy() {
    if (!this.taxonomy) return;

    const table = document.getElementById('taxonomyMatrixTable');
    if (!table) return;

    const { types, classifications, matrix } = this.taxonomy;

    let thead = `
      <thead>
        <tr class="border-b border-slate-200 text-slate-500 bg-slate-50/70">
          <th class="py-2.5 px-3">Property Type \\ Tier</th>
          ${classifications.map(c => `<th class="py-2.5 px-3 text-center uppercase font-mono font-bold">${c.code}</th>`).join('')}
        </tr>
      </thead>
    `;

    let tbody = `
      <tbody class="divide-y divide-slate-100">
        ${types.map(t => `
          <tr class="hover:bg-slate-50/60">
            <td class="py-3 px-3 font-bold text-slate-900 uppercase font-mono">${t.code}</td>
            ${classifications.map(c => {
              const pair = matrix.find(m => m.propertyTypeId === t.id && m.classificationId === c.id);
              const isChecked = pair && pair.isEnabled;
              return `
                <td class="py-3 px-3 text-center">
                  <input type="checkbox" ${isChecked ? 'checked' : ''} 
                    onchange="app.toggleTaxonomyPair('${t.id}', '${c.id}', this.checked)"
                    class="w-4 h-4 rounded text-purple-600 bg-white border-slate-300 focus:ring-purple-500 cursor-pointer">
                </td>
              `;
            }).join('')}
          </tr>
        `).join('')}
      </tbody>
    `;

    table.innerHTML = thead + tbody;

    // Render Property Types list
    document.getElementById('propertyTypeList').innerHTML = types.map(t => `
      <div class="p-3 bg-slate-50/70 border border-slate-200 rounded-xl flex items-center justify-between">
        <div>
          <span class="text-xs font-bold text-slate-900 uppercase font-mono">${t.code}</span>
          <span class="text-[10px] ml-2 text-slate-500">${t.id}</span>
        </div>
        <div class="flex items-center gap-1">
          <button onclick="app.openTaxonomyModal('PropertyType', ${JSON.stringify(t).replace(/"/g, '&quot;')})" class="p-1 text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
          <button onclick="app.deleteTaxonomyItem('PropertyType', '${t.id}')" class="p-1 text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
        </div>
      </div>
    `).join('');

    // Render Classifications list
    document.getElementById('classificationList').innerHTML = classifications.map(c => `
      <div class="p-3 bg-slate-50/70 border border-slate-200 rounded-xl flex items-center justify-between">
        <div>
          <span class="text-xs font-bold text-slate-900 uppercase font-mono">${c.code}</span>
          <span class="text-[10px] ml-2 text-slate-500">${c.id}</span>
        </div>
        <div class="flex items-center gap-1">
          <button onclick="app.openTaxonomyModal('PropertyClassification', ${JSON.stringify(c).replace(/"/g, '&quot;')})" class="p-1 text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
          <button onclick="app.deleteTaxonomyItem('PropertyClassification', '${c.id}')" class="p-1 text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  async toggleTaxonomyPair(propertyTypeId, classificationId, isEnabled) {
    try {
      const res = await this.fetchAPI('/api/property-type-classifications/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyTypeId, classificationId, isEnabled })
      });
      this.taxonomy = res.data;
      this.showToast('Combination updated in PropertyTypeClassification!', 'success');
      this.renderTaxonomy();
    } catch (err) {}
  }

  openTaxonomyModal(type, existing = null) {
    const isEdit = Boolean(existing);
    this.openModal(`
      <div class="p-6 space-y-4 max-w-sm w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 class="text-base font-bold text-slate-900">${isEdit ? 'Edit' : 'Add'} ${type}</h3>
          <button onclick="app.closeModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <form id="taxonomyForm" class="space-y-3">
          <div class="space-y-1">
            <label class="text-xs text-slate-700 font-semibold">Code (e.g. hotel, chalet, luxury) *</label>
            <input type="text" name="code" value="${existing?.code || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono lowercase focus:ring-2 focus:ring-purple-500">
          </div>
          <div class="flex items-center gap-2 pt-2">
            <input type="checkbox" id="taxActive" name="isActive" ${existing?.isActive !== false ? 'checked' : ''} class="w-4 h-4 rounded text-purple-600 bg-white border-slate-300">
            <label for="taxActive" class="text-xs text-slate-700 font-medium">Is Active</label>
          </div>
          <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button type="button" onclick="app.closeModal()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm">Save</button>
          </div>
        </form>
      </div>
    `);

    document.getElementById('taxonomyForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = {
        code: fd.get('code'),
        isActive: fd.get('isActive') === 'on'
      };
      const endpoint = type === 'PropertyType' ? '/api/property-types' : '/api/property-classifications';
      const url = isEdit ? `${endpoint}/${existing.id}` : endpoint;
      const method = isEdit ? 'PUT' : 'POST';

      try {
        await this.fetchAPI(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        this.showToast(`${type} saved.`, 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) {}
    });
  }

  async deleteTaxonomyItem(type, id) {
    if (!confirm('Are you sure you want to delete this?')) return;
    const endpoint = type === 'PropertyType' ? '/api/property-types' : '/api/property-classifications';
    try {
      await this.fetchAPI(`${endpoint}/${id}?cascade=true`, { method: 'DELETE' });
      this.showToast(`${type} deleted.`, 'success');
      await this.refreshAll();
    } catch (err) {}
  }

  /* ========================================================
     MODULE 4: DYNAMIC EAV ENGINE BUILDER
     ======================================================== */
  renderEAV() {
    if (!this.eav) return;

    // Populate Groups
    const groupsList = document.getElementById('eavGroupsList');
    if (groupsList) {
      groupsList.innerHTML = `
        <button onclick="app.filterEavByGroup(null)" class="w-full text-left rtl:text-right px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100">
          All Groups (${this.eav.definitions.length})
        </button>
        ${this.eav.groups.map(g => `
          <div class="flex items-center justify-between px-2.5 py-1 rounded-lg hover:bg-slate-100 group">
            <button onclick="app.filterEavByGroup('${g.id}')" class="text-xs font-semibold text-amber-700 truncate text-left rtl:text-right">
              ${g.code}
            </button>
            <div class="hidden group-hover:flex items-center gap-1">
              <button onclick="app.editAttributeGroup('${g.id}')" class="text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-3 h-3"></i></button>
              <button onclick="app.deleteAttributeGroup('${g.id}')" class="text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-3 h-3"></i></button>
            </div>
          </div>
        `).join('')}
      `;
    }

    this.renderAttributeDefinitions();

    const unitTypeSelect = document.getElementById('mapperUnitTypeSelect');
    if (unitTypeSelect && this.eav.unitTypes) {
      unitTypeSelect.innerHTML = this.eav.unitTypes.map(ut => `
        <option value="${ut.id}">${ut.code}</option>
      `).join('');
      this.loadUnitTypeMapper();
    }

    if (window.lucide) window.lucide.createIcons();
  }

  filterEavByGroup(groupId) {
    this.selectedEavGroupId = groupId;
    this.renderAttributeDefinitions();
  }

  renderAttributeDefinitions() {
    const tbody = document.getElementById('attrDefTableBody');
    if (!tbody || !this.eav) return;

    const query = (document.getElementById('attrDefSearch')?.value || '').toLowerCase();
    let defs = this.eav.definitions;

    if (this.selectedEavGroupId) {
      defs = defs.filter(d => d.groupId === this.selectedEavGroupId);
    }
    if (query) {
      defs = defs.filter(d => d.key.toLowerCase().includes(query) || (d.groupCode && d.groupCode.toLowerCase().includes(query)));
    }

    tbody.innerHTML = defs.map(d => {
      const flags = [
        d.isRequired ? '<span class="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-mono text-[9px] font-bold">REQ</span>' : '',
        d.isFilterable ? '<span class="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold">FILTER</span>' : '',
        d.isSearchable ? '<span class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-[9px] font-bold">SEARCH</span>' : ''
      ].filter(Boolean).join(' ');

      const optionsBadges = d.valueType === 'ENUM' && d.options && d.options.length > 0
        ? d.options.map(o => `<span class="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-mono text-[10px] border border-purple-200 font-semibold">${o.value}</span>`).join(' ')
        : '<span class="text-slate-400 font-mono text-[10px]">-</span>';

      return `
        <tr class="hover:bg-slate-50/70">
          <td class="py-2.5 px-3">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center font-mono text-xs">
                ${d.icon ? `<i data-lucide="${d.icon}" class="w-3.5 h-3.5"></i>` : '#'}
              </span>
              <span class="font-bold text-slate-900 font-mono">${d.key}</span>
            </div>
          </td>
          <td class="py-2.5 px-3 font-mono font-semibold text-amber-700">${d.valueType}</td>
          <td class="py-2.5 px-3 text-slate-600 font-mono">${d.groupCode || '-'}</td>
          <td class="py-2.5 px-3 font-mono text-slate-600">${d.unitCode || '-'}</td>
          <td class="py-2.5 px-3">${flags || '-'}</td>
          <td class="py-2.5 px-3"><div class="flex flex-wrap gap-1 max-w-xs">${optionsBadges}</div></td>
          <td class="py-2.5 px-3 text-right rtl:text-left">
            <div class="flex items-center justify-end rtl:justify-start gap-1">
              <button onclick="app.openAttributeDefModal('${d.id}')" class="p-1 text-slate-400 hover:text-slate-700" title="Edit">
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              </button>
              <button onclick="app.deleteAttributeDef('${d.id}')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  switchEavSubTab(sub) {
    const btnDefs = document.getElementById('subtab-btn-defs');
    const btnMapper = document.getElementById('subtab-btn-mapper');
    const paneDefs = document.getElementById('eav-subtab-defs');
    const paneMapper = document.getElementById('eav-subtab-mapper');

    if (sub === 'defs') {
      btnDefs.className = 'px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-100 text-amber-800 border border-amber-300 shadow-sm';
      btnMapper.className = 'px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100';
      paneDefs.classList.remove('hidden');
      paneMapper.classList.add('hidden');
    } else {
      btnMapper.className = 'px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-100 text-amber-800 border border-amber-300 shadow-sm';
      btnDefs.className = 'px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100';
      paneMapper.classList.remove('hidden');
      paneDefs.classList.add('hidden');
      this.loadUnitTypeMapper();
    }
  }

  loadUnitTypeMapper() {
    const unitTypeId = document.getElementById('mapperUnitTypeSelect')?.value;
    const tbody = document.getElementById('unitTypeMapperTableBody');
    if (!unitTypeId || !tbody || !this.eav) return;

    const mappings = this.eav.unitTypeAttributes.filter(m => m.unitTypeId === unitTypeId);

    tbody.innerHTML = this.eav.definitions.map(def => {
      const match = mappings.find(m => m.attributeId === def.id);
      const isAssigned = Boolean(match);
      const isReq = match ? Boolean(match.isRequired) : false;
      const isFilt = match && match.isFilterable !== null ? Boolean(match.isFilterable) : false;
      const isDisp = match && match.isDisplayable !== null ? Boolean(match.isDisplayable) : true;
      const sortOrder = match ? match.sortOrder : def.displayOrder || 0;

      return `
        <tr class="hover:bg-slate-50/70" data-attr-id="${def.id}">
          <td class="py-2.5 px-3">
            <input type="checkbox" class="mapper-assigned w-4 h-4 rounded text-amber-600 bg-white border-slate-300" ${isAssigned ? 'checked' : ''}>
          </td>
          <td class="py-2.5 px-3 font-mono font-bold text-slate-900">${def.key}</td>
          <td class="py-2.5 px-3 font-mono text-amber-700 font-semibold text-xs">${def.valueType}</td>
          <td class="py-2.5 px-3 font-mono text-slate-600 text-xs">${def.groupCode || '-'}</td>
          <td class="py-2.5 px-3 text-center">
            <input type="checkbox" class="mapper-req w-3.5 h-3.5 rounded text-rose-600 bg-white border-slate-300" ${isReq ? 'checked' : ''}>
          </td>
          <td class="py-2.5 px-3 text-center">
            <input type="checkbox" class="mapper-filt w-3.5 h-3.5 rounded text-emerald-600 bg-white border-slate-300" ${isFilt ? 'checked' : ''}>
          </td>
          <td class="py-2.5 px-3 text-center">
            <input type="checkbox" class="mapper-disp w-3.5 h-3.5 rounded text-blue-600 bg-white border-slate-300" ${isDisp ? 'checked' : ''}>
          </td>
          <td class="py-2.5 px-3">
            <input type="number" class="mapper-sort w-16 px-2 py-0.5 bg-white border border-slate-300 rounded text-xs text-slate-800" value="${sortOrder}">
          </td>
        </tr>
      `;
    }).join('');
  }

  async saveUnitTypeMapper() {
    const unitTypeId = document.getElementById('mapperUnitTypeSelect')?.value;
    if (!unitTypeId) return;

    const rows = document.querySelectorAll('#unitTypeMapperTableBody tr');
    const attributes = [];
    rows.forEach(r => {
      const attributeId = r.getAttribute('data-attr-id');
      const isAssigned = r.querySelector('.mapper-assigned').checked;
      const isRequired = r.querySelector('.mapper-req').checked;
      const isFilterable = r.querySelector('.mapper-filt').checked;
      const isDisplayable = r.querySelector('.mapper-disp').checked;
      const sortOrder = parseInt(r.querySelector('.mapper-sort').value, 10) || 0;

      attributes.push({ attributeId, isAssigned, isRequired, isFilterable, isDisplayable, sortOrder });
    });

    try {
      const res = await this.fetchAPI('/api/unit-type-attributes/save-matrix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitTypeId, attributes })
      });
      this.eav.unitTypeAttributes = res.data;
      this.showToast('Unit Type Attributes mapping saved successfully!', 'success');
    } catch (err) {}
  }

  openAttributeDefModal(defId = null) {
    const isEdit = Boolean(defId);
    const existing = isEdit ? this.eav.definitions.find(d => d.id === defId) : null;
    const groups = this.eav.groups;

    this.openModal(`
      <div class="p-6 space-y-4 max-w-lg w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 class="text-base font-bold text-slate-900">${isEdit ? 'Edit' : 'Add'} Attribute Definition</h3>
          <button onclick="app.closeModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <form id="attrDefForm" class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Attribute Key (e.g. bedrooms, has_pool) *</label>
              <input type="text" name="key" value="${existing?.key || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono focus:ring-2 focus:ring-amber-500">
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Value Type *</label>
              <select name="valueType" id="attrDefValueType" onchange="app.onAttrValueTypeChange(this.value)" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-semibold">
                ${['TEXT', 'NUMBER', 'BOOLEAN', 'ENUM', 'DATE', 'JSON'].map(vt => `
                  <option value="${vt}" ${existing?.valueType === vt ? 'selected' : ''}>${vt}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Attribute Group *</label>
              <select name="groupId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">
                ${groups.map(g => `
                  <option value="${g.id}" ${existing?.groupId === g.id ? 'selected' : ''}>${g.code}</option>
                `).join('')}
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Icon (e.g. bed, pool, wifi)</label>
              <input type="text" name="icon" value="${existing?.icon || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono">
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Unit (e.g. room, m2)</label>
              <input type="text" name="unitCode" value="${existing?.unitCode || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono">
            </div>
          </div>

          <!-- Dynamic ENUM Options Sub-Form -->
          <div id="enumOptionsSubform" class="${existing?.valueType === 'ENUM' ? '' : 'hidden'} p-3 rounded-xl bg-purple-50/60 border border-purple-300 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-purple-900">ENUM Options (AttributeOption)</span>
              <button type="button" onclick="app.addEnumOptionRow()" class="text-xs text-purple-700 hover:text-purple-900 font-semibold">+ Add Option</button>
            </div>
            <div id="enumOptionsContainer" class="space-y-1.5 max-h-40 overflow-y-auto">
              ${(existing?.options || []).map((opt, i) => `
                <div class="flex items-center gap-2 enum-row">
                  <input type="text" placeholder="Value (e.g. sea_view)" value="${opt.value}" class="enum-val flex-1 px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono">
                  <input type="text" placeholder="Icon" value="${opt.icon || ''}" class="enum-icon w-20 px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono">
                  <button type="button" onclick="this.closest('.enum-row').remove()" class="text-slate-400 hover:text-rose-600"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Flags -->
          <div class="grid grid-cols-4 gap-2 pt-1 text-xs">
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" name="isRequired" ${existing?.isRequired ? 'checked' : ''} class="w-3.5 h-3.5 rounded text-amber-600 bg-white border-slate-300">
              <span class="text-slate-700 font-medium">Required</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" name="isFilterable" ${existing?.isFilterable ? 'checked' : ''} class="w-3.5 h-3.5 rounded text-amber-600 bg-white border-slate-300">
              <span class="text-slate-700 font-medium">Filterable</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" name="isSearchable" ${existing?.isSearchable ? 'checked' : ''} class="w-3.5 h-3.5 rounded text-amber-600 bg-white border-slate-300">
              <span class="text-slate-700 font-medium">Searchable</span>
            </label>
            <label class="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" name="isDisplayable" ${existing?.isDisplayable !== false ? 'checked' : ''} class="w-3.5 h-3.5 rounded text-amber-600 bg-white border-slate-300">
              <span class="text-slate-700 font-medium">Displayable</span>
            </label>
          </div>

          <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button type="button" onclick="app.closeModal()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-sm">Save</button>
          </div>
        </form>
      </div>
    `);

    if (window.lucide) window.lucide.createIcons();

    document.getElementById('attrDefForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const valueType = fd.get('valueType');

      const payload = {
        key: fd.get('key'),
        valueType,
        groupId: fd.get('groupId'),
        icon: fd.get('icon') || null,
        unitCode: fd.get('unitCode') || null,
        isRequired: fd.get('isRequired') === 'on',
        isFilterable: fd.get('isFilterable') === 'on',
        isSearchable: fd.get('isSearchable') === 'on',
        isDisplayable: fd.get('isDisplayable') === 'on',
        isActive: true
      };

      if (valueType === 'ENUM') {
        const optionRows = document.querySelectorAll('.enum-row');
        const options = [];
        optionRows.forEach((r, idx) => {
          const val = r.querySelector('.enum-val').value.trim();
          const icon = r.querySelector('.enum-icon').value.trim();
          if (val) options.push({ value: val, icon: icon || null, sortOrder: idx + 1 });
        });
        payload.options = options;
      }

      const url = isEdit ? `/api/attribute-definitions/${defId}` : '/api/attribute-definitions';
      const method = isEdit ? 'PUT' : 'POST';

      try {
        await this.fetchAPI(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        this.showToast('Attribute Definition saved.', 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) {}
    });
  }

  onAttrValueTypeChange(val) {
    const subform = document.getElementById('enumOptionsSubform');
    if (subform) {
      if (val === 'ENUM') {
        subform.classList.remove('hidden');
        if (document.querySelectorAll('.enum-row').length === 0) {
          this.addEnumOptionRow();
        }
      } else {
        subform.classList.add('hidden');
      }
    }
  }

  addEnumOptionRow() {
    const container = document.getElementById('enumOptionsContainer');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'flex items-center gap-2 enum-row';
    div.innerHTML = `
      <input type="text" placeholder="Value (e.g. sea_view)" class="enum-val flex-1 px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono">
      <input type="text" placeholder="Icon" class="enum-icon w-20 px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono">
      <button type="button" onclick="this.closest('.enum-row').remove()" class="text-slate-400 hover:text-rose-600"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
    `;
    container.appendChild(div);
    if (window.lucide) window.lucide.createIcons();
  }

  async deleteAttributeDef(id) {
    if (!confirm('Are you sure you want to delete this Attribute Definition? Values and options will be deleted.')) return;
    try {
      await this.fetchAPI(`/api/attribute-definitions/${id}?cascade=true`, { method: 'DELETE' });
      this.showToast('Attribute Definition deleted.', 'success');
      await this.refreshAll();
    } catch (err) {}
  }

  openAttributeGroupModal(groupId = null) {
    const existing = groupId ? this.eav.groups.find(g => g.id === groupId) : null;
    this.openModal(`
      <div class="p-6 space-y-4 max-w-sm w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 class="text-base font-bold text-slate-900">${existing ? 'Edit' : 'Add'} Attribute Group</h3>
          <button onclick="app.closeModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <form id="groupForm" class="space-y-3">
          <div class="space-y-1">
            <label class="text-xs text-slate-700 font-semibold">Group Code (e.g. basic, amenities) *</label>
            <input type="text" name="code" value="${existing?.code || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono focus:ring-2 focus:ring-amber-500">
          </div>
          <div class="space-y-1">
            <label class="text-xs text-slate-700 font-semibold">Icon Identifier (e.g. home, star)</label>
            <input type="text" name="icon" value="${existing?.icon || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono">
          </div>
          <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button type="button" onclick="app.closeModal()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-sm">Save</button>
          </div>
        </form>
      </div>
    `);

    document.getElementById('groupForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = { code: fd.get('code'), icon: fd.get('icon') || null, isActive: true };
      const url = existing ? `/api/attribute-groups/${groupId}` : '/api/attribute-groups';
      const method = existing ? 'PUT' : 'POST';
      try {
        await this.fetchAPI(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        this.showToast('Attribute Group saved.', 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) {}
    });
  }

  editAttributeGroup(id) {
    this.openAttributeGroupModal(id);
  }

  async deleteAttributeGroup(id) {
    if (!confirm('Are you sure you want to delete this Attribute Group?')) return;
    try {
      await this.fetchAPI(`/api/attribute-groups/${id}?cascade=true`, { method: 'DELETE' });
      this.showToast('Attribute Group deleted.', 'success');
      await this.refreshAll();
    } catch (err) {}
  }

  /* ========================================================
     MODULE 5: PROPERTIES & RULES MANAGER
     ======================================================== */
  populatePropertyFilterDropdowns() {
    const typeFilter = document.getElementById('propertyTypeFilter');
    if (typeFilter && this.taxonomy) {
      typeFilter.innerHTML = '<option value="">All Types</option>' + this.taxonomy.types.map(t => `
        <option value="${t.code}">${t.code.toUpperCase()}</option>
      `).join('');
    }

    const unitPropFilter = document.getElementById('unitPropertyFilter');
    if (unitPropFilter && this.properties) {
      unitPropFilter.innerHTML = '<option value="">All Properties</option>' + this.properties.map(p => `
        <option value="${p.id}">${p.name}</option>
      `).join('');
    }

    const unitTypeFilter = document.getElementById('unitTypeFilter');
    if (unitTypeFilter && this.eav) {
      unitTypeFilter.innerHTML = '<option value="">All Unit Types</option>' + this.eav.unitTypes.map(ut => `
        <option value="${ut.id}">${ut.code}</option>
      `).join('');
    }
  }

  renderProperties() {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;

    const query = (document.getElementById('propertySearch')?.value || '').toLowerCase();
    const statusFilter = document.getElementById('propertyStatusFilter')?.value;
    const typeFilter = document.getElementById('propertyTypeFilter')?.value;

    let props = this.properties;
    if (query) {
      props = props.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.addressLine1 && p.addressLine1.toLowerCase().includes(query)) ||
        (p.landmark && p.landmark.toLowerCase().includes(query))
      );
    }
    if (statusFilter) {
      props = props.filter(p => p.status === statusFilter);
    }
    if (typeFilter) {
      props = props.filter(p => p.propertyTypeCode === typeFilter);
    }

    grid.innerHTML = props.map(p => {
      const statusColors = {
        ACTIVE: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        PENDING: 'bg-amber-100 text-amber-800 border-amber-300',
        MAINTENANCE: 'bg-purple-100 text-purple-800 border-purple-300',
        REJECTED: 'bg-rose-100 text-rose-800 border-rose-300',
        INACTIVE: 'bg-slate-100 text-slate-700 border-slate-300'
      };

      const arName = p.translations?.ar?.name || p.name;
      const enName = p.translations?.en?.name || p.name;

      return `
        <div class="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div class="space-y-2">
            <div class="flex items-start justify-between gap-2">
              <div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[p.status] || statusColors.INACTIVE} border">
                  ${p.status}
                </span>
                <h3 class="text-base font-bold text-slate-900 mt-1.5">${this.currentLang === 'ar' ? arName : enName}</h3>
                <p class="text-xs text-slate-500 font-mono font-medium">${p.classificationLabel}</p>
              </div>
              <div class="flex items-center gap-1">
                <button onclick="app.openPropertyModal('${p.id}')" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100" title="Edit Property">
                  <i data-lucide="edit-3" class="w-4 h-4"></i>
                </button>
                <button onclick="app.deleteProperty('${p.id}')" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100" title="Delete Property">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">${p.description || 'No description provided.'}</p>

            <div class="text-xs text-slate-600 space-y-1 pt-1">
              <div class="flex items-center gap-1.5">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-cyan-600 shrink-0"></i>
                <span class="truncate font-medium">${p.locationPath || 'Unknown Location'}</span>
              </div>
              <div class="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
                <i data-lucide="crosshair" class="w-3 h-3 shrink-0"></i>
                <span>${p.latitude || '0.0000000'}, ${p.longitude || '0.0000000'}</span>
              </div>
            </div>
          </div>

          <!-- Footer Actions & Counters -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div class="flex items-center gap-3 font-semibold">
              <span class="text-cyan-700 flex items-center gap-1">
                <i data-lucide="door-open" class="w-3.5 h-3.5"></i> ${p.unitCount} Units
              </span>
              <span class="text-amber-700 flex items-center gap-1">
                <i data-lucide="gavel" class="w-3.5 h-3.5"></i> ${p.ruleCount} Rules
              </span>
            </div>
            <button onclick="app.openPropertyRulesModal('${p.id}')" class="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg flex items-center gap-1 font-medium transition-colors">
              <i data-lucide="shield" class="w-3.5 h-3.5 text-amber-600"></i> Manage Rules
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  openPropertyModal(propertyId = null) {
    const isEdit = Boolean(propertyId);
    const existing = isEdit ? this.properties.find(p => p.id === propertyId) : null;

    const districts = this.locations.districts;
    const ptClassifications = this.taxonomy.propertyTypeClassifications.filter(ptc => ptc.isActive);
    const types = this.taxonomy.types;
    const classes = this.taxonomy.classifications;

    this.openModal(`
      <div class="p-6 space-y-4 max-w-2xl w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 class="text-base font-bold text-slate-900">${isEdit ? 'Edit' : 'Add New'} Property</h3>
          <button onclick="app.closeModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <form id="propertyForm" class="space-y-4">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Property Type & Tier (PropertyTypeClassification) *</label>
              <select name="propertyTypeClassificationId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500">
                ${ptClassifications.map(ptc => {
                  const t = types.find(x => x.id === ptc.propertyTypeId);
                  const c = classes.find(x => x.id === ptc.classificationId);
                  const label = `${t ? t.code.toUpperCase() : 'TYPE'} - ${c ? c.code.toUpperCase() : 'TIER'}`;
                  return `<option value="${ptc.id}" ${existing?.propertyTypeClassificationId === ptc.id ? 'selected' : ''}>${label}</option>`;
                }).join('')}
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">District (Location Hierarchy) *</label>
              <select name="districtId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500">
                ${districts.map(d => `
                  <option value="${d.id}" ${existing?.districtId === d.id ? 'selected' : ''}>
                    ${d.countryName} -> ${d.cityName} -> ${d.name}
                  </option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Multi-lingual Names & Descriptions -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="space-y-2">
              <div class="space-y-1">
                <label class="text-xs text-slate-700 font-semibold">Property Name (Arabic - العربية) *</label>
                <input type="text" name="name_ar" value="${existing?.translations?.ar?.name || existing?.name || ''}" dir="rtl" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-arabic focus:ring-2 focus:ring-cyan-500">
              </div>
              <div class="space-y-1">
                <label class="text-xs text-slate-700 font-semibold">Description (Arabic - العربية)</label>
                <textarea name="description_ar" rows="2" dir="rtl" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-arabic focus:ring-2 focus:ring-cyan-500">${existing?.translations?.ar?.description || existing?.description || ''}</textarea>
              </div>
            </div>
            <div class="space-y-2">
              <div class="space-y-1">
                <label class="text-xs text-slate-700 font-semibold">Property Name (English) *</label>
                <input type="text" name="name_en" value="${existing?.translations?.en?.name || existing?.name || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500">
              </div>
              <div class="space-y-1">
                <label class="text-xs text-slate-700 font-semibold">Description (English)</label>
                <textarea name="description_en" rows="2" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500">${existing?.translations?.en?.description || existing?.description || ''}</textarea>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Status *</label>
              <select name="status" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500">
                ${['ACTIVE', 'PENDING', 'MAINTENANCE', 'REJECTED', 'INACTIVE'].map(s => `
                  <option value="${s}" ${existing?.status === s ? 'selected' : ''}>${s}</option>
                `).join('')}
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Address Line 1</label>
              <input type="text" name="addressLine1" value="${existing?.addressLine1 || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Address Line 2</label>
              <input type="text" name="addressLine2" value="${existing?.addressLine2 || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Landmark</label>
              <input type="text" name="landmark" value="${existing?.landmark || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Latitude</label>
              <input type="number" step="any" name="latitude" value="${existing?.latitude || '24.711606'}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono">
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Longitude</label>
              <input type="number" step="any" name="longitude" value="${existing?.longitude || '46.674426'}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono">
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button type="button" onclick="app.closeModal()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-sm">Save Property</button>
          </div>
        </form>
      </div>
    `);

    document.getElementById('propertyForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = {
        propertyTypeClassificationId: fd.get('propertyTypeClassificationId'),
        districtId: fd.get('districtId'),
        name: fd.get('name_en') || fd.get('name_ar'),
        description: fd.get('description_en') || fd.get('description_ar'),
        status: fd.get('status'),
        addressLine1: fd.get('addressLine1'),
        addressLine2: fd.get('addressLine2'),
        landmark: fd.get('landmark'),
        latitude: parseFloat(fd.get('latitude')) || 0,
        longitude: parseFloat(fd.get('longitude')) || 0,
        translations: {
          ar: { name: fd.get('name_ar'), description: fd.get('description_ar') },
          en: { name: fd.get('name_en'), description: fd.get('description_en') }
        }
      };

      const url = isEdit ? `/api/properties/${propertyId}` : '/api/properties';
      const method = isEdit ? 'PUT' : 'POST';

      try {
        await this.fetchAPI(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        this.showToast('Property saved successfully!', 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) {}
    });
  }

  async deleteProperty(id) {
    if (!confirm('Are you sure you want to delete this Property? All associated units, rules, and translations will be cascaded.')) return;
    try {
      await this.fetchAPI(`/api/properties/${id}?cascade=true`, { method: 'DELETE' });
      this.showToast('Property deleted.', 'success');
      await this.refreshAll();
    } catch (err) {}
  }

  /* Property Rules Drawer / Modal */
  async openPropertyRulesModal(propertyId) {
    const prop = this.properties.find(p => p.id === propertyId);
    if (!prop) return;

    const res = await this.fetchAPI(`/api/properties/${propertyId}/rules`);
    const rules = res.data;

    this.openModal(`
      <div class="p-6 space-y-4 max-w-xl w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 class="text-base font-bold text-slate-900">House Rules: ${prop.name}</h3>
            <p class="text-xs text-slate-500 font-medium">Policies and terms enforced for this property</p>
          </div>
          <button onclick="app.closeModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>

        <!-- Rules List -->
        <div class="space-y-2 max-h-60 overflow-y-auto">
          ${rules.map(r => `
            <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-amber-700 font-mono">${r.code}</span>
                  <span class="px-2 py-0.5 rounded bg-white text-[10px] font-mono font-semibold text-slate-600 border border-slate-200">${r.type}</span>
                </div>
                <div class="text-xs text-slate-800 font-medium">${r.translations?.rule_text?.ar || r.translations?.rule_text?.en || 'No text defined'}</div>
              </div>
              <button onclick="app.deletePropertyRule('${r.id}', '${propertyId}')" class="text-slate-400 hover:text-rose-600 p-1">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          `).join('')}
        </div>

        <!-- Add New Rule Sub-form -->
        <form id="addRuleForm" class="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
          <div class="text-xs font-bold text-slate-800">Add New Property Rule</div>
          <div class="grid grid-cols-2 gap-2">
            <input type="text" name="code" placeholder="Policy Code (e.g. checkin_policy)" required class="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono">
            <select name="type" class="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900">
              <option value="TIME">TIME</option>
              <option value="TEXT">TEXT</option>
              <option value="MONEY">MONEY</option>
              <option value="BOOLEAN">BOOLEAN</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <input type="text" name="rule_text_ar" placeholder="Rule Text (Arabic - العربية)" dir="rtl" required class="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-arabic">
            <input type="text" name="rule_text_en" placeholder="Rule Text (English)" required class="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900">
          </div>
          <button type="submit" class="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-semibold shadow-sm">
            Add Rule
          </button>
        </form>
      </div>
    `);

    if (window.lucide) window.lucide.createIcons();

    document.getElementById('addRuleForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = {
        propertyId,
        code: fd.get('code'),
        type: fd.get('type'),
        sortOrder: rules.length + 1,
        isActive: true,
        translations: {
          ar: { rule_text: fd.get('rule_text_ar') },
          en: { rule_text: fd.get('rule_text_en') }
        }
      };

      try {
        await this.fetchAPI('/api/property-rules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        this.showToast('Rule added successfully!', 'success');
        this.openPropertyRulesModal(propertyId);
        await this.refreshAll();
      } catch (err) {}
    });
  }

  async deletePropertyRule(ruleId, propertyId) {
    if (!confirm('Are you sure you want to delete this rule?')) return;
    try {
      await this.fetchAPI(`/api/property-rules/${ruleId}`, { method: 'DELETE' });
      this.showToast('Rule deleted.', 'success');
      this.openPropertyRulesModal(propertyId);
      await this.refreshAll();
    } catch (err) {}
  }

  /* ========================================================
     MODULE 6: BOOKABLE UNITS & DYNAMIC ATTRIBUTES
     ======================================================== */
  renderUnits() {
    const tbody = document.getElementById('unitsTableBody');
    if (!tbody) return;

    const query = (document.getElementById('unitSearch')?.value || '').toLowerCase();
    const propFilter = document.getElementById('unitPropertyFilter')?.value;
    const typeFilter = document.getElementById('unitTypeFilter')?.value;

    let units = this.units;
    if (query) units = units.filter(u => u.name.toLowerCase().includes(query));
    if (propFilter) units = units.filter(u => u.propertyId === propFilter);
    if (typeFilter) units = units.filter(u => u.unitTypeId === typeFilter);

    tbody.innerHTML = units.map(u => {
      const arName = u.translations?.ar?.name || u.name;
      const enName = u.translations?.en?.name || u.name;

      const filterJsonStr = typeof u.parsedFilterAttributes === 'object'
        ? JSON.stringify(u.parsedFilterAttributes)
        : (u.filterAttributes || '{}');

      return `
        <tr class="hover:bg-slate-50/70">
          <td class="py-2.5 px-3">
            <div class="font-bold text-slate-900">${this.currentLang === 'ar' ? arName : enName}</div>
            <div class="text-[10px] text-slate-500 font-mono">${u.id}</div>
          </td>
          <td class="py-2.5 px-3 text-cyan-700 font-semibold">${u.propertyName}</td>
          <td class="py-2.5 px-3 font-mono font-medium text-purple-700">${u.unitTypeCode}</td>
          <td class="py-2.5 px-3 font-mono text-slate-700">${u.capacity} Guests</td>
          <td class="py-2.5 px-3 font-mono">
            <div class="text-emerald-700 font-bold">${u.offerPrice ? u.offerPrice : u.basePrice} SAR</div>
            ${u.offerPrice ? `<div class="text-[10px] line-through text-slate-400">${u.basePrice} SAR</div>` : ''}
          </td>
          <td class="py-2.5 px-3">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${u.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}">
              ${u.status}
            </span>
          </td>
          <td class="py-2.5 px-3">
            <code class="px-2 py-1 rounded bg-slate-100 text-emerald-800 font-mono text-[10px] font-medium block max-w-xs truncate border border-slate-200">
              ${filterJsonStr}
            </code>
          </td>
          <td class="py-2.5 px-3 text-right rtl:text-left">
            <div class="flex items-center justify-end rtl:justify-start gap-1">
              <button onclick="app.openUnitModal('${u.id}')" class="p-1 text-slate-400 hover:text-slate-700" title="Edit Unit & EAV"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
              <button onclick="app.deleteUnit('${u.id}')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete Unit"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  openUnitModal(unitId = null) {
    const isEdit = Boolean(unitId);
    const existing = isEdit ? this.units.find(u => u.id === unitId) : null;
    const properties = this.properties;
    const unitTypes = this.eav.unitTypes;

    this.openModal(`
      <div class="p-6 space-y-4 max-w-2xl w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 class="text-base font-bold text-slate-900">${isEdit ? 'Edit' : 'Add'} Bookable Unit</h3>
          <button onclick="app.closeModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <form id="unitForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Property *</label>
              <select name="propertyId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-rose-500">
                ${properties.map(p => `
                  <option value="${p.id}" ${existing?.propertyId === p.id ? 'selected' : ''}>${p.name}</option>
                `).join('')}
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Unit Type *</label>
              <select name="unitTypeId" id="unitModalUnitType" onchange="app.onUnitTypeChange(this.value)" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-rose-500">
                ${unitTypes.map(ut => `
                  <option value="${ut.id}" ${existing?.unitTypeId === ut.id ? 'selected' : ''}>${ut.code}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Unit Name (Arabic - العربية) *</label>
              <input type="text" name="name_ar" value="${existing?.translations?.ar?.name || existing?.name || ''}" dir="rtl" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-arabic focus:ring-2 focus:ring-rose-500">
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Unit Name (English) *</label>
              <input type="text" name="name_en" value="${existing?.translations?.en?.name || existing?.name || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:ring-2 focus:ring-rose-500">
            </div>
          </div>

          <div class="grid grid-cols-4 gap-3">
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Capacity (Guests) *</label>
              <input type="number" min="1" name="capacity" value="${existing?.capacity || 2}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono">
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Base Price (SAR) *</label>
              <input type="number" step="0.01" name="basePrice" value="${existing?.basePrice || 500}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono">
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Offer Price (SAR)</label>
              <input type="number" step="0.01" name="offerPrice" value="${existing?.offerPrice || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono">
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Status *</label>
              <select name="status" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">
                <option value="ACTIVE" ${existing?.status === 'ACTIVE' ? 'selected' : ''}>ACTIVE</option>
                <option value="INACTIVE" ${existing?.status === 'INACTIVE' ? 'selected' : ''}>INACTIVE</option>
                <option value="MAINTENANCE" ${existing?.status === 'MAINTENANCE' ? 'selected' : ''}>MAINTENANCE</option>
              </select>
            </div>
          </div>

          <!-- DYNAMIC EAV SPECIFICATIONS SECTION -->
          <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-200">
              <span class="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <i data-lucide="sliders" class="w-4 h-4 text-amber-600"></i> Dynamic Specifications (BookableUnitAttributeValue)
              </span>
              <span class="text-[10px] text-slate-500 font-mono font-medium">Live EAV Form Renderer</span>
            </div>
            <div id="dynamicEavControlsContainer" class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
              <!-- Dynamically populated attribute inputs -->
            </div>
          </div>

          <!-- LIVE FILTER ATTRIBUTES PREVIEW -->
          <div class="space-y-1">
            <label class="text-xs text-slate-700 font-semibold flex items-center justify-between">
              <span>Live filterAttributes JSON Preview (Auto-calculated)</span>
              <span class="text-emerald-700 text-[10px] font-mono font-bold">GIN Indexed</span>
            </label>
            <textarea id="liveFilterAttrPreview" readonly rows="2" class="w-full px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-lg text-xs text-emerald-800 font-mono font-medium"></textarea>
          </div>

          <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button type="button" onclick="app.closeModal()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm">Save Unit & Specs</button>
          </div>
        </form>
      </div>
    `);

    if (window.lucide) window.lucide.createIcons();

    const initialUnitTypeId = document.getElementById('unitModalUnitType').value;
    this.renderDynamicEAVControls(initialUnitTypeId, existing?.attributeValues || []);

    document.getElementById('unitForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);

      // Collect only enabled and meaningful attribute values
      const attributeValues = [];
      document.querySelectorAll('.dynamic-attr-field').forEach(field => {
        const isAssigned = field.querySelector('.attr-assign-toggle')?.checked;
        if (!isAssigned) return; // Skip unassigned/unchecked attributes completely

        const attributeId = field.getAttribute('data-attr-id');
        const valueType = field.getAttribute('data-value-type');

        const valPayload = {
          attributeId,
          valueString: null,
          valueNumber: null,
          valueBoolean: null,
          valueDate: null,
          valueJson: null,
          optionId: null
        };

        if (valueType === 'BOOLEAN') {
          // If checked/assigned, this unit possesses this boolean amenity
          valPayload.valueBoolean = true;
          attributeValues.push(valPayload);
        } else if (valueType === 'NUMBER') {
          const v = field.querySelector('.attr-input')?.value.trim();
          if (v !== '' && !isNaN(Number(v))) {
            valPayload.valueNumber = parseFloat(v);
            attributeValues.push(valPayload);
          }
        } else if (valueType === 'ENUM') {
          const optId = field.querySelector('.attr-input')?.value;
          if (optId) {
            valPayload.optionId = optId;
            attributeValues.push(valPayload);
          }
        } else if (valueType === 'TEXT') {
          const v = field.querySelector('.attr-input')?.value.trim();
          if (v !== '') {
            valPayload.valueString = v;
            attributeValues.push(valPayload);
          }
        } else if (valueType === 'DATE') {
          const v = field.querySelector('.attr-input')?.value.trim();
          if (v !== '') {
            valPayload.valueDate = v;
            attributeValues.push(valPayload);
          }
        } else if (valueType === 'JSON') {
          const v = field.querySelector('.attr-input')?.value.trim();
          if (v !== '') {
            valPayload.valueJson = v;
            attributeValues.push(valPayload);
          }
        }
      });

      const payload = {
        propertyId: fd.get('propertyId'),
        unitTypeId: fd.get('unitTypeId'),
        name: fd.get('name_en') || fd.get('name_ar'),
        capacity: parseInt(fd.get('capacity'), 10),
        basePrice: parseFloat(fd.get('basePrice')),
        offerPrice: fd.get('offerPrice') ? parseFloat(fd.get('offerPrice')) : null,
        status: fd.get('status'),
        translations: {
          ar: { name: fd.get('name_ar') },
          en: { name: fd.get('name_en') }
        },
        attributeValues
      };

      const url = isEdit ? `/api/bookable-units/${unitId}` : '/api/bookable-units';
      const method = isEdit ? 'PUT' : 'POST';

      try {
        await this.fetchAPI(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        this.showToast(this.currentLang === 'ar' ? 'تم حفظ الوحدة والمواصفات بنجاح!' : 'Bookable Unit and EAV specifications saved!', 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) {}
    });
  }

  collectCurrentEAVValues() {
    const values = [];
    document.querySelectorAll('.dynamic-attr-field').forEach(field => {
      const isAssigned = field.querySelector('.attr-assign-toggle')?.checked;
      if (!isAssigned) return;
      const attributeId = field.getAttribute('data-attr-id');
      const valueType = field.getAttribute('data-value-type');
      const valObj = { attributeId, valueString: null, valueNumber: null, valueBoolean: null, valueDate: null, valueJson: null, optionId: null };
      if (valueType === 'BOOLEAN') {
        valObj.valueBoolean = true;
      } else if (valueType === 'NUMBER') {
        const v = field.querySelector('.attr-input')?.value.trim();
        if (v !== '' && !isNaN(Number(v))) valObj.valueNumber = parseFloat(v);
      } else if (valueType === 'ENUM') {
        const opt = field.querySelector('.attr-input')?.value;
        if (opt) valObj.optionId = opt;
      } else if (valueType === 'TEXT') {
        const v = field.querySelector('.attr-input')?.value.trim();
        if (v) valObj.valueString = v;
      } else if (valueType === 'DATE') {
        const v = field.querySelector('.attr-input')?.value.trim();
        if (v) valObj.valueDate = v;
      } else if (valueType === 'JSON') {
        const v = field.querySelector('.attr-input')?.value.trim();
        if (v) valObj.valueJson = v;
      }
      values.push(valObj);
    });
    return values;
  }

  onUnitTypeChange(newUnitTypeId) {
    const currentValues = this.collectCurrentEAVValues();
    this.renderDynamicEAVControls(newUnitTypeId, currentValues);
  }

  renderDynamicEAVControls(unitTypeId, existingValues = []) {
    const container = document.getElementById('dynamicEavControlsContainer');
    if (!container || !this.eav) return;

    const definitions = this.eav.definitions;
    const unitTypeMappings = this.eav.unitTypeAttributes.filter(m => m.unitTypeId === unitTypeId);

    container.innerHTML = definitions.map(def => {
      const mapping = unitTypeMappings.find(m => m.attributeId === def.id);
      const isFilt = mapping && mapping.isFilterable !== null ? Boolean(mapping.isFilterable) : Boolean(def.isFilterable);

      const existingVal = existingValues.find(v => v.attributeId === def.id);
      // Assigned if existing value is present with content, or if mapped to this unit type
      const hasContent = existingVal && (
        existingVal.valueNumber !== null || 
        existingVal.valueBoolean === true || 
        Boolean(existingVal.valueString) || 
        Boolean(existingVal.optionId)
      );
      const isAssigned = hasContent || (Boolean(mapping) && existingValues.length === 0);

      let inputHtml = '';
      if (def.valueType === 'NUMBER') {
        const val = existingVal && existingVal.valueNumber !== null && existingVal.valueNumber !== undefined ? existingVal.valueNumber : '';
        inputHtml = `
          <div class="flex items-center gap-1.5 mt-1.5">
            <input type="number" step="any" min="0" ${isAssigned ? '' : 'disabled'} value="${val}" placeholder="${this.currentLang === 'ar' ? 'أدخل القيمة أو اتركه فارغاً' : 'Enter value or leave blank'}" oninput="app.updateLiveFilterPreview()" class="attr-input w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono focus:ring-2 focus:ring-rose-500">
            ${def.unitCode ? `<span class="px-2 py-1 rounded bg-slate-100 text-[10px] text-slate-600 font-mono font-semibold border border-slate-200 shrink-0">${def.unitCode}</span>` : ''}
          </div>
        `;
      } else if (def.valueType === 'BOOLEAN') {
        inputHtml = `
          <p class="text-[11px] text-slate-500 mt-1">
            ${this.currentLang === 'ar' ? 'تفعيل الخيار يعني توفر هذه الميزة بالوحدة، وعدم تفعيله لن يُدرجها كـ false' : 'Enabling adds this amenity; unchecking will not store false'}
          </p>
        `;
      } else if (def.valueType === 'ENUM') {
        inputHtml = `
          <select ${isAssigned ? '' : 'disabled'} onchange="app.updateLiveFilterPreview()" class="attr-input w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 mt-1.5 focus:ring-2 focus:ring-rose-500">
            <option value="">${this.currentLang === 'ar' ? '-- غير محدد / لا يوجد --' : '-- None / Not Selected --'}</option>
            ${(def.options || []).map(opt => `
              <option value="${opt.id}" data-opt-val="${opt.value}" ${existingVal && existingVal.optionId === opt.id ? 'selected' : ''}>
                ${opt.value}
              </option>
            `).join('')}
          </select>
        `;
      } else if (def.valueType === 'TEXT') {
        const val = existingVal ? existingVal.valueString : '';
        inputHtml = `<input type="text" ${isAssigned ? '' : 'disabled'} value="${val || ''}" placeholder="${this.currentLang === 'ar' ? 'اختياري...' : 'Optional...'}" oninput="app.updateLiveFilterPreview()" class="attr-input w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 mt-1.5 focus:ring-2 focus:ring-rose-500">`;
      } else if (def.valueType === 'DATE') {
        const val = existingVal ? existingVal.valueDate : '';
        inputHtml = `<input type="date" ${isAssigned ? '' : 'disabled'} value="${val || ''}" oninput="app.updateLiveFilterPreview()" class="attr-input w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono mt-1.5 focus:ring-2 focus:ring-rose-500">`;
      } else if (def.valueType === 'JSON') {
        const val = existingVal ? existingVal.valueJson : '';
        inputHtml = `<textarea rows="1" ${isAssigned ? '' : 'disabled'} placeholder="{}" oninput="app.updateLiveFilterPreview()" class="attr-input w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono mt-1.5 focus:ring-2 focus:ring-rose-500">${val || ''}</textarea>`;
      }

      return `
        <div class="dynamic-attr-field space-y-1 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs transition-all hover:border-slate-300" data-attr-id="${def.id}" data-attr-key="${def.key}" data-value-type="${def.valueType}" data-is-filterable="${isFilt}">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <input type="checkbox" class="attr-assign-toggle w-4 h-4 rounded text-emerald-600 bg-white border-slate-300 focus:ring-emerald-500 cursor-pointer" 
                ${isAssigned ? 'checked' : ''} 
                onchange="app.onAttrToggleChange(this)">
              <label class="text-xs font-bold text-slate-800 font-mono cursor-pointer" onclick="this.previousElementSibling.click()">
                ${def.key}
              </label>
            </div>
            <div class="flex items-center gap-1.5">
              ${mapping ? `<span class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-medium font-sans border border-emerald-200">${this.currentLang === 'ar' ? 'مخطط للنوع' : 'Mapped'}</span>` : ''}
              <span class="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">${def.valueType}</span>
            </div>
          </div>
          <div class="attr-input-container ${isAssigned ? '' : 'opacity-40 pointer-events-none'}">
            ${inputHtml}
          </div>
        </div>
      `;
    }).join('');

    this.updateLiveFilterPreview();
  }

  onAttrToggleChange(checkbox) {
    const card = checkbox.closest('.dynamic-attr-field');
    const inputContainer = card.querySelector('.attr-input-container');
    const input = card.querySelector('.attr-input');
    if (checkbox.checked) {
      inputContainer.classList.remove('opacity-40', 'pointer-events-none');
      if (input) {
        input.disabled = false;
      }
    } else {
      inputContainer.classList.add('opacity-40', 'pointer-events-none');
      if (input) {
        input.disabled = true;
        input.required = false;
        if (input.type !== 'checkbox') input.value = '';
      }
    }
    this.updateLiveFilterPreview();
  }

  updateLiveFilterPreview() {
    const previewBox = document.getElementById('liveFilterAttrPreview');
    if (!previewBox) return;

    const filterObj = {};
    document.querySelectorAll('.dynamic-attr-field').forEach(field => {
      const isAssigned = field.querySelector('.attr-assign-toggle')?.checked;
      if (!isAssigned) return;

      const isFilt = field.getAttribute('data-is-filterable') === 'true';
      if (!isFilt) return;

      const key = field.getAttribute('data-attr-key');
      const valueType = field.getAttribute('data-value-type');

      if (valueType === 'BOOLEAN') {
        filterObj[key] = true;
      } else if (valueType === 'NUMBER') {
        const val = field.querySelector('.attr-input')?.value.trim();
        if (val !== '' && !isNaN(Number(val))) filterObj[key] = Number(val);
      } else if (valueType === 'ENUM') {
        const select = field.querySelector('.attr-input');
        const selectedOpt = select?.selectedOptions[0];
        const optVal = selectedOpt ? selectedOpt.getAttribute('data-opt-val') : null;
        if (optVal) filterObj[key] = optVal;
      } else if (valueType === 'TEXT') {
        const val = field.querySelector('.attr-input')?.value.trim();
        if (val) filterObj[key] = val;
      }
    });

    previewBox.value = JSON.stringify(filterObj, null, 2);
  }

  async deleteUnit(id) {
    if (!confirm('Are you sure you want to delete this Bookable Unit?')) return;
    try {
      await this.fetchAPI(`/api/bookable-units/${id}?cascade=true`, { method: 'DELETE' });
      this.showToast('Unit deleted.', 'success');
      await this.refreshAll();
    } catch (err) {}
  }

  /* ========================================================
     MODULE 7: RAW SHEET EXPLORER & LOCALIZATION MATRIX
     ======================================================== */
  async renderRawSheets() {
    if (!this.stats) return;

    const pills = document.getElementById('rawSheetPills');
    if (pills) {
      pills.innerHTML = Object.keys(this.stats.sheets).map(sheetName => `
        <button onclick="app.loadRawSheet('${sheetName}')" class="px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
          this.currentSheet === sheetName 
            ? 'bg-indigo-600 text-white shadow-sm' 
            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
        }">
          ${sheetName}
        </button>
      `).join('');
    }

    await this.loadRawSheet(this.currentSheet);
  }

  async loadRawSheet(sheetName) {
    this.currentSheet = sheetName;

    document.querySelectorAll('#rawSheetPills button').forEach(btn => {
      if (btn.textContent.trim() === sheetName) {
        btn.className = 'px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all bg-indigo-600 text-white shadow-sm';
      } else {
        btn.className = 'px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all bg-white hover:bg-slate-100 text-slate-700 border border-slate-200';
      }
    });

    const res = await this.fetchAPI(`/api/sheets/${sheetName}`);
    this.activeRawColumns = res.columns;
    this.activeRawData = res.data;

    document.getElementById('rawCurrentSheetName').textContent = sheetName;
    document.getElementById('rawCurrentRowCount').textContent = `${res.rowCount} rows`;

    this.renderRawTable();
  }

  renderRawTable() {
    const table = document.getElementById('rawDataTable');
    if (!table || !this.activeRawColumns) return;

    const query = (document.getElementById('rawSearchInput')?.value || '').toLowerCase();
    let rows = this.activeRawData;

    if (query) {
      rows = rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(query)));
    }

    const thead = `
      <thead>
        <tr class="border-b border-slate-200 text-slate-600 bg-slate-50">
          <th class="py-2.5 px-3">#</th>
          ${this.activeRawColumns.map(c => `<th class="py-2.5 px-3">${c}</th>`).join('')}
          <th class="py-2.5 px-3 text-right rtl:text-left">Actions</th>
        </tr>
      </thead>
    `;

    const tbody = `
      <tbody class="divide-y divide-slate-100">
        ${rows.map((r, idx) => `
          <tr class="hover:bg-slate-50/80">
            <td class="py-2 px-3 text-slate-400">${idx + 1}</td>
            ${this.activeRawColumns.map(c => {
              const val = r[c];
              const displayVal = val === null || val === undefined ? '<span class="text-slate-400 font-mono">null</span>' : String(val);
              return `<td class="py-2 px-3 max-w-xs truncate text-slate-800" title="${String(val)}">${displayVal}</td>`;
            }).join('')}
            <td class="py-2 px-3 text-right rtl:text-left">
              <div class="flex items-center justify-end rtl:justify-start gap-1">
                <button onclick="app.editRawRow('${r.id}')" class="p-1 text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
                <button onclick="app.deleteRawRow('${r.id}')" class="p-1 text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;

    table.innerHTML = thead + tbody;
    if (window.lucide) window.lucide.createIcons();
  }

  openAddRawRowModal() {
    this.openRawRowModal();
  }

  editRawRow(id) {
    const row = this.activeRawData.find(r => r.id === id);
    if (row) this.openRawRowModal(row);
  }

  openRawRowModal(existing = null) {
    const isEdit = Boolean(existing);
    const cols = this.activeRawColumns.filter(c => c !== 'id');

    this.openModal(`
      <div class="p-6 space-y-4 max-w-lg w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 class="text-base font-bold text-slate-900">${isEdit ? 'Edit' : 'Add'} Row in ${this.currentSheet}</h3>
          <button onclick="app.closeModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>
        <form id="rawRowForm" class="space-y-3 max-h-96 overflow-y-auto pr-1">
          ${cols.map(c => `
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-mono font-semibold">${c}</label>
              <input type="text" name="${c}" value="${existing && existing[c] !== null && existing[c] !== undefined ? existing[c] : ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono">
            </div>
          `).join('')}
          <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button type="button" onclick="app.closeModal()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm">Save Row</button>
          </div>
        </form>
      </div>
    `);

    document.getElementById('rawRowForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = {};
      cols.forEach(c => {
        const val = fd.get(c);
        payload[c] = val === '' ? null : val;
      });

      const url = isEdit ? `/api/sheets/${this.currentSheet}/${existing.id}` : `/api/sheets/${this.currentSheet}`;
      const method = isEdit ? 'PUT' : 'POST';

      try {
        await this.fetchAPI(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        this.showToast('Row saved in sheet!', 'success');
        this.closeModal();
        await this.loadRawSheet(this.currentSheet);
        await this.refreshAll();
      } catch (err) {}
    });
  }

  async deleteRawRow(id) {
    if (!confirm('Are you sure you want to delete this row?')) return;
    try {
      await this.fetchAPI(`/api/sheets/${this.currentSheet}/${id}?cascade=true`, { method: 'DELETE' });
      this.showToast('Row deleted.', 'success');
      await this.loadRawSheet(this.currentSheet);
      await this.refreshAll();
    } catch (err) {}
  }

  /* Modal Helpers */
  openModal(contentHtml) {
    const container = document.getElementById('modalContainer');
    container.innerHTML = `
      <div class="bg-white border border-slate-200 rounded-2xl shadow-2xl modal-enter overflow-hidden">
        ${contentHtml}
      </div>
    `;
    container.classList.remove('hidden');
    container.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  }

  closeModal() {
    const container = document.getElementById('modalContainer');
    container.classList.add('hidden');
    container.classList.remove('flex');
    container.innerHTML = '';
  }
}

// Global App Instance
const app = new DashboardApp();
window.app = app;
