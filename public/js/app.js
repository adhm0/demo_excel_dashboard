/**
 * DashboardApp - Orchestrator Layer
 * 
 * Architecture:
 *  - api.js      → HTTP requests & data fetching
 *  - views.js    → UI templates & rendering
 *  - THIS FILE   → State management, event binding, coordination
 */

class DashboardApp {
  // ==================== STATE ====================
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
    this.activeRawColumns = null;
    this.selectedEavGroupId = null;
  }

  // ==================== INITIALIZATION ====================
  async init() {
    console.log('[App] Starting initialization...');
    
    try {
      this.initSidebar();
      console.log('[App] Sidebar initialized');
    } catch (err) {
      console.error('[App] Sidebar init failed:', err);
    }
    
    try {
      this.initLanguage();
      console.log('[App] Language initialized');
    } catch (err) {
      console.error('[App] Language init failed:', err);
    }
    
    try {
      await this.refreshAll();
      console.log('[App] Data refreshed successfully');
      this.bindNavTabs();
      console.log('[App] Nav tabs bound');
      this.bindSearchInputs();
      console.log('[App] Search inputs bound');
      if (window.lucide) {
        window.lucide.createIcons();
        console.log('[App] Icons created');
      } else {
        console.warn('[App] Lucide icons not available');
      }
    } catch (err) {
      console.error('[App] Data refresh failed:', err);
    }
  }

  initSidebar() {
    const btnToggle = document.getElementById('btnSidebarToggle');
    const backdrop = document.getElementById('sidebarBackdrop');
    
    if (btnToggle) {
      btnToggle.addEventListener('click', () => this.toggleMobileSidebar());
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => this.toggleMobileSidebar(false));
    }
  }

  bindNavTabs() {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });
  }

  bindSearchInputs() {
    // Geo search
    ['countrySearch', 'citySearch', 'districtSearch'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.renderCurrentView());
    });

    // Property filters
    const propSearch = document.getElementById('propertySearch');
    const propStatus = document.getElementById('propertyStatusFilter');
    const propType = document.getElementById('propertyTypeFilter');
    if (propSearch) propSearch.addEventListener('input', () => this.renderProperties());
    if (propStatus) propStatus.addEventListener('change', () => this.renderProperties());
    if (propType) propType.addEventListener('change', () => this.renderProperties());

    // Unit filters
    const unitSearch = document.getElementById('unitSearch');
    const unitProp = document.getElementById('unitPropertyFilter');
    const unitType = document.getElementById('unitTypeFilter');
    if (unitSearch) unitSearch.addEventListener('input', () => this.renderUnits());
    if (unitProp) unitProp.addEventListener('change', () => this.renderUnits());
    if (unitType) unitType.addEventListener('change', () => this.renderUnits());

    // Raw sheet search
    const rawSearch = document.getElementById('rawSearchInput');
    if (rawSearch) rawSearch.addEventListener('input', () => this.renderRawTable());
  }

  // ==================== LANGUAGE ====================
  initLanguage() {
    document.getElementById('btnLangToggle').addEventListener('click', () => this.toggleLanguage());
    this.applyLanguage(this.currentLang);
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.applyLanguage(this.currentLang);
  }

  applyLanguage(lang) {
    const strings = views.I18N[lang] || views.I18N.en;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.getElementById('currentLangLabel').textContent = lang === 'ar' ? 'English' : 'العربية';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (strings[key]) el.textContent = strings[key];
    });

    this.renderCurrentView();
    if (window.lucide) window.lucide.createIcons();
  }

  // ==================== DATA LOADING ====================
  async refreshAll() {
    try {
      const [statsRes, locRes, taxRes, eavRes, propRes, unitRes] = await Promise.all([
        api.getStats(),
        api.getLocations(),
        api.getTaxonomy(),
        api.getEavSchema(),
        api.getProperties(),
        api.getBookableUnits()
      ]);

      this.stats = statsRes.data;
      this.locations = locRes.data;
      this.taxonomy = taxRes.data;
      this.eav = eavRes.data;
      this.properties = propRes.data;
      this.units = unitRes.data;

      this.updateHeaderStats();
      this.populateFilterDropdowns();
      this.renderCurrentView();
      if (window.lucide) window.lucide.createIcons();
    } catch (err) {
      console.error('Error refreshing dashboard:', err);
      this.showToast('Data load failed: ' + err.message, 'error', 5000);
    }
  }

  updateHeaderStats() {
    const totalRows = `${this.stats.totalRows} records`;
    const headerEl = document.getElementById('headerTotalRows');
    const mobileEl = document.getElementById('headerTotalRowsMobile');
    const sidebarEl = document.getElementById('sidebarTotalRecords');
    
    if (headerEl) headerEl.textContent = totalRows;
    if (mobileEl) mobileEl.textContent = totalRows;
    if (sidebarEl) sidebarEl.textContent = this.stats.totalRows;
  }

  populateFilterDropdowns() {
    const typeFilter = document.getElementById('propertyTypeFilter');
    if (typeFilter && this.taxonomy) {
      typeFilter.innerHTML = '<option value="">All Types</option>' +
        this.taxonomy.types.map(t => `<option value="${t.code}">${t.code.toUpperCase()}</option>`).join('');
    }

    const unitPropFilter = document.getElementById('unitPropertyFilter');
    if (unitPropFilter && this.properties) {
      unitPropFilter.innerHTML = '<option value="">All Properties</option>' +
        this.properties.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
    }

    const unitTypeFilter = document.getElementById('unitTypeFilter');
    if (unitTypeFilter && this.eav) {
      unitTypeFilter.innerHTML = '<option value="">All Unit Types</option>' +
        this.eav.unitTypes.map(ut => `<option value="${ut.id}">${ut.code}</option>`).join('');
    }
  }

  // ==================== NAVIGATION ====================
  switchTab(tabId, param = null) {
    this.toggleMobileSidebar(false);
    this.activeTab = tabId;

    document.querySelectorAll('.nav-item').forEach(btn => {
      const isActive = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isActive);
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `tab-${tabId}`);
    });

    if (tabId === 'sheets' && param) this.currentSheet = param;
    this.renderCurrentView();
    if (window.lucide) window.lucide.createIcons();
  }

  switchEavSubTab(subTabId) {
    document.getElementById('eav-subtab-defs').classList.toggle('hidden', subTabId !== 'defs');
    document.getElementById('eav-subtab-mapper').classList.toggle('hidden', subTabId !== 'mapper');
    
    const btnDefs = document.getElementById('subtab-btn-defs');
    const btnMapper = document.getElementById('subtab-btn-mapper');
    
    if (subTabId === 'defs') {
      btnDefs.className = 'px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-100 text-amber-800 border border-amber-300 shadow-sm';
      btnMapper.className = 'px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100';
    } else {
      btnMapper.className = 'px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-100 text-amber-800 border border-amber-300 shadow-sm';
      btnDefs.className = 'px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100';
      this.loadUnitTypeMapper();
    }
    if (window.lucide) window.lucide.createIcons();
  }

  renderCurrentView() {
    switch (this.activeTab) {
      case 'overview': this.renderOverview(); break;
      case 'locations': this.renderLocations(); break;
      case 'taxonomy': this.renderTaxonomy(); break;
      case 'eav': this.renderEAV(); break;
      case 'properties': this.renderProperties(); break;
      case 'units': this.renderUnits(); break;
      case 'sheets': this.renderSheets(); break;
    }
  }

  // ==================== SIDEBAR / TOAST / MODAL HELPERS ====================
  toggleMobileSidebar(forceState) {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (!sidebar) return;
    const isOpen = forceState !== undefined ? forceState : !sidebar.classList.contains('open');
    sidebar.classList.toggle('open', isOpen);
    if (backdrop) {
      backdrop.classList.toggle('open', isOpen);
      backdrop.classList.toggle('hidden', !isOpen);
    }
  }

  showToast(message, type = 'info', duration = 3500) {
    toast.show(message, type, duration);
  }

  openModal(contentHtml, maxWidthClass = '') {
    modal.open(contentHtml, maxWidthClass);
  }

  closeModal() {
    modal.close();
  }

  // ================================================================
  // VIEW RENDERERS - Delegate to views.* modules
  // ================================================================

  renderOverview() {
    const metricsGrid = document.getElementById('overviewMetricsGrid');
    const sheetsGrid = document.getElementById('allSheetsGrid');
    if (!metricsGrid || !sheetsGrid || !this.stats) return;

    metricsGrid.innerHTML = views.OverviewView.renderMetricsGrid(this.stats, this.currentLang);
    sheetsGrid.innerHTML = views.OverviewView.renderAllSheetsGrid(this.stats, this.currentLang);
    if (window.lucide) window.lucide.createIcons();
  }

  renderLocations() {
    const searchQ = {
      country: document.getElementById('countrySearch')?.value?.toLowerCase() || '',
      city: document.getElementById('citySearch')?.value?.toLowerCase() || '',
      district: document.getElementById('districtSearch')?.value?.toLowerCase() || ''
    };

    views.LocationView.renderCountryList(this.locations.countries, this.selectedCountryId, this.currentLang, searchQ.country);
    views.LocationView.renderCityList(this.locations.cities, this.selectedCityId, this.currentLang, this.selectedCountryId, searchQ.city);
    views.LocationView.renderDistrictList(this.locations.districts, this.currentLang, this.selectedCityId, searchQ.district);
  }

  selectCountry(countryId) {
    this.selectedCountryId = countryId;
    this.selectedCityId = null;
    this.renderLocations();
  }

  selectCity(cityId) {
    this.selectedCityId = cityId;
    this.renderLocations();
  }

  renderTaxonomy() {
    if (!this.taxonomy) return;
    const matrixContainer = document.querySelector('#taxonomyMatrixTable')?.parentElement;
    if (matrixContainer) {
      matrixContainer.innerHTML = views.TaxonomyView.renderMatrix(this.taxonomy);
    }

    const typeList = document.getElementById('propertyTypeList');
    const classList = document.getElementById('classificationList');
    if (typeList) typeList.innerHTML = this.taxonomy.types.map(t => views.TaxonomyView.renderListItem(t.code, 'PropertyType')).join('');
    if (classList) classList.innerHTML = this.taxonomy.classifications.map(c => views.TaxonomyView.renderListItem(c.code, 'PropertyClassification')).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  renderEAV() {
    if (!this.eav) return;
    const groupsList = document.getElementById('eavGroupsList');
    const tbody = document.getElementById('attrDefTableBody');
    if (!groupsList || !tbody) return;

    let defs = this.eav.definitions;
    if (this.selectedEavGroupId) defs = defs.filter(d => d.groupId === this.selectedEavGroupId);

    tbody.innerHTML = defs.map(def => views.EavView.renderAttrDefRow(def)).join('');

    groupsList.innerHTML = '<button onclick="app.filterEavByGroup(null)" class="w-full text-left rtl:text-right px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100">All Groups (' + defs.length + ')</button>' +
      this.eav.groups.map(g => views.EavView.renderGroupBtn(g)).join('');

    const unitTypeSelect = document.getElementById('mapperUnitTypeSelect');
    if (unitTypeSelect && this.eav.unitTypes) {
      unitTypeSelect.innerHTML = this.eav.unitTypes.map(ut => `<option value="${ut.id}">${ut.code}</option>`).join('');
      this.loadUnitTypeMapper();
    }
    if (window.lucide) window.lucide.createIcons();
  }

  filterEavByGroup(groupId) {
    this.selectedEavGroupId = groupId;
    this.renderEAV();
  }

  loadUnitTypeMapper() {
    const unitTypeId = document.getElementById('mapperUnitTypeSelect')?.value;
    const tbody = document.getElementById('unitTypeMapperTableBody');
    if (!unitTypeId || !tbody || !this.eav) return;

    const mappings = this.eav.unitTypeAttributes.filter(m => m.unitTypeId === unitTypeId);
    tbody.innerHTML = this.eav.definitions.map(def => views.EavView.renderMapperRow(def, mappings.find(m => m.attributeId === def.id))).join('');
  }

  saveUnitTypeMapper() {
    // Implementation stays in app.js due to form processing logic
    const unitTypeId = document.getElementById('mapperUnitTypeSelect')?.value;
    if (!unitTypeId) return;

    const rows = document.querySelectorAll('#unitTypeMapperTableBody tr');
    const attributes = Array.from(rows).map(r => ({
      attributeId: r.dataset.attrId,
      isAssigned: r.querySelector('.mapper-assigned').checked,
      isRequired: r.querySelector('.mapper-req').checked,
      isFilterable: r.querySelector('.mapper-filt').checked,
      isDisplayable: r.querySelector('.mapper-disp').checked,
      sortOrder: parseInt(r.querySelector('.mapper-sort')?.value || 0, 10)
    }));

    api.saveUnitTypeMatrix(unitTypeId, attributes)
      .then(res => { this.eav.unitTypeAttributes = res.data; this.showToast('Saved successfully!'); })
      .catch(err => this.showToast('Failed: ' + err.message, 'error'));
  }

  renderProperties() {
    const grid = document.getElementById('propertiesGrid');
    if (!grid || !this.properties) return;

    const query = document.getElementById('propertySearch')?.value?.toLowerCase() || '';
    const statusFilter = document.getElementById('propertyStatusFilter')?.value || '';
    const typeFilter = document.getElementById('propertyTypeFilter')?.value || '';

    let filtered = this.properties;
    if (query) filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || (p.description || '').toLowerCase().includes(query) || (p.addressLine1 || '').toLowerCase().includes(query));
    if (statusFilter) filtered = filtered.filter(p => p.status === statusFilter);
    if (typeFilter) filtered = filtered.filter(p => p.propertyTypeCode === typeFilter);

    grid.innerHTML = filtered.map(p => views.PropertiesView.renderCard(p, this.currentLang)).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  renderUnits() {
    const tbody = document.getElementById('unitsTableBody');
    if (!tbody || !this.units) return;

    const query = document.getElementById('unitSearch')?.value?.toLowerCase() || '';
    const propFilter = document.getElementById('unitPropertyFilter')?.value || '';
    const typeFilter = document.getElementById('unitTypeFilter')?.value || '';

    let filtered = this.units;
    if (query) filtered = filtered.filter(u => u.name.toLowerCase().includes(query));
    if (propFilter) filtered = filtered.filter(u => u.propertyId === propFilter);
    if (typeFilter) filtered = filtered.filter(u => u.unitTypeId === typeFilter);

    tbody.innerHTML = filtered.map(u => views.UnitsView.renderTableRow(u, this.currentLang)).join('');
    if (window.lucide) window.lucide.createIcons();
  }

  renderSheets() {
    const pills = document.getElementById('rawSheetPills');
    const tableWrap = document.querySelector('#tab-sheets > div:last-of-type')?.querySelector('.overflow-x-auto');
    if (!pills || !tableWrap || !this.stats) return;

    pills.innerHTML = views.RawSheetsView.renderPills(Object.keys(this.stats.sheets), this.currentSheet);
    // Load current sheet data
    this.loadRawSheet(this.currentSheet);
  }

  async loadRawSheet(sheetName) {
    this.currentSheet = sheetName;
    try {
      const res = await api.getSheetData(sheetName);
      this.activeRawColumns = res.columns;
      this.activeRawData = res.data;
      document.getElementById('rawCurrentSheetName').textContent = sheetName;
      document.getElementById('rawCurrentRowCount').textContent = `${res.rowCount} rows`;
      this.renderRawTable();
    } catch (err) {
      this.showToast('Failed to load sheet: ' + err.message, 'error');
    }
  }

  renderRawTable() {
    const tableWrap = document.querySelector('#tab-sheets > div:last-of-type')?.querySelector('.overflow-x-auto');
    if (!tableWrap || !this.activeRawColumns) return;

    const query = document.getElementById('rawSearchInput')?.value?.toLowerCase() || '';
    let rows = this.activeRawData;
    if (query) rows = rows.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(query)));

    tableWrap.innerHTML = views.RawSheetsView.renderTable(this.activeRawColumns, rows);
    if (window.lucide) window.lucide.createIcons();
  }

  // ================================================================
  // ACTION HANDLERS (CRUD operations)
  // ================================================================

  // ---- Geo Actions ----
  openGeoModal(type, existingItem = null) {
    const html = views.LocationView.renderModal(type, existingItem, this.locations, this.currentLang);
    this.openModal(html);
    this.bindGeoFormSubmit(type, existingItem?.id);
  }

  bindGeoFormSubmit(type, existingId) {
    const form = document.getElementById('geoForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = {
        name: fd.get('name_en') || fd.get('name_ar'),
        slug: fd.get('slug'),
        translations: { ar: { name: fd.get('name_ar') }, en: { name: fd.get('name_en') } }
      };
      if (type === 'Country') { payload.code = fd.get('code'); payload.key = fd.get('key'); }
      else if (type === 'City') { payload.countryId = fd.get('countryId'); }
      else if (type === 'District') { payload.cityId = fd.get('cityId'); }

      const endpoint = type === 'Country' ? '/countries' : type === 'City' ? '/cities' : '/districts';
      const url = existingId ? `/api${endpoint}/${existingId}` : `/api${endpoint}`;
      const method = existingId ? 'PUT' : 'POST';

      try {
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        this.showToast(`${type} saved!`, 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
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
    if (!confirm(window.t(this.currentLang, 'confirmDelete'))) return;
    const endpoint = type === 'Country' ? '/countries' : type === 'City' ? '/cities' : '/districts';
    try {
      await fetch(`/api${endpoint}/${id}?cascade=true`, { method: 'DELETE' });
      this.showToast(`${type} deleted.`, 'success');
      await this.refreshAll();
    } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
  }

  // ---- Taxonomy Actions ----
  async toggleTaxonomyPair(propertyTypeId, classificationId, isEnabled) {
    try {
      const res = await api.toggleTaxonomyPair(propertyTypeId, classificationId, isEnabled);
      this.taxonomy = res.data;
      this.showToast('Updated!', 'success');
      this.renderTaxonomy();
    } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
  }

  openTaxonomyModal(type, existing = null) {
    const html = views.TaxonomyView.renderModal(type, existing, this.currentLang);
    this.openModal(html);
    this.bindTaxonomyFormSubmit(type, existing?.id);
  }

  bindTaxonomyFormSubmit(type, existingId) {
    const form = document.getElementById('taxonomyForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = { code: fd.get('code'), isActive: fd.get('isActive') === 'on' };
      const endpoint = type === 'PropertyType' ? '/property-types' : '/property-classifications';
      const url = existingId ? `/api${endpoint}/${existingId}` : `/api${endpoint}`;
      const method = existingId ? 'PUT' : 'POST';

      try {
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        this.showToast('Saved!', 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
    });
  }

  async deleteTaxonomyItem(type, id) {
    if (!confirm(window.t(this.currentLang, 'confirmDelete'))) return;
    const endpoint = type === 'PropertyType' ? '/property-types' : '/property-classifications';
    try {
      await fetch(`/api${endpoint}/${id}?cascade=true`, { method: 'DELETE' });
      this.showToast('Deleted.', 'success');
      await this.refreshAll();
    } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
  }

  // ---- EAV Actions ----
  openAttributeGroupModal(groupId = null) {
    const existing = groupId ? this.eav?.groups?.find(g => g.id === groupId) : null;
    const html = views.EavModals.renderAttributeGroupModal(existing, this.currentLang);
    this.openModal(html);
    this.bindAttrGroupFormSubmit(groupId);
  }

  bindAttrGroupFormSubmit(existingId) {
    const form = document.getElementById('attrGroupForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = {
        code: fd.get('code'),
        icon: fd.get('icon') || null,
        displayOrder: parseInt(fd.get('displayOrder'), 10) || 0,
        isActive: fd.get('isActive') === 'on'
      };
      const translations = {};
      const nameAr = fd.get('name_ar');
      const nameEn = fd.get('name_en');
      if (nameAr) translations.ar = { name: nameAr };
      if (nameEn) translations.en = { name: nameEn };
      if (Object.keys(translations).length > 0) payload.translations = translations;

      const url = existingId ? `/api/attribute-groups/${existingId}` : '/api/attribute-groups';
      const method = existingId ? 'PUT' : 'POST';
      try {
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        this.showToast('Group saved!', 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
    });
  }

  openAttributeDefModal(defId = null) {
    const existing = defId ? this.eav?.definitions?.find(d => d.id === defId) : null;
    const html = views.EavModals.renderAttributeDefModal(existing, this.eav?.groups, this.currentLang);
    this.openModal(html);
    this.bindAttrDefFormSubmit(defId);
    // Fix visibility of enum container after modal renders
    setTimeout(() => {
      const select = document.getElementById('attrDefValueType');
      const container = document.getElementById('enumOptionsContainer');
      if (select && container) {
        const show = select.value === 'ENUM';
        container.classList.toggle('hidden', !show);
      }
    }, 50);
  }

  bindAttrDefFormSubmit(existingId) {
    const form = document.getElementById('attrDefForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const valType = fd.get('valueType');

      const payload = {
        key: fd.get('key'),
        valueType: valType,
        groupId: fd.get('groupId'),
        icon: fd.get('icon') || null,
        unitCode: fd.get('unitCode') || null,
        isRequired: fd.get('isRequired') === 'on',
        isFilterable: fd.get('isFilterable') === 'on',
        isSearchable: fd.get('isSearchable') === 'on',
        isDisplayable: fd.get('isDisplayable') !== 'off',
        displayOrder: parseInt(fd.get('displayOrder'), 10) || 0
      };

      const translations = {};
      const nameAr = fd.get('name_ar');
      const nameEn = fd.get('name_en');
      if (nameAr) translations.ar = { name: nameAr };
      if (nameEn) translations.en = { name: nameEn };
      if (Object.keys(translations).length > 0) payload.translations = translations;

      // Collect ENUM options
      if (valType === 'ENUM') {
        const options = [];
        const rows = document.querySelectorAll('.enum-option-row');
        rows.forEach(row => {
          const inpValue = row.querySelector('[name^="opt_value_"]');
          const inpIcon = row.querySelector('[name^="opt_icon_"]');
          if (inpValue && inpValue.value.trim()) {
            options.push({ value: inpValue.value.trim(), icon: inpIcon?.value?.trim() || null });
          }
        });
        payload.options = options;
      }

      const url = existingId ? `/api/attribute-definitions/${existingId}` : '/api/attribute-definitions';
      const method = existingId ? 'PUT' : 'POST';
      try {
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        this.showToast('Definition saved!', 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
    });
  }

  onAttrValueTypeChange(val) {
    const container = document.getElementById('enumOptionsContainer');
    if (container) {
      container.classList.toggle('hidden', val !== 'ENUM');
    }
  }

  addEnumOptionRow() {
    const list = document.getElementById('enumOptionsList');
    if (!list) return;
    const idx = list.children.length;
    const rowHtml = views.EavModals.renderEnumOptionRow(null, idx);
    const div = document.createElement('div');
    div.innerHTML = rowHtml;
    const rowEl = div.firstElementChild;
    rowEl.setAttribute('data-idx', idx);
    list.appendChild(rowEl);
    if (window.lucide) window.lucide.createIcons();
  }

  async deleteAttributeDef(id) {
    if (!confirm('Delete this attribute?')) return;
    try {
      await api.deleteAttributeDefinition(id, true);
      this.showToast('Deleted.', 'success');
      await this.refreshAll();
    } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
  }

  // ---- Property Actions ----
  openPropertyModal(propertyId = null) {
    const existing = propertyId ? this.properties.find(p => p.id === propertyId) : null;
    const districts = this.locations.districts;
    const taxonomy = this.taxonomy;
    const html = views.PropertiesView.renderPropertyModal(propertyId, existing, districts, taxonomy, this.currentLang);
    this.openModal(html);
    this.bindPropertyFormSubmit(propertyId);
  }

  bindPropertyFormSubmit(propertyId) {
    const form = document.getElementById('propertyForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
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
      const url = propertyId ? `/api/properties/${propertyId}` : '/api/properties';
      const method = propertyId ? 'PUT' : 'POST';

      try {
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        this.showToast('Property saved!', 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
    });
  }

  async deleteProperty(id) {
    if (!confirm('Delete property and all related units/rules?')) return;
    try {
      await api.deleteProperty(id, true);
      this.showToast('Deleted.', 'success');
      await this.refreshAll();
    } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
  }

  async openPropertyRulesModal(propertyId) {
    const prop = this.properties.find(p => p.id === propertyId);
    if (!prop) return;
    try {
      const res = await api.getPropertyRules(propertyId);
      const rules = res.data;
      const html = views.PropertiesView.renderRulesModal(prop, rules, this.currentLang);
      this.openModal(html);
      this.bindRuleFormSubmit(propertyId);
    } catch (err) { this.showToast('Failed to load rules: ' + err.message, 'error'); }
  }

  bindRuleFormSubmit(propertyId) {
    const form = document.getElementById('addRuleForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = {
        propertyId,
        code: fd.get('code'),
        type: fd.get('type'),
        sortOrder: 1,
        isActive: true,
        translations: {
          ar: { rule_text: fd.get('rule_text_ar') },
          en: { rule_text: fd.get('rule_text_en') }
        }
      };
      try {
        await api.createPropertyRule(payload);
        this.showToast('Rule added!', 'success');
        this.openPropertyRulesModal(propertyId);
        await this.refreshAll();
      } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
    });
  }

  async deletePropertyRule(ruleId, propertyId) {
    if (!confirm('Delete this rule?')) return;
    try {
      await api.deletePropertyRule(ruleId);
      this.showToast('Deleted.', 'success');
      this.openPropertyRulesModal(propertyId);
      await this.refreshAll();
    } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
  }

  // ---- Unit Actions ----
  openUnitModal(unitId = null) {
    const existing = unitId ? this.units.find(u => u.id === unitId) : null;
    const properties = this.properties;
    const unitTypes = this.eav?.unitTypes || [];
    const html = views.UnitsView.renderUnitModal(unitId, existing, properties, unitTypes, this.eav, this.currentLang);
    this.openModal(html);
    this.bindUnitFormSubmit(unitId);

    // Initialize EAV controls after modal opens
    setTimeout(() => {
      const initialUnitTypeId = document.getElementById('unitModalUnitType')?.value;
      if (initialUnitTypeId && this.eav) {
        const existingValues = existing?.attributeValues || [];
        const definitions = this.eav.definitions;
        const mappings = this.eav.unitTypeAttributes.filter(m => m.unitTypeId === initialUnitTypeId);
        views.UnitsView.renderEAVControls(initialUnitTypeId, existingValues, definitions, mappings, this.currentLang);
      }
    }, 100);
  }

  bindUnitFormSubmit(unitId) {
    const form = document.getElementById('unitForm');
    if (!form) return;

    // Live filter preview update
    form.addEventListener('input', () => this.updateLiveFilterPreview());

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);

      // Collect attribute values
      const attributeValues = [];
      document.querySelectorAll('.dynamic-attr-field').forEach(field => {
        if (!field.querySelector('.attr-assign-toggle')?.checked) return;
        const attrId = field.dataset.attrId;
        const valType = field.dataset.valueType;
        const valPayload = { attributeId: attrId };

        if (valType === 'BOOLEAN') { valPayload.valueBoolean = true; }
        else if (valType === 'NUMBER') { const v = field.querySelector('.attr-input')?.value.trim(); if (v && !isNaN(Number(v))) valPayload.valueNumber = parseFloat(v); }
        else if (valType === 'ENUM') { const sel = field.querySelector('.attr-input'); if (sel?.value) valPayload.optionId = sel.value; }
        else if (valType === 'TEXT') { const v = field.querySelector('.attr-input')?.value.trim(); if (v) valPayload.valueString = v; }
        else if (valType === 'DATE') { const v = field.querySelector('.attr-input')?.value.trim(); if (v) valPayload.valueDate = v; }

        if (Object.keys(valPayload).length > 1) attributeValues.push(valPayload);
      });

      const payload = {
        propertyId: fd.get('propertyId'),
        unitTypeId: fd.get('unitTypeId'),
        name: fd.get('name_en') || fd.get('name_ar'),
        capacity: parseInt(fd.get('capacity'), 10),
        basePrice: parseFloat(fd.get('basePrice')),
        offerPrice: fd.get('offerPrice') ? parseFloat(fd.get('offerPrice')) : null,
        status: fd.get('status'),
        translations: { ar: { name: fd.get('name_ar') }, en: { name: fd.get('name_en') } },
        attributeValues
      };

      const url = unitId ? `/api/bookable-units/${unitId}` : '/api/bookable-units';
      const method = unitId ? 'PUT' : 'POST';

      try {
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        this.showToast('Unit saved!', 'success');
        this.closeModal();
        await this.refreshAll();
      } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
    });
  }

  collectCurrentEAVValues() {
    const values = [];
    document.querySelectorAll('.dynamic-attr-field').forEach(field => {
      if (!field.querySelector('.attr-assign-toggle')?.checked) return;
      const attrId = field.dataset.attrId;
      const valType = field.dataset.valueType;
      const valObj = { attributeId: attrId };
      if (valType === 'BOOLEAN') { valObj.valueBoolean = true; }
      else if (valType === 'NUMBER') { const v = field.querySelector('.attr-input')?.value.trim(); if (v && !isNaN(Number(v))) valObj.valueNumber = parseFloat(v); }
      else if (valType === 'ENUM') { const sel = field.querySelector('.attr-input'); if (sel?.value) valObj.optionId = sel.value; }
      else if (valType === 'TEXT') { const v = field.querySelector('.attr-input')?.value.trim(); if (v) valObj.valueString = v; }
      else if (valType === 'DATE') { const v = field.querySelector('.attr-input')?.value.trim(); if (v) valObj.valueDate = v; }
      if (Object.keys(valObj).length > 1) values.push(valObj);
    });
    return values;
  }

  onUnitTypeChange(newUnitTypeId) {
    const currentValues = this.collectCurrentEAVValues();
    if (this.eav) {
      const definitions = this.eav.definitions;
      const mappings = this.eav.unitTypeAttributes.filter(m => m.unitTypeId === newUnitTypeId);
      views.UnitsView.renderEAVControls(newUnitTypeId, currentValues, definitions, mappings, this.currentLang);
    }
  }

  onAttrToggleChange(checkbox) {
    const card = checkbox.closest('.dynamic-attr-field');
    if (!card) return;
    const container = card.querySelector('.attr-input-container');
    const input = card.querySelector('.attr-input');
    const isChecked = checkbox.checked;
    container.classList.toggle('opacity-40', !isChecked);
    container.classList.toggle('pointer-events-none', !isChecked);
    if (input) { input.disabled = !isChecked; if (!isChecked && input.type !== 'checkbox') input.value = ''; }
  }

  updateLiveFilterPreview() {
    const previewBox = document.getElementById('liveFilterAttrPreview');
    if (!previewBox) return;

    const filterObj = {};
    document.querySelectorAll('.dynamic-attr-field').forEach(field => {
      if (!field.querySelector('.attr-assign-toggle')?.checked) return;
      if (field.dataset.isFilterable !== 'true') return;
      const key = field.dataset.attrId;
      const valType = field.dataset.valueType;

      if (valType === 'BOOLEAN') { filterObj[key] = true; }
      else if (valType === 'NUMBER') { const v = field.querySelector('.attr-input')?.value.trim(); if (v && !isNaN(Number(v))) filterObj[key] = Number(v); }
      else if (valType === 'ENUM') { const sel = field.querySelector('.attr-input'); if (sel?.selectedOptions?.[0]?.dataset.optVal) filterObj[key] = sel.selectedOptions[0].dataset.optVal; }
      else if (valType === 'TEXT') { const v = field.querySelector('.attr-input')?.value.trim(); if (v) filterObj[key] = v; }
    });

    previewBox.value = JSON.stringify(filterObj, null, 2);
  }

  async deleteUnit(id) {
    if (!confirm('Delete this unit?')) return;
    try {
      await api.deleteUnit(id, true);
      this.showToast('Deleted.', 'success');
      await this.refreshAll();
    } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
  }

  // ---- Raw Sheet Actions ----
  openAddRawRowModal() { this.openRawRowModal(); }

  editRawRow(id) {
    const row = this.activeRawData.find(r => r.id === id);
    if (row) this.openRawRowModal(row);
  }

  openRawRowModal(existing = null) {
    const cols = this.activeRawColumns.filter(c => c !== 'id');
    const html = views.RawSheetsView.renderRowModal(cols, existing, this.currentSheet);
    this.openModal(html);
    this.bindRawRowFormSubmit(existing?.id);
  }

  bindRawRowFormSubmit(existingId) {
    const form = document.getElementById('rawRowForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = {};
      this.activeRawColumns.forEach(c => { if (c !== 'id') payload[c] = fd.get(c) === '' ? null : fd.get(c); });

      const url = existingId ? `/api/sheets/${this.currentSheet}/${existingId}` : `/api/sheets/${this.currentSheet}`;
      const method = existingId ? 'PUT' : 'POST';

      try {
        await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        this.showToast('Saved!', 'success');
        this.closeModal();
        await this.loadRawSheet(this.currentSheet);
        await this.refreshAll();
      } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
    });
  }

  async deleteRawRow(id) {
    if (!confirm('Delete this row?')) return;
    try {
      await api.deleteRow(this.currentSheet, id, true);
      this.showToast('Deleted.', 'success');
      await this.loadRawSheet(this.currentSheet);
      await this.refreshAll();
    } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
  }

  // ---- Workbook Actions ----
  async cleanOrphans() {
    try {
      const res = await api.cleanOrphans();
      this.showToast(res.message, 'success');
      await this.refreshAll();
    } catch (err) { this.showToast('Failed: ' + err.message, 'error'); }
  }

  openUploadModal() {
    const html = views.RawSheetsView.renderUploadModal();
    this.openModal(html);
    this.bindUploadForm();
  }

  bindUploadForm() {
    const fileInput = document.getElementById('excelFileInput');
    const label = document.getElementById('fileUploadLabel');
    const form = document.getElementById('uploadForm');

    if (fileInput && label) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
          label.textContent = fileInput.files[0].name;
          label.classList.add('text-blue-600');
        }
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!fileInput?.files.length) return;
        
        const submitBtn = document.getElementById('btnSubmitUpload');
        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> Uploading...'; }
        if (window.lucide) window.lucide.createIcons();

        try {
          const formData = new FormData();
          formData.append('file', fileInput.files[0]);
          const res = await fetch('/api/workbook/upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          this.showToast('Workbook uploaded!', 'success');
          this.closeModal();
          await this.refreshAll();
        } catch (err) {
          this.showToast('Failed: ' + err.message, 'error');
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i data-lucide="upload" class="w-3.5 h-3.5"></i> Upload'; }
        }
      });
    }
  }
}

// ================================================================
// GLOBAL INITIALIZATION
// ================================================================

const app = new DashboardApp();
window.app = app;

document.addEventListener('DOMContentLoaded', async () => {
  await app.init();
});
