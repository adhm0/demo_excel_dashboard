/**
 * Views Layer - UI Rendering & Template Components
 * Single responsibility: Convert state → HTML strings for DOM insertion
 */

// ============================================================
// INTERNATIONALIZATION
// ============================================================

const I18N = {
  en: {
    appTitle: 'Property Engine', downloadExcel: 'Download Updated Excel', uploadExcel: 'Upload / Replace',
    cleanOrphans: 'Clean Orphans', navOverview: 'Overview & Workbook', navLocations: 'Geo-Locations',
    navTaxonomy: 'Property Taxonomy', navEAV: 'Dynamic EAV Engine', navProperties: 'Properties & Rules',
    navUnits: 'Bookable Units', navSheets: 'Raw Sheets & i18n', sheetsLabel: 'Total Sheets',
    recordsLabel: 'Total Records', concurrencyLabel: 'Mutex Guard', overviewHeroTitle: 'Property Engine Excel Simulation System',
    overviewHeroDesc: 'Simulating relational database operations directly on property_engine.xlsx.',
    sheetsCardTitle: 'All 17 Workbook Sheets', sheetsCardSub: 'Click any sheet to jump to its raw data table',
    refresh: 'Refresh Stats', geoTitle: 'Geographic Hierarchy Manager', geoSubtitle: 'Cascading management with Arabic/English names',
    addCountry: 'Add Country', addCity: 'Add City', addDistrict: 'Add District', countries: 'Countries',
    cities: 'Cities', districts: 'Districts', taxonomyTitle: 'Property Taxonomy & Combination Matrix',
    taxonomySubtitle: 'Define structural types, quality tiers, toggle valid combinations',
    matrixTitle: 'Type-Classification Pairing Matrix', matrixDesc: 'Click checkbox to enable/disable combination',
    eavTitle: 'Dynamic EAV Specification Engine', eavSubtitle: 'Manage Attribute Groups, Definitions, ENUM Options, Unit Type mapping',
    propTitle: 'Properties & House Rules Manager', propSubtitle: 'Manage properties, addresses, GPS coordinates, policies',
    addProperty: 'Add New Property', unitsTitle: 'Bookable Units & Dynamic Attribute Engine',
    unitsSubtitle: 'Inventory units with typed EAV values, pricing, capacity, live JSON sync',
    addUnit: 'Add Bookable Unit', rawTitle: 'Raw Workbook Explorer & Localization Matrix',
    rawSubtitle: 'Direct access to all 17 Excel sheets and Translation dictionary',
    addRow: 'Add Row to Active Sheet', actions: 'Actions', cancel: 'Cancel', save: 'Save Changes',
    delete: 'Delete', edit: 'Edit', confirmDelete: 'Are you sure?'
  },
  ar: {
    appTitle: 'محرك العقارات', downloadExcel: 'تحميل Excel المحدث', uploadExcel: 'رفع / استبدال',
    cleanOrphans: 'تنظيف السجلات', navOverview: 'نظرة عامة والمصنف', navLocations: 'المواقع الجغرافية',
    navTaxonomy: 'تصنيف العقارات', navEAV: 'محرك المواصفات EAV', navProperties: 'العقارات والسياسات',
    navUnits: 'الوحدات القابلة للحجز', navSheets: 'الجداول والترجمة', sheetsLabel: 'إجمالي الجداول',
    recordsLabel: 'إجمالي السجلات', concurrencyLabel: 'قفل التزامن', overviewHeroTitle: 'نظام محاكاة محرك العقارات',
    overviewHeroDesc: 'محاكاة قواعد البيانات العلائقية مباشرة على ملف property_engine.xlsx.',
    sheetsCardTitle: 'جميع أوراق المصنف الـ 17', sheetsCardSub: 'انقر على أي جدول لعرض بياناته',
    refresh: 'تحديث', geoTitle: 'إدارة الهيكل الجغرافي', geoSubtitle: 'إدارة متسلسلة مع دعم العربية/الإنجليزية',
    addCountry: 'إضافة دولة', addCity: 'إضافة مدينة', addDistrict: 'إضافة حي', countries: 'الدول',
    cities: 'المدن', districts: 'الأحياء', taxonomyTitle: 'تصنيف العقارات ومصفوفة الربط',
    taxonomySubtitle: 'تحديد الأنواع والمستويات التجارية وربطها بنقرة واحدة',
    matrixTitle: 'مصفوفة الربط بين الأنواع والتصنيفات', matrixDesc: 'انقر لتفعيل أو تعطيل المزيج',
    eavTitle: 'محرك المواصفات الديناميكي (EAV)', eavSubtitle: 'إدارة المجموعات والتعريفات وخيارات القوائم',
    propTitle: 'إدارة العقارات والسياسات والشروط', propSubtitle: 'إدارة المنشآت والعناوين والإحداثيات',
    addProperty: 'إضافة عقار جديد', unitsTitle: 'الوحدات القابلة للحجز والخصائص المباشرة',
    unitsSubtitle: 'وحدات وأسعار وسعة مع مزامنة فورية لمواصفات البحث JSON',
    addUnit: 'إضافة وحدة جديدة', rawTitle: 'مستعرض الجداول ومصفوفة الترجمات',
    rawSubtitle: 'الوصول المباشر إلى الـ 17 جدولاً في ملف الإكسل',
    addRow: 'إضافة صف للجدول الحالي', actions: 'الإجراءات', cancel: 'إلغاء', save: 'حفظ التغييرات',
    delete: 'حذف', edit: 'تعديل', confirmDelete: 'هل أنت متأكد من حذف هذا السجل؟'
  }
};

// Helper
const t = (lang, key) => (I18N[lang] || I18N.en)[key] || key;

// ============================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================

