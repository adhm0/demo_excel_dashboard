/**
 * API Layer - Handles all server communication
 * Single responsibility: data fetching & transformation
 */

class ApiClient {
  constructor() {
    this.baseUrl = '/api';
  }

  // Core fetch wrapper with error handling
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`[API] ${endpoint} failed:`, error);
      throw error;
    }
  }

  // ==================== WORKBOOK ====================
  async getStats() {
    return this.request('/workbook/stats');
  }

  async getWorkbookPath() {
    return this.request('/workbook/path');
  }

  async uploadFile(fileBuffer) {
    const formData = new FormData();
    formData.append('file', fileBuffer);
    return fetch('/api/workbook/upload', { method: 'POST', body: formData })
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error(data.error);
        return data;
      });
  }

  async cleanOrphans() {
    return this.request('/workbook/clean-orphans', { method: 'POST' });
  }

  async reloadWorkbook() {
    return this.request('/workbook/reload', { method: 'POST' });
  }

  // ==================== LOCATIONS ====================
  async getLocations() {
    return this.request('/locations');
  }

  async getCountries() {
    return this.request('/countries');
  }

  async getCities() {
    return this.request('/cities');
  }

  async getDistricts() {
    return this.request('/districts');
  }

  async createCountry(data) {
    return this.request('/countries', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateCountry(id, data) {
    return this.request(`/countries/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteCountry(id, cascade = false) {
    return this.request(`/countries/${id}?cascade=${cascade}`, { method: 'DELETE' });
  }

  async createCity(data) {
    return this.request('/cities', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateCity(id, data) {
    return this.request(`/cities/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteCity(id, cascade = false) {
    return this.request(`/cities/${id}?cascade=${cascade}`, { method: 'DELETE' });
  }

  async createDistrict(data) {
    return this.request('/districts', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateDistrict(id, data) {
    return this.request(`/districts/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteDistrict(id, cascade = false) {
    return this.request(`/districts/${id}?cascade=${cascade}`, { method: 'DELETE' });
  }

  // ==================== TAXONOMY ====================
  async getTaxonomy() {
    return this.request('/taxonomy');
  }

  async toggleTaxonomyPair(propertyTypeId, classificationId, isEnabled) {
    return this.request('/property-type-classifications/toggle', {
      method: 'POST',
      body: JSON.stringify({ propertyTypeId, classificationId, isEnabled })
    });
  }

  async createPropertyType(data) {
    return this.request('/property-types', { method: 'POST', body: JSON.stringify(data) });
  }

  async updatePropertyType(id, data) {
    return this.request(`/property-types/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deletePropertyType(id, cascade = false) {
    return this.request(`/property-types/${id}?cascade=${cascade}`, { method: 'DELETE' });
  }

  async createClassification(data) {
    return this.request('/property-classifications', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateClassification(id, data) {
    return this.request(`/property-classifications/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteClassification(id, cascade = false) {
    return this.request(`/property-classifications/${id}?cascade=${cascade}`, { method: 'DELETE' });
  }

  // ==================== EAV ====================
  async getEavSchema() {
    return this.request('/eav-schema');
  }

  async saveUnitTypeMatrix(unitTypeId, attributes) {
    return this.request('/unit-type-attributes/save-matrix', {
      method: 'POST',
      body: JSON.stringify({ unitTypeId, attributes })
    });
  }

  async createAttributeGroup(data) {
    return this.request('/attribute-groups', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateAttributeGroup(id, data) {
    return this.request(`/attribute-groups/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteAttributeGroup(id, cascade = false) {
    return this.request(`/attribute-groups/${id}?cascade=${cascade}`, { method: 'DELETE' });
  }

  async createAttributeDefinition(data) {
    return this.request('/attribute-definitions', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateAttributeDefinition(id, data) {
    return this.request(`/attribute-definitions/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteAttributeDefinition(id, cascade = false) {
    return this.request(`/attribute-definitions/${id}?cascade=${cascade}`, { method: 'DELETE' });
  }

  // ==================== PROPERTIES ====================
  async getProperties() {
    return this.request('/properties');
  }

  async getProperty(id) {
    return this.request(`/properties/${id}`);
  }

  async createProperty(data) {
    return this.request('/properties', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateProperty(id, data) {
    return this.request(`/properties/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteProperty(id, cascade = false) {
    return this.request(`/properties/${id}?cascade=${cascade}`, { method: 'DELETE' });
  }

  async getPropertyRules(propertyId) {
    return this.request(`/properties/${propertyId}/rules`);
  }

  async createPropertyRule(data) {
    return this.request('/property-rules', { method: 'POST', body: JSON.stringify(data) });
  }

  async deletePropertyRule(id, cascade = false) {
    return this.request(`/property-rules/${id}?cascade=${cascade}`, { method: 'DELETE' });
  }

  // ==================== UNITS ====================
  async getBookableUnits() {
    return this.request('/bookable-units');
  }

  async createUnit(data) {
    return this.request('/bookable-units', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateUnit(id, data) {
    return this.request(`/bookable-units/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteUnit(id, cascade = false) {
    return this.request(`/bookable-units/${id}?cascade=${cascade}`, { method: 'DELETE' });
  }

  // ==================== SHEETS ====================
  async getSheetData(sheetName) {
    return this.request(`/sheets/${sheetName}`);
  }

  async createRow(sheetName, data) {
    return this.request(`/sheets/${sheetName}`, { method: 'POST', body: JSON.stringify(data) });
  }

  async updateRow(sheetName, id, data) {
    return this.request(`/sheets/${sheetName}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteRow(sheetName, id, cascade = false) {
    return this.request(`/sheets/${sheetName}/${id}?cascade=${cascade}`, { method: 'DELETE' });
  }
}

// Export singleton instance
window.api = new ApiClient();