const ToastSystem = {
  container: null,
  init() {
    this.container = document.getElementById('toastContainer');
  },
  show(message, type = 'info', duration = 3500) {
    if (!this.container) this.init();
    const colors = {
      success: 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-emerald-600/10',
      error: 'bg-rose-50 border-rose-300 text-rose-800 shadow-rose-600/10',
      info: 'bg-white border-slate-300 text-slate-800 shadow-slate-600/10',
      warning: 'bg-amber-50 border-amber-300 text-amber-800 shadow-amber-600/10'
    };
    const iconMap = { success: 'check-circle', error: 'alert-triangle', info: 'info', warning: 'alert-circle' };
    const icon = iconMap[type] || iconMap.info;
    const colorClass = colors[type] || colors.info;
    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-lg border shadow-xl text-xs font-semibold toast-slide-in ${colorClass}`;
    toast.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4 shrink-0"></i><span>${message}</span>`;
    this.container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// ============================================================
// MODAL COMPONENT
// ============================================================

const Modal = {
  container: null,
  init() { this.container = document.getElementById('modalContainer'); },
  open(contentHtml, maxWidthClass = '') {
    if (!this.container) this.init();
    const style = maxWidthClass ? `max-width: ${maxWidthClass};` : '';
    this.container.innerHTML = `<div class="bg-white border border-slate-200 rounded-2xl shadow-2xl modal-enter overflow-y-auto w-full max-h-[90vh] flex flex-col mx-auto" style="${style}">${contentHtml}</div>`;
    this.container.classList.remove('hidden');
    this.container.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  },
  close() {
    if (!this.container) return;
    this.container.classList.add('hidden');
    this.container.classList.remove('flex');
    this.container.innerHTML = '';
  }
};

// ============================================================
// GEO-LOCATION VIEW MODULE
// ============================================================

const LocationView = {
  // Render country list cards
  renderCountryList(countries, selectedId, lang, searchQuery = '') {
    const list = document.getElementById('countryList');
    if (!list || !countries) return;
    const filtered = countries.filter(c => c.name.toLowerCase().includes(searchQuery));
    document.getElementById('countryCountBadge').textContent = filtered.length;
    list.innerHTML = filtered.map(c => {
      const isSelected = c.id === selectedId;
      const arName = c.translations?.ar?.name || c.name;
      const enName = c.translations?.en?.name || c.name;
      return `
        <div onclick="app.selectCountry('${c.id}')"
             class="p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? 'bg-blue-50/80 border-blue-400 shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-50'}">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 min-w-0 flex-1">
              <span class="w-6 h-6 rounded bg-blue-100 text-blue-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">${c.code || 'GL'}</span>
              <span class="text-xs font-bold text-slate-900 truncate">${lang === 'ar' ? arName : enName}</span>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button onclick="event.stopPropagation(); app.editGeoItem('Country', '${c.id}')" class="p-1 text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
              <button onclick="event.stopPropagation(); app.deleteGeoItem('Country', '${c.id}')" class="p-1 text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </div>
          </div>
          <div class="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-mono">
            <span>slug: ${c.slug}</span><span>dial: ${c.key || ''}</span>
          </div>
        </div>`;
    }).join('');
    if (window.lucide) window.lucide.createIcons();
  },

  // Render city list cards
  renderCityList(cities, selectedId, lang, countryId = null, searchQuery = '') {
    const list = document.getElementById('cityList');
    if (!list || !cities) return;
    const filtered = cities.filter(c => (!countryId || c.countryId === countryId) && c.name.toLowerCase().includes(searchQuery));
    document.getElementById('cityCountBadge').textContent = filtered.length;
    list.innerHTML = filtered.map(c => {
      const isSelected = c.id === selectedId;
      const arName = c.translations?.ar?.name || c.name;
      const enName = c.translations?.en?.name || c.name;
      return `
        <div onclick="app.selectCity('${c.id}')"
             class="p-3 rounded-xl border cursor-pointer transition-all ${isSelected ? 'bg-emerald-50/80 border-emerald-400 shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-50'}">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-900 truncate">${lang === 'ar' ? arName : enName}</span>
            <div class="flex items-center gap-1">
              <button onclick="event.stopPropagation(); app.editGeoItem('City', '${c.id}')" class="p-1 text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
              <button onclick="event.stopPropagation(); app.deleteGeoItem('City', '${c.id}')" class="p-1 text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </div>
          </div>
          <div class="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-mono">
            <span>slug: ${c.slug}</span><span>${c.countryName || ''}</span>
          </div>
        </div>`;
    }).join('');
    if (window.lucide) window.lucide.createIcons();
  },

  // Render district list cards
  renderDistrictList(districts, lang, cityId = null, searchQuery = '') {
    const list = document.getElementById('districtList');
    if (!list || !districts) return;
    const filtered = districts.filter(d => (!cityId || d.cityId === cityId) && d.name.toLowerCase().includes(searchQuery));
    document.getElementById('districtCountBadge').textContent = filtered.length;
    list.innerHTML = filtered.map(d => {
      const arName = d.translations?.ar?.name || d.name;
      const enName = d.translations?.en?.name || d.name;
      return `
        <div class="p-3 rounded-xl border bg-white border-slate-200 hover:bg-slate-50 transition-all shadow-2xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-900 truncate">${lang === 'ar' ? arName : enName}</span>
            <div class="flex items-center gap-1">
              <button onclick="app.editGeoItem('District', '${d.id}')" class="p-1 text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
              <button onclick="app.deleteGeoItem('District', '${d.id}')" class="p-1 text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </div>
          </div>
          <div class="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-mono">
            <span>slug: ${d.slug}</span><span>city: ${d.cityName || ''}</span>
          </div>
        </div>`;
    }).join('');
    if (window.lucide) window.lucide.createIcons();
  },

  // Geo modal template
  renderModal(type, existing, locations, lang) {
    const isEdit = Boolean(existing);
    const title = `${isEdit ? 'Edit' : 'Add'} ${type}`;
    const countries = locations.countries;
    const cities = locations.cities;
    let parentSelector = '';
    if (type === 'City') {
      parentSelector = `<div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Country *</label><select name="countryId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">${countries.map(c => `<option value="${c.id}" ${existing?.countryId === c.id ? 'selected' : ''}>${c.name} (${c.code})</option>`).join('')}</select></div>`;
    } else if (type === 'District') {
      parentSelector = `<div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">City *</label><select name="cityId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">${cities.map(ci => `<option value="${ci.id}" ${existing?.cityId === ci.id ? 'selected' : ''}>${ci.name}</option>`).join('')}</select></div>`;
    }
    const countryExtra = type === 'Country' ? `
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">ISO Code *</label><input type="text" name="code" value="${existing?.code || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono uppercase"></div>
        <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Dialing Key *</label><input type="text" name="key" value="${existing?.key || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"></div>
      </div>` : '';
    return `
      <div class="p-4 sm:p-6 space-y-4 w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200"><h3 class="text-sm font-bold text-slate-900">${title}</h3><button onclick="Modal.close()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button></div>
        <form id="geoForm" class="space-y-3">
          ${parentSelector}
          <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">URL Slug</label><input type="text" name="slug" value="${existing?.slug || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono lowercase"></div>
          ${countryExtra}
          <div class="grid grid-cols-1 gap-3 pt-1">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Name (العربية) *</label><input type="text" name="name_ar" value="${existing?.translations?.ar?.name || existing?.name || ''}" dir="rtl" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-arabic"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Name (English) *</label><input type="text" name="name_en" value="${existing?.translations?.en?.name || existing?.name || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"></div>
          </div>
          <div class="flex justify-end gap-2 pt-3 border-t border-slate-200">
            <button type="button" onclick="Modal.close()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">${t(lang, 'cancel')}</button>
            <button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm">${t(lang, 'save')}</button>
          </div>
        </form>
      </div>`;
  }
};

// ============================================================
// OVERVIEW VIEW MODULE
// ============================================================

const OverviewView = {
  renderMetricsGrid(stats, lang) {
    const sheets = stats.sheets || {};
    const metrics = [
      { label: 'Total Sheets', value: stats.totalSheets || 0, color: 'blue' },
      { label: 'Total Records', value: stats.totalRows || 0, color: 'emerald' },
      { label: 'Countries', value: sheets.Country || 0, color: 'indigo' },
      { label: 'Properties', value: sheets.Property || 0, color: 'cyan' },
      { label: 'Units', value: sheets.BookableUnit || 0, color: 'rose' },
      { label: 'Attributes', value: sheets.AttributeDefinition || 0, color: 'amber' }
    ];
    return metrics.map(m => `
      <div class="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 space-y-1 shadow-sm hover:shadow-md transition-shadow">
        <div class="text-[10px] sm:text-xs text-slate-500 font-medium">${m.label}</div>
        <div class="text-lg sm:text-2xl font-bold text-${m.color}-700">${m.value}</div>
      </div>
    `).join('');
  },

  renderAllSheetsGrid(stats, lang) {
    if (!stats || !stats.sheets) return '';
    const colorMap = {
      Country: 'blue', City: 'indigo', District: 'purple',
      PropertyType: 'purple', PropertyClassification: 'violet', PropertyTypeClassification: 'fuchsia',
      Property: 'cyan', BookableUnitType: 'teal', AttributeGroup: 'amber', AttributeDefinition: 'orange',
      AttributeOption: 'yellow', UnitTypeAttribute: 'lime', BookableUnit: 'rose',
      Language: 'pink', Translation: 'red', PropertyRule: 'orange'
    };
    return Object.entries(stats.sheets).map(([name, rowCount]) => {
      const color = colorMap[name] || 'slate';
      return `
        <button onclick="app.switchTab('sheets', '${name}')"
                class="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-left">
          <div class="min-w-0 flex-1">
            <div class="text-xs font-bold text-slate-900 truncate">${name}</div>
            <div class="text-[10px] text-slate-500 font-mono">${rowCount} rows</div>
          </div>
          <span class="w-2 h-2 rounded-full bg-${color}-500 shrink-0"></span>
        </button>
      `;
    }).join('');
  }
};

// ============================================================
// PROPERTIES VIEW MODULE
// ============================================================

const PropertiesView = {
  statusColors: { ACTIVE: 'emerald', PENDING: 'amber', MAINTENANCE: 'purple', REJECTED: 'rose', INACTIVE: 'slate' },

  renderCard(p, lang) {
    const sc = this.statusColors[p.status] || 'slate';
    const arName = p.translations?.ar?.name || p.name;
    const enName = p.translations?.en?.name || p.name;
    const currentName = lang === 'ar' ? arName : enName;
    return `
      <div class="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 space-y-2 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
        <div class="space-y-1.5">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0 flex-1">
              <span class="px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${sc}-100 text-${sc}-800 border border-${sc}-300">${p.status}</span>
              <h3 class="text-sm sm:text-base font-bold text-slate-900 mt-1 truncate">${currentName}</h3>
              <p class="text-[10px] sm:text-xs text-slate-500 font-mono font-medium hidden sm:block">${p.classificationLabel}</p>
            </div>
            <div class="flex items-center gap-0.5 shrink-0">
              <button onclick="app.openPropertyModal('${p.id}')" class="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100" title="Edit" style="min-width: 32px; min-height: 32px;"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
              <button onclick="app.deleteProperty('${p.id}')" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100" title="Delete" style="min-width: 32px; min-height: 32px;"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </div>
          </div>
          <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">${p.description || '-'}</p>
          <div class="text-xs text-slate-600 space-y-0.5 pt-0.5">
            <div class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-600 shrink-0"></i><span class="truncate font-medium text-[11px] sm:text-xs">${p.locationPath || '-'}</span></div>
            <div class="flex items-center gap-1 font-mono text-[9px] sm:text-[10px] text-slate-400 sm:hidden"><span>${p.classificationLabel}</span></div>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs">
          <div class="flex items-center gap-2 font-semibold">
            <span class="text-cyan-700 flex items-center gap-1"><i data-lucide="door-open" class="w-3 h-3"></i> ${p.unitCount} Units</span>
            <span class="text-amber-700 flex items-center gap-1"><i data-lucide="gavel" class="w-3 h-3"></i> ${p.ruleCount} Rules</span>
          </div>
          <button onclick="app.openPropertyRulesModal('${p.id}')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg flex items-center gap-1 font-medium transition-colors" style="min-height: 32px;">
            <i data-lucide="shield" class="w-3 h-3 text-amber-600"></i> <span class="hidden sm:inline">${t(lang, 'actions')}</span>
          </button>
        </div>
      </div>`;
  },

  renderPropertyModal(propertyId, existing, districts, taxonomy, lang) {
    const isEdit = Boolean(propertyId);
    const ptClassifications = taxonomy.propertyTypeClassifications.filter(ptc => ptc.isActive);
    const types = taxonomy.types;
    const classes = taxonomy.classifications;
    return `
      <div class="p-4 sm:p-6 space-y-3 sm:space-y-4 w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200"><h3 class="text-sm font-bold text-slate-900">${isEdit ? 'Edit' : 'Add New'} Property</h3><button onclick="Modal.close()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button></div>
        <form id="propertyForm" class="space-y-3 sm:space-y-4">
          <div class="grid grid-cols-1 gap-2 sm:gap-3">
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">Type & Tier *</label>
              <select name="propertyTypeClassificationId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">
                ${ptClassifications.map(ptc => {
                  const t = types.find(x => x.id === ptc.propertyTypeId);
                  const c = classes.find(x => x.id === ptc.classificationId);
                  return `<option value="${ptc.id}" ${existing?.propertyTypeClassificationId === ptc.id ? 'selected' : ''}>${t?.code.toUpperCase()} - ${c?.code.toUpperCase()}</option>`;
                }).join('')}
              </select>
            </div>
            <div class="space-y-1">
              <label class="text-xs text-slate-700 font-semibold">District *</label>
              <select name="districtId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">
                ${districts.map(d => `<option value="${d.id}" ${existing?.districtId === d.id ? 'selected' : ''}>${d.countryName} -> ${d.cityName} -> ${d.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="space-y-2 p-2.5 sm:p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Name (العربية) *</label><input type="text" name="name_ar" value="${existing?.translations?.ar?.name || existing?.name || ''}" dir="rtl" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-arabic"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Name (English) *</label><input type="text" name="name_en" value="${existing?.translations?.en?.name || existing?.name || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Description (Arabic)</label><textarea name="description_ar" rows="2" dir="rtl" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-arabic">${existing?.translations?.ar?.description || ''}</textarea></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Description (English)</label><textarea name="description_en" rows="2" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">${existing?.translations?.en?.description || ''}</textarea></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Status *</label><select name="status" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">${['ACTIVE','PENDING','MAINTENANCE','REJECTED','INACTIVE'].map(s => `<option value="${s}" ${existing?.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Address Line 1</label><input type="text" name="addressLine1" value="${existing?.addressLine1 || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Address Line 2</label><input type="text" name="addressLine2" value="${existing?.addressLine2 || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Landmark</label><input type="text" name="landmark" value="${existing?.landmark || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Latitude</label><input type="number" step="any" name="latitude" value="${existing?.latitude || '24.711606'}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Longitude</label><input type="number" step="any" name="longitude" value="${existing?.longitude || '46.674426'}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"></div>
          </div>
          <div class="flex justify-end gap-2 pt-2 sm:pt-3 border-t border-slate-200">
            <button type="button" onclick="Modal.close()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg shadow-sm">Save</button>
          </div>
        </form>
      </div>`;
  },

  renderRulesModal(prop, rules, lang) {
    return `
      <div class="p-4 sm:p-6 space-y-3 sm:space-y-4 w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200"><div><h3 class="text-sm font-bold text-slate-900">Rules: ${prop.name}</h3><p class="text-[10px] sm:text-xs text-slate-500">Policies for this property</p></div><button onclick="Modal.close()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button></div>
        <div class="space-y-1.5 max-h-48 sm:max-h-60 overflow-y-auto">${rules.map(r => `
          <div class="p-2.5 sm:p-3 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl flex items-center justify-between gap-2">
            <div class="space-y-0.5 min-w-0 flex-1">
              <div class="flex items-center gap-2"><span class="text-[10px] sm:text-xs font-bold text-amber-700 font-mono">${r.code}</span><span class="px-1.5 py-0.5 rounded bg-white text-[9px] sm:text-[10px] font-mono font-semibold text-slate-600 border border-slate-200">${r.type}</span></div>
              <div class="text-[10px] sm:text-xs text-slate-800 font-medium truncate">${r.translations?.rule_text?.ar || r.translations?.rule_text?.en || '-'}</div>
            </div>
            <button onclick="app.deletePropertyRule('${r.id}', '${prop.id}')" class="text-slate-400 hover:text-rose-600 p-1 shrink-0"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
          </div>
        `).join('')}</div>
        <form id="addRuleForm" class="p-2.5 sm:p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div class="text-[10px] sm:text-xs font-bold text-slate-800">Add Rule</div>
          <div class="grid grid-cols-2 gap-1.5 sm:gap-2">
            <input type="text" name="code" placeholder="Code" required class="px-2 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono">
            <select name="type" class="px-2 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"><option value="TIME">TIME</option><option value="TEXT">TEXT</option><option value="MONEY">MONEY</option><option value="BOOLEAN">BOOLEAN</option></select>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
            <input type="text" name="rule_text_ar" placeholder="Text (العربية)" dir="rtl" required class="px-2 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-arabic">
            <input type="text" name="rule_text_en" placeholder="Text (English)" required class="px-2 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900">
          </div>
          <button type="submit" class="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-[10px] sm:text-xs font-semibold shadow-sm">Add Rule</button>
        </form>
      </div>`;
  }
};

// ============================================================
// UNITS VIEW MODULE
// ============================================================

const UnitsView = {
  renderTableRow(u, lang) {
    const arName = u.translations?.ar?.name || u.name;
    const enName = u.translations?.en?.name || u.name;
    const currentName = lang === 'ar' ? arName : enName;
    const filterJsonStr = typeof u.parsedFilterAttributes === 'object' ? JSON.stringify(u.parsedFilterAttributes) : (u.filterAttributes || '{}');
    const displayJson = filterJsonStr.substring(0, 40) + (filterJsonStr.length > 40 ? '...' : '');
    return `
      <tr class="hover:bg-slate-50/70">
        <td class="py-2 px-2 sm:py-2.5 sm:px-3"><div class="font-bold text-[11px] sm:text-xs text-slate-900 truncate">${currentName}</div></td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3 text-cyan-700 font-semibold text-[10px] sm:text-xs hidden md:table-cell truncate max-w-[120px]" title="${u.propertyName}">${u.propertyName}</td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3 font-mono text-purple-700 text-[10px] sm:text-xs">${u.unitTypeCode}</td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3 font-mono text-slate-700 text-[10px] sm:text-xs hidden sm:table-cell">${u.capacity}</td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3 font-mono"><div class="text-emerald-700 font-bold text-[10px] sm:text-xs">${u.offerPrice || u.basePrice}</div>${u.offerPrice ? `<div class="text-[9px] line-through text-slate-400 hidden sm:block">${u.basePrice}</div>` : ''}</td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3"><span class="px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold ${u.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}">${u.status}</span></td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3 hidden lg:table-cell"><code class="px-1.5 py-0.5 rounded bg-slate-100 text-emerald-800 font-mono text-[9px] block max-w-[150px] truncate border border-slate-200">${displayJson}</code></td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3 text-end">
          <div class="flex items-center justify-end gap-1">
            <button onclick="app.openUnitModal('${u.id}')" class="p-1 hover:text-slate-700 rounded" title="Edit" style="min-width: 32px; min-height: 32px;"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button>
            <button onclick="app.deleteUnit('${u.id}')" class="p-1 hover:text-rose-600 rounded" title="Delete" style="min-width: 32px; min-height: 32px;"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
          </div>
        </td>
      </tr>`;
  },

  renderUnitModal(unitId, existing, properties, unitTypes, eavSchema, lang) {
    const isEdit = Boolean(unitId);
    return `
      <div class="p-4 sm:p-6 space-y-3 sm:space-y-4 w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200"><h3 class="text-sm font-bold text-slate-900">${isEdit ? 'Edit' : 'Add'} Unit</h3><button onclick="Modal.close()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button></div>
        <form id="unitForm" class="space-y-3 sm:space-y-4 w-full">
          <div class="grid grid-cols-2 gap-2 sm:gap-3">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Property *</label><select name="propertyId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">${properties.map(p => `<option value="${p.id}" ${existing?.propertyId === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}</select></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Unit Type *</label><select name="unitTypeId" id="unitModalUnitType" onchange="app.onUnitTypeChange(this.value)" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">${unitTypes.map(ut => `<option value="${ut.id}" ${existing?.unitTypeId === ut.id ? 'selected' : ''}>${ut.code}</option>`).join('')}</select></div>
          </div>
          <div class="grid grid-cols-2 gap-2 sm:gap-3">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Name (العربية) *</label><input type="text" name="name_ar" value="${existing?.translations?.ar?.name || existing?.name || ''}" dir="rtl" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-arabic"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Name (English) *</label><input type="text" name="name_en" value="${existing?.translations?.en?.name || existing?.name || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"></div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Capacity *</label><input type="number" min="1" name="capacity" value="${existing?.capacity || 2}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Base Price *</label><input type="number" step="0.01" name="basePrice" value="${existing?.basePrice || 500}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Offer Price</label><input type="number" step="0.01" name="offerPrice" value="${existing?.offerPrice || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Status *</label><select name="status" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"><option value="ACTIVE" ${existing?.status === 'ACTIVE' ? 'selected' : ''}>ACTIVE</option><option value="INACTIVE" ${existing?.status === 'INACTIVE' ? 'selected' : ''}>INACTIVE</option><option value="MAINTENANCE" ${existing?.status === 'MAINTENANCE' ? 'selected' : ''}>MAINTENANCE</option></select></div>
          </div>
          <div class="p-3 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 sm:space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-200"><span class="text-[10px] sm:text-xs font-bold text-amber-800 flex items-center gap-1.5"><i data-lucide="sliders" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600"></i> Specifications</span></div>
            <div id="dynamicEavControlsContainer" class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 sm:max-h-56 overflow-y-auto pr-1"></div>
          </div>
          <div class="space-y-1">
            <label class="text-[10px] sm:text-xs text-slate-700 font-semibold">filterAttributes JSON Preview</label>
            <textarea id="liveFilterAttrPreview" readonly rows="2" class="w-full px-3 py-1.5 bg-slate-100 border border-slate-300 rounded-lg text-[10px] sm:text-xs text-emerald-800 font-mono font-medium"></textarea>
          </div>
          <div class="flex justify-end gap-2 pt-2 sm:pt-3 border-t border-slate-200">
            <button type="button" onclick="Modal.close()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button>
            <button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm">Save Unit</button>
          </div>
        </form>
      </div>`;
  },

  // Renders dynamic EAV input fields for a given unit type
  renderEAVControls(unitTypeId, existingValues, definitions, mappings, lang) {
    const container = document.getElementById('dynamicEavControlsContainer');
    if (!container) return;
    container.innerHTML = definitions.map(def => {
      const mapping = mappings.find(m => m.attributeId === def.id);
      const isFilt = mapping && mapping.isFilterable !== null ? Boolean(mapping.isFilterable) : Boolean(def.isFilterable);
      const existingVal = existingValues.find(v => v.attributeId === def.id);
      const hasContent = existingVal && (existingVal.valueNumber !== null || existingVal.valueBoolean === true || Boolean(existingVal.valueString) || Boolean(existingVal.optionId));
      const isAssigned = hasContent || (Boolean(mapping) && existingValues.length === 0);
      let inputHtml = '';
      if (def.valueType === 'NUMBER') {
        inputHtml = `<div class="flex items-center gap-1.5 mt-1.5"><input type="number" step="any" min="0" ${isAssigned ? '' : 'disabled'} value="${existingVal?.valueNumber || ''}" placeholder="..." class="attr-input w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono"><span class="px-2 py-1 rounded bg-slate-100 text-[10px] text-slate-600 font-mono border border-slate-200 shrink-0">${def.unitCode || ''}</span></div>`;
      } else if (def.valueType === 'BOOLEAN') {
        inputHtml = `<p class="text-[11px] text-slate-500 mt-1">${lang === 'ar' ? 'تفعيل يعني توفر هذه الميزة' : 'Enabling adds this amenity'}</p>`;
      } else if (def.valueType === 'ENUM') {
        inputHtml = `<select ${isAssigned ? '' : 'disabled'} class="attr-input w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 mt-1.5"><option value="">${lang === 'ar' ? '-- None --' : '-- None --'}</option>${(def.options || []).map(opt => `<option value="${opt.id}" data-opt-val="${opt.value}" ${existingVal?.optionId === opt.id ? 'selected' : ''}>${opt.value}</option>`).join('')}</select>`;
      } else if (def.valueType === 'TEXT') {
        inputHtml = `<input type="text" ${isAssigned ? '' : 'disabled'} value="${existingVal?.valueString || ''}" placeholder="Optional" class="attr-input w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 mt-1.5">`;
      } else if (def.valueType === 'DATE') {
        inputHtml = `<input type="date" ${isAssigned ? '' : 'disabled'} value="${existingVal?.valueDate || ''}" class="attr-input w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono mt-1.5">`;
      }
      return `
        <div class="dynamic-attr-field space-y-1 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-slate-200 shadow-2xs" data-attr-id="${def.id}" data-value-type="${def.valueType}" data-is-filterable="${isFilt}">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-1.5 min-w-0">
              <input type="checkbox" class="attr-assign-toggle w-3.5 h-3.5 rounded text-emerald-600 bg-white border-slate-300" ${isAssigned ? 'checked' : ''} onchange="app.onAttrToggleChange(this)">
              <label class="text-[10px] sm:text-xs font-bold text-slate-800 font-mono truncate cursor-pointer select-none">${def.key}</label>
            </div>
            <span class="text-[9px] sm:text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-1 py-0.5 rounded">${def.valueType}</span>
          </div>
          <div class="attr-input-container ${isAssigned ? '' : 'opacity-40 pointer-events-none'}">${inputHtml}</div>
        </div>`;
    }).join('');
    if (window.lucide) window.lucide.createIcons();
    app.updateLiveFilterPreview();
  }
};

// ============================================================
// TAXONOMY VIEW MODULE
// ============================================================

const TaxonomyView = {
  renderMatrix(taxonomy) {
    const { types, classifications, matrix } = taxonomy;
    const tbody = types.map(t => `
      <tr class="hover:bg-slate-50/60">
        <td class="py-2 px-2 sm:py-2.5 sm:px-3 font-bold text-slate-900 uppercase font-mono text-[10px] sm:text-xs">${t.code}</td>
        ${classifications.map(c => {
          const pair = matrix.find(m => m.propertyTypeId === t.id && m.classificationId === c.id);
          return `<td class="py-2 px-2 sm:py-2.5 sm:px-3 text-center"><input type="checkbox" ${pair && pair.isEnabled ? 'checked' : ''} onchange="app.toggleTaxonomyPair('${t.id}', '${c.id}', this.checked)" class="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded text-purple-600 bg-white border-slate-300 focus:ring-purple-500 cursor-pointer"></td>`;
        }).join('')}
      </tr>`).join('');
    const thead = `<thead><tr class="border-b border-slate-200 text-slate-500 bg-slate-50/70"><th class="py-2.5 px-3">Type \\ Tier</th>${classifications.map(c => `<th class="py-2.5 px-3 text-center uppercase font-mono font-bold">${c.code}</th>`).join('')}</tr></thead>`;
    return `<table class="w-full text-left rtl:text-right border-collapse text-xs min-w-[400px] sm:min-w-0">${thead}<tbody class="divide-y divide-slate-100">${tbody}</tbody></table>`;
  },

  renderListItem(code, type, label) {
    return `
      <div class="p-3 bg-slate-50/70 border border-slate-200 rounded-xl flex items-center justify-between">
        <span class="text-xs font-bold text-slate-900 uppercase font-mono">${code}</span>
        <div class="flex items-center gap-1"><button class="p-1 text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button><button class="p-1 text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button></div>
      </div>`;
  },

  renderModal(type, existing, lang) {
    return `
      <div class="p-4 sm:p-6 space-y-4 w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200"><h3 class="text-sm font-bold text-slate-900">${existing ? 'Edit' : 'Add'} ${type}</h3><button onclick="Modal.close()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button></div>
        <form id="taxonomyForm" class="space-y-3">
          <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Code *</label><input type="text" name="code" value="${existing?.code || ''}" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono lowercase"></div>
          <div class="flex items-center gap-2 pt-2"><input type="checkbox" id="taxActive" name="isActive" ${existing?.isActive !== false ? 'checked' : ''} class="w-4 h-4 rounded text-purple-600 bg-white border-slate-300"><label for="taxActive" class="text-xs text-slate-700 font-medium">Is Active</label></div>
          <div class="flex justify-end gap-2 pt-3 border-t border-slate-200"><button type="button" onclick="Modal.close()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button><button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm">Save</button></div>
        </form>
      </div>`;
  }
};

// ============================================================
// EAV VIEW MODULE
// ============================================================

const EavView = {
  renderAttrDefRow(def) {
    const flags = [
      def.isRequired ? '<span class="px-1 py-0.5 rounded bg-rose-100 text-rose-800 font-mono text-[9px] font-bold">REQ</span>' : '',
      def.isFilterable ? '<span class="px-1 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold">FLT</span>' : '',
      def.isSearchable ? '<span class="px-1 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-[9px] font-bold">SRC</span>' : ''
    ].filter(Boolean).join('');
    const optionsBadges = def.valueType === 'ENUM' && def.options?.length
      ? def.options.slice(0, 2).map(o => `<span class="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-mono text-[9px] border border-purple-200">${o.value}</span>`).join(' ') + (def.options.length > 2 ? `<span class="text-slate-400 text-[9px]">+${def.options.length - 2}</span>` : '')
      : '<span class="text-slate-400 font-mono text-[9px]">-</span>';
    return `
      <tr class="hover:bg-slate-50/70">
        <td class="py-2 px-2 sm:py-2.5 sm:px-3"><div class="flex items-center gap-1.5"><span class="w-5 h-5 sm:w-6 sm:h-6 rounded bg-amber-100 text-amber-700 flex items-center justify-center font-mono text-[10px] sm:text-xs shrink-0">${def.icon ? `<i data-lucide="${def.icon}" class="w-3 h-3 sm:w-3.5 sm:h-3.5"></i>` : '#'}</span><span class="font-bold text-slate-900 font-mono text-[10px] sm:text-xs truncate">${def.key}</span></div></td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3 font-mono text-amber-700 font-semibold text-[10px] sm:text-xs hidden sm:table-cell">${def.valueType}</td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3 text-slate-600 font-mono text-[10px] sm:text-xs hidden md:table-cell">${def.groupCode || '-'}</td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3">${flags || '<span class="text-slate-400 text-[9px]">-</span>'}</td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3 hidden lg:table-cell"><div class="flex flex-wrap gap-0.5 max-w-[150px]">${optionsBadges}</div></td>
        <td class="py-2 px-2 sm:py-2.5 sm:px-3 text-end"><div class="flex items-center justify-end gap-0.5"><button onclick="app.openAttributeDefModal('${def.id}')" class="p-1 text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button><button onclick="app.deleteAttributeDef('${def.id}')" class="p-1 text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button></div></td>
      </tr>`;
  },

  renderMapperRow(def, mapping) {
    const isAssigned = Boolean(mapping);
    const isReq = mapping ? Boolean(mapping.isRequired) : false;
    const isFilt = mapping && mapping.isFilterable !== null ? Boolean(mapping.isFilterable) : false;
    const isDisp = mapping && mapping.isDisplayable !== null ? Boolean(mapping.isDisplayable) : true;
    const sortOrder = mapping ? mapping.sortOrder : 0;
    return `
      <tr class="hover:bg-slate-50/70" data-attr-id="${def.id}">
        <td class="py-2.5 px-3"><input type="checkbox" class="mapper-assigned w-4 h-4 rounded text-amber-600 bg-white border-slate-300" ${isAssigned ? 'checked' : ''}></td>
        <td class="py-2.5 px-3 font-mono font-bold text-xs text-slate-900">${def.key}</td>
        <td class="py-2.5 px-3 font-mono text-amber-700 font-semibold text-xs hidden sm:table-cell">${def.valueType}</td>
        <td class="py-2.5 px-3 font-mono text-slate-600 text-xs hidden md:table-cell">${def.groupCode || '-'}</td>
        <td class="py-2.5 px-3 text-center"><input type="checkbox" class="mapper-req w-3.5 h-3.5 rounded text-rose-600 bg-white border-slate-300" ${isReq ? 'checked' : ''}></td>
        <td class="py-2.5 px-3 text-center"><input type="checkbox" class="mapper-filt w-3.5 h-3.5 rounded text-emerald-600 bg-white border-slate-300" ${isFilt ? 'checked' : ''}></td>
        <td class="py-2.5 px-3 text-center"><input type="checkbox" class="mapper-disp w-3.5 h-3.5 rounded text-blue-600 bg-white border-slate-300" ${isDisp ? 'checked' : ''}></td>
        <td class="py-2.5 px-3"><input type="number" class="mapper-sort w-16 px-2 py-0.5 bg-white border border-slate-300 rounded text-xs text-slate-800" value="${sortOrder}"></td>
      </tr>`;
  },

  renderGroupBtn(g) {
    return `<button onclick="app.filterEavByGroup('${g.id}')" class="w-full text-left rtl:text-right px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center justify-between gap-2">
      <span class="truncate">${g.code}</span>
      <div class="flex items-center gap-0.5 shrink-0" onclick="event.stopPropagation()">
        <button onclick="app.openAttributeGroupModal('${g.id}')" class="p-0.5 text-slate-400 hover:text-blue-600"><i data-lucide="edit-3" class="w-3 h-3"></i></button>
      </div>
    </button>`;
  }
};

// ============================================================
// EAV MODAL HELPERS
// ============================================================

const EavModals = {
  renderAttributeGroupModal(existing, lang) {
    const isEdit = Boolean(existing && existing.id);
    return `
      <div class="p-4 sm:p-6 space-y-4 w-full max-w-lg">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200"><h3 class="text-sm font-bold text-slate-900">${isEdit ? 'Edit' : 'Add'} Attribute Group</h3><button onclick="Modal.close()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button></div>
        <form id="attrGroupForm" class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Code *</label><input type="text" name="code" value="${existing?.code || ''}" required placeholder="e.g., AMENITY" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono uppercase"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Icon</label><input type="text" name="icon" value="${existing?.icon || ''}" placeholder="lucide-icon" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Display Order</label><input type="number" name="displayOrder" value="${existing?.displayOrder || 0}" min="0" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"></div>
            <div class="space-y-1 flex items-end"><div class="flex items-center gap-2"><input type="checkbox" id="agActive" name="isActive" ${existing?.isActive !== false ? 'checked' : ''} class="w-4 h-4 rounded text-amber-600 bg-white border-slate-300"><label for="agActive" class="text-xs text-slate-700 font-medium">Is Active</label></div></div>
          </div>
          <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Name (العربية)</label><input type="text" name="name_ar" value="${existing?.translations?.ar?.name || ''}" dir="rtl" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-arabic"></div>
          <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Name (English)</label><input type="text" name="name_en" value="${existing?.translations?.en?.name || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"></div>
          <div class="flex justify-end gap-2 pt-2 border-t border-slate-200"><button type="button" onclick="Modal.close()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button><button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-sm">Save Group</button></div>
        </form>
      </div>`;
  },

  renderAttributeDefModal(existing, groups, lang) {
    const isEdit = Boolean(existing && existing.id);
    return `
      <div class="p-4 sm:p-6 space-y-4 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200"><h3 class="text-sm font-bold text-slate-900">${isEdit ? 'Edit' : 'Add'} Attribute Definition</h3><button onclick="Modal.close()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button></div>
        <form id="attrDefForm" class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Key *</label><input type="text" name="key" value="${existing?.key || ''}" required placeholder="e.g., pool_size" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono lowercase"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Value Type *</label><select name="valueType" id="attrDefValueType" onchange="app.onAttrValueTypeChange(this.value)" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"><option value="NUMBER" ${existing?.valueType === 'NUMBER' ? 'selected' : ''}>NUMBER</option><option value="BOOLEAN" ${existing?.valueType === 'BOOLEAN' ? 'selected' : ''}>BOOLEAN</option><option value="ENUM" ${existing?.valueType === 'ENUM' ? 'selected' : ''}>ENUM</option><option value="TEXT" ${existing?.valueType === 'TEXT' ? 'selected' : ''}>TEXT</option><option value="DATE" ${existing?.valueType === 'DATE' ? 'selected' : ''}>DATE</option></select></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Group *</label><select name="groupId" required class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900">${(groups || []).map(g => `<option value="${g.id}" ${existing?.groupId === g.id ? 'selected' : ''}>${g.code}</option>`).join('')}</select></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Unit Code</label><input type="text" name="unitCode" value="${existing?.unitCode || ''}" placeholder="m², kg..." class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Icon</label><input type="text" name="icon" value="${existing?.icon || ''}" placeholder="lucide-icon" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"></div>
            <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Display Order</label><input type="number" name="displayOrder" value="${existing?.displayOrder || 0}" min="0" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono"></div>
          </div>
          <div class="flex flex-wrap gap-3 p-2 bg-slate-50 rounded-lg">
            <div class="flex items-center gap-1.5"><input type="checkbox" id="adReq" name="isRequired" ${existing?.isRequired ? 'checked' : ''} class="w-3.5 h-3.5 rounded text-rose-600"><label for="adReq" class="text-[10px] text-slate-700 font-semibold">Required</label></div>
            <div class="flex items-center gap-1.5"><input type="checkbox" id="adFilt" name="isFilterable" ${existing?.isFilterable ? 'checked' : ''} class="w-3.5 h-3.5 rounded text-emerald-600"><label for="adFilt" class="text-[10px] text-slate-700 font-semibold">Filterable</label></div>
            <div class="flex items-center gap-1.5"><input type="checkbox" id="adSrc" name="isSearchable" ${existing?.isSearchable ? 'checked' : ''} class="w-3.5 h-3.5 rounded text-blue-600"><label for="adSrc" class="text-[10px] text-slate-700 font-semibold">Searchable</label></div>
            <div class="flex items-center gap-1.5"><input type="checkbox" id="adDisp" name="isDisplayable" ${existing?.isDisplayable !== false ? 'checked' : ''} class="w-3.5 h-3.5 rounded text-purple-600"><label for="adDisp" class="text-[10px] text-slate-700 font-semibold">Displayable</label></div>
          </div>
          <div id="enumOptionsContainer" class="space-y-2 ${existing?.valueType === 'ENUM' || (!existing && document.getElementById('attrDefValueType')?.value === 'ENUM') ? '' : 'hidden'}">
            <div class="flex items-center justify-between"><span class="text-[10px] text-slate-600 font-bold uppercase tracking-wider">ENUM Options</span><button type="button" onclick="app.addEnumOptionRow()" class="text-[10px] text-amber-600 font-semibold hover:text-amber-700">+ Add Option</button></div>
            <div id="enumOptionsList" class="space-y-1.5">
              ${(existing?.options || []).map((opt, idx) => this.renderEnumOptionRow(opt, idx)).join('')}
            </div>
          </div>
          <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Name (العربية)</label><input type="text" name="name_ar" value="${existing?.translations?.ar?.name || ''}" dir="rtl" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-arabic"></div>
          <div class="space-y-1"><label class="text-xs text-slate-700 font-semibold">Name (English)</label><input type="text" name="name_en" value="${existing?.translations?.en?.name || ''}" class="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"></div>
          <div class="flex justify-end gap-2 pt-2 border-t border-slate-200"><button type="button" onclick="Modal.close()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button><button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-sm">Save Definition</button></div>
        </form>
      </div>`;
  },

  renderEnumOptionRow(opt, idx) {
    return `
      <div class="enum-option-row flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg" data-idx="${idx}">
        <input type="text" name="opt_value_${idx}" value="${opt?.value || ''}" placeholder="Option value" class="flex-1 px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono">
        <input type="text" name="opt_icon_${idx}" value="${opt?.icon || ''}" placeholder="icon" class="w-16 px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono">
        <button type="button" onclick="this.closest('.enum-option-row').remove()" class="text-rose-400 hover:text-rose-600 p-0.5"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
      </div>`;
  }
};

// ============================================================
// RAW SHEETS VIEW MODULE
// ============================================================

const RawSheetsView = {
  renderPills(sheetNames, activeSheet) {
    return sheetNames.map(name => `
      <button onclick="app.loadRawSheet('${name}')"
              class="px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${activeSheet === name ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'}">
        ${name}
      </button>
    `).join('');
  },

  renderTable(columns, rows) {
    if (!columns || !rows) return '';
    const thead = `<thead><tr class="border-b border-slate-200 text-slate-600 bg-slate-50"><th class="py-2.5 px-3">#</th>${columns.map(c => `<th class="py-2.5 px-3">${c}</th>`).join('')}<th class="py-2.5 px-3 text-end">Actions</th></tr></thead>`;
    const tbody = rows.map((r, idx) => `
      <tr class="hover:bg-slate-50/80">
        <td class="py-2 px-3 text-slate-400">${idx + 1}</td>
        ${columns.map(c => {
          const val = r[c];
          const display = val === null || val === undefined ? '<span class="text-slate-400 font-mono">null</span>' : String(val);
          return `<td class="py-2 px-3 max-w-xs truncate text-slate-800" title="${String(val)}">${display}</td>`;
        }).join('')}
        <td class="py-2 px-3 text-end"><div class="flex items-center justify-end gap-1"><button onclick="app.editRawRow('${r.id}')" class="p-1 text-slate-400 hover:text-slate-700"><i data-lucide="edit-3" class="w-3.5 h-3.5"></i></button><button onclick="app.deleteRawRow('${r.id}')" class="p-1 text-slate-400 hover:text-rose-600"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button></div></td>
      </tr>`).join('');
    return `<table class="w-full text-left rtl:text-right border-collapse text-xs font-mono min-w-[600px]">${thead}<tbody class="divide-y divide-slate-100">${tbody}</tbody></table>`;
  },

  renderRowModal(cols, existing, sheetName) {
    const isEdit = Boolean(existing);
    const formFields = cols.map(c => `
      <div class="space-y-1">
        <label class="text-[10px] sm:text-xs text-slate-700 font-mono font-semibold">${c}</label>
        <input type="text" name="${c}" value="${existing && existing[c] !== null ? existing[c] : ''}" class="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono">
      </div>`).join('');
    return `
      <div class="p-4 sm:p-6 space-y-3 max-w-lg w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200"><h3 class="text-sm font-bold text-slate-900">${isEdit ? 'Edit' : 'Add'} Row: ${sheetName}</h3><button onclick="Modal.close()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button></div>
        <form id="rawRowForm" class="space-y-2 sm:space-y-3 max-h-[60vh] overflow-y-auto pr-1">${formFields}</form>
        <div class="flex justify-end gap-2 pt-2 sm:pt-3 border-t border-slate-200"><button type="button" onclick="Modal.close()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button><button type="submit" class="px-4 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm">Save</button></div>
      </div>`;
  },

  renderUploadModal() {
    return `
      <div class="p-4 sm:p-6 space-y-4 w-full">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200"><div class="flex items-center gap-2"><i data-lucide="upload-cloud" class="w-5 h-5 text-blue-600"></i><h3 class="text-sm font-bold text-slate-900">Upload & Replace file</h3></div><button onclick="Modal.close()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-4 h-4"></i></button></div>
        <form id="uploadForm" class="space-y-4">
          <div class="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-4 sm:p-6 text-center cursor-pointer bg-slate-50">
            <input type="file" id="excelFileInput" accept=".xlsx" class="hidden" required>
            <label for="excelFileInput" class="cursor-pointer space-y-2 block"><i data-lucide="file-spreadsheet" class="w-10 h-10 text-blue-600 mx-auto"></i><div id="fileUploadLabel" class="text-xs text-slate-700 font-semibold">Click to choose .xlsx file</div></label>
          </div>
          <div class="flex justify-end gap-2"><button type="button" onclick="Modal.close()" class="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg">Cancel</button><button type="submit" id="btnSubmitUpload" class="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 shadow-sm"><i data-lucide="upload" class="w-3.5 h-3.5"></i> Upload</button></div>
        </form>
      </div>`;
  }
};

// ============================================================
// WINDOW GLOBALS (browser compatibility - no module bundler)
// ============================================================

// Translate helper function
window.t = t;

// Toast & Modal helpers attached to global scope
window.toast = ToastSystem;
window.modal = Modal;

// All view modules grouped under single namespace
window.views = {
  I18N, t,
  LocationView, OverviewView, PropertiesView, TaxonomyView, EavView, UnitsView, RawSheetsView, EavModals
};
