const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const ExcelJS = require('exceljs');
const { Mutex } = require('async-mutex');

const WORKBOOK_PATH = path.resolve(__dirname, '..', 'property_engine.xlsx');
const BACKUP_PATH = path.resolve(__dirname, '..', 'property_engine.backup.xlsx');

// 17 Sheets in exact order
const SHEETS = [
  'Country',
  'City',
  'District',
  'PropertyType',
  'PropertyClassification',
  'PropertyTypeClassification',
  'Property',
  'PropertyRule',
  'BookableUnitType',
  'BookableUnit',
  'AttributeGroup',
  'AttributeDefinition',
  'AttributeOption',
  'UnitTypeAttribute',
  'BookableUnitAttributeValue',
  'Language',
  'Translation'
];

// Columns for each sheet in exact order
const SHEET_COLUMNS = {
  Country: ['id', 'slug', 'code', 'key', 'name'],
  City: ['id', 'countryId', 'slug', 'name'],
  District: ['id', 'cityId', 'slug', 'name'],
  PropertyType: ['id', 'code', 'isActive'],
  PropertyClassification: ['id', 'code', 'isActive'],
  PropertyTypeClassification: ['id', 'propertyTypeId', 'classificationId', 'isActive'],
  Property: ['id', 'ownerId', 'propertyTypeClassificationId', 'districtId', 'name', 'description', 'status', 'addressLine1', 'addressLine2', 'landmark', 'postalCode', 'latitude', 'longitude'],
  PropertyRule: ['id', 'propertyId', 'code', 'type', 'icon', 'sortOrder', 'isActive'],
  BookableUnitType: ['id', 'code', 'isActive'],
  BookableUnit: ['id', 'propertyId', 'unitTypeId', 'name', 'capacity', 'basePrice', 'offerPrice', 'status', 'filterAttributes'],
  AttributeGroup: ['id', 'code', 'icon', 'displayOrder', 'isActive'],
  AttributeDefinition: ['id', 'key', 'valueType', 'groupId', 'icon', 'unitCode', 'isRequired', 'isFilterable', 'isSearchable', 'isDisplayable', 'displayOrder', 'isActive'],
  AttributeOption: ['id', 'attributeId', 'value', 'icon', 'sortOrder', 'isActive'],
  UnitTypeAttribute: ['id', 'unitTypeId', 'attributeId', 'isRequired', 'isFilterable', 'isDisplayable', 'sortOrder'],
  BookableUnitAttributeValue: ['id', 'unitId', 'attributeId', 'valueString', 'valueNumber', 'valueBoolean', 'valueDate', 'valueJson', 'optionId'],
  Language: ['id', 'code', 'name', 'nativeName', 'direction', 'isDefault', 'isActive'],
  Translation: ['id', 'entityType', 'entityId', 'field', 'languageCode', 'value']
};

// Custom Prefix Map for UUID generation
const PREFIX_MAP = {
  Country: '1000',
  City: '2000',
  District: '3000',
  PropertyType: '4001',
  PropertyClassification: '4002',
  PropertyTypeClassification: '4003',
  Property: '5000',
  PropertyRule: '5500',
  BookableUnitType: '6001',
  BookableUnit: '6002',
  AttributeGroup: '7001',
  AttributeDefinition: '7002',
  AttributeOption: '7003',
  UnitTypeAttribute: '7004',
  BookableUnitAttributeValue: '7005',
  Language: '8001',
  Translation: '9000'
};

// Numeric and Boolean column definitions for proper Excel cell typing
const BOOLEAN_COLUMNS = new Set(['isActive', 'isRequired', 'isFilterable', 'isSearchable', 'isDisplayable', 'isDefault', 'valueBoolean']);
const NUMBER_COLUMNS = new Set(['sortOrder', 'displayOrder', 'capacity', 'basePrice', 'offerPrice', 'latitude', 'longitude', 'valueNumber']);

class ExcelDatabase {
  constructor() {
    this.mutex = new Mutex();
    this.workbook = null;
    this.lastModified = null;
  }

  async init() {
    return this.mutex.runExclusive(async () => {
      await this._loadWorkbook();
      // Create backup on first launch if not exists
      if (!fs.existsSync(BACKUP_PATH) && fs.existsSync(WORKBOOK_PATH)) {
        try {
          fs.copyFileSync(WORKBOOK_PATH, BACKUP_PATH);
          console.log(`[ExcelDB] Initial backup created at ${BACKUP_PATH}`);
        } catch (err) {
          console.warn('[ExcelDB] Could not create initial backup:', err.message);
        }
      }

      // Auto-sanitize EAV definitions & unit type requirements
      let dirty = false;
      const attrDefsWs = this.workbook.getWorksheet('AttributeDefinition');
      const defs = this._getRowsSync('AttributeDefinition');
      const validAttrIds = new Set(defs.map(d => d.id));

      if (attrDefsWs) {
        const isReqColIdx = SHEET_COLUMNS['AttributeDefinition'].indexOf('isRequired') + 1;
        defs.forEach(d => {
          if ((d.key === 'bedrooms' || d.key === 'bathrooms') && d.isRequired) {
            attrDefsWs.getRow(d._rowNumber).getCell(isReqColIdx).value = false;
            dirty = true;
          }
        });
      }

      const utaWs = this.workbook.getWorksheet('UnitTypeAttribute');
      if (utaWs) {
        const utaRows = this._getRowsSync('UnitTypeAttribute');
        const rowsToDelete = [];
        const utaIsReqColIdx = SHEET_COLUMNS['UnitTypeAttribute'].indexOf('isRequired') + 1;

        utaRows.forEach(r => {
          if (!validAttrIds.has(r.attributeId)) {
            rowsToDelete.push(r._rowNumber);
            dirty = true;
          } else if (r.isRequired) {
            const def = defs.find(d => d.id === r.attributeId);
            if (def && (def.key === 'bedrooms' || def.key === 'bathrooms')) {
              utaWs.getRow(r._rowNumber).getCell(utaIsReqColIdx).value = false;
              dirty = true;
            }
          }
        });

        rowsToDelete.sort((a, b) => b - a).forEach(rn => utaWs.spliceRows(rn, 1));
      }

      // Clean false or empty rows in BookableUnitAttributeValue
      const buavWs = this.workbook.getWorksheet('BookableUnitAttributeValue');
      if (buavWs) {
        const buavRows = this._getRowsSync('BookableUnitAttributeValue');
        const buavToDelete = [];
        buavRows.forEach(r => {
          if (r.valueBoolean === false) {
            buavToDelete.push(r._rowNumber);
            dirty = true;
          } else {
            const hasVal = r.valueNumber !== null || r.valueBoolean === true || Boolean(r.valueString) || Boolean(r.optionId) || Boolean(r.valueDate) || Boolean(r.valueJson);
            if (!hasVal) {
              buavToDelete.push(r._rowNumber);
              dirty = true;
            }
          }
        });
        buavToDelete.sort((a, b) => b - a).forEach(rn => buavWs.spliceRows(rn, 1));
      }

      if (dirty) {
        await this._saveWorkbook();
        console.log('[ExcelDB] Database sanitized: bedrooms requirement relaxed and invalid EAV records cleaned.');
      }
    });
  }

  async _loadWorkbook() {
    if (!fs.existsSync(WORKBOOK_PATH)) {
      throw new Error(`Workbook not found at ${WORKBOOK_PATH}`);
    }
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(WORKBOOK_PATH);
    this.workbook = wb;
    const stats = fs.statSync(WORKBOOK_PATH);
    this.lastModified = stats.mtime;
    console.log(`[ExcelDB] Workbook loaded successfully (${wb.worksheets.length} sheets).`);
  }

  async _saveWorkbook() {
    await this.workbook.xlsx.writeFile(WORKBOOK_PATH);
    const stats = fs.statSync(WORKBOOK_PATH);
    this.lastModified = stats.mtime;
  }

  // Generate UUID according to 018f3a3a-<PREFIX>-7000-8000-<12-digit-hex>
  _generateId(sheetName) {
    const prefix = PREFIX_MAP[sheetName] || '9999';
    // Inspect existing IDs in sheet to continue sequence if standard sequential
    const ws = this.workbook.getWorksheet(sheetName);
    let maxSeq = 0;
    if (ws) {
      ws.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const val = row.getCell(1).value;
        if (val && typeof val === 'string' && val.startsWith(`018f3a3a-${prefix}-7000-8000-`)) {
          const suffix = val.split('-').pop();
          const parsed = parseInt(suffix, 16);
          if (!isNaN(parsed) && parsed > maxSeq) {
            maxSeq = parsed;
          }
        }
      });
    }

    if (maxSeq > 0) {
      const nextSeq = (maxSeq + 1).toString(16).padStart(12, '0');
      return `018f3a3a-${prefix}-7000-8000-${nextSeq}`;
    } else {
      const randomPart = crypto.randomBytes(6).toString('hex').padStart(12, '0');
      return `018f3a3a-${prefix}-7000-8000-${randomPart}`;
    }
  }

  _parseCellValue(val, colName) {
    if (val === null || val === undefined) return null;
    if (typeof val === 'object') {
      if (val.text !== undefined) val = val.text;
      else if (val.result !== undefined) val = val.result;
      else if (val instanceof Date) return val.toISOString();
    }

    if (BOOLEAN_COLUMNS.has(colName)) {
      if (typeof val === 'boolean') return val;
      if (typeof val === 'number') return val === 1;
      if (typeof val === 'string') {
        const s = val.trim().toLowerCase();
        return s === 'true' || s === '1' || s === 'yes';
      }
      return false;
    }

    if (NUMBER_COLUMNS.has(colName)) {
      if (typeof val === 'number') return val;
      if (typeof val === 'string') {
        const s = val.trim();
        if (s === '') return null;
        const n = Number(s);
        return isNaN(n) ? null : n;
      }
      return null;
    }

    if (typeof val === 'string') {
      return val.trim();
    }

    return String(val);
  }

  _formatCellValue(val, colName) {
    if (val === null || val === undefined || val === '') return null;

    if (BOOLEAN_COLUMNS.has(colName)) {
      if (typeof val === 'boolean') return val;
      if (typeof val === 'number') return val === 1;
      if (typeof val === 'string') {
        const s = val.trim().toLowerCase();
        return s === 'true' || s === '1' || s === 'yes';
      }
      return false;
    }

    if (NUMBER_COLUMNS.has(colName)) {
      const n = Number(val);
      return isNaN(n) ? null : n;
    }

    return String(val);
  }

  // Read all rows of a sheet as plain objects, ignoring corrupt/empty rows where ID is empty
  _getRowsSync(sheetName) {
    const ws = this.workbook.getWorksheet(sheetName);
    if (!ws) throw new Error(`Sheet ${sheetName} not found`);

    const cols = SHEET_COLUMNS[sheetName];
    if (!cols) throw new Error(`Unknown columns for sheet ${sheetName}`);

    // Map column letter to column index
    const colIndexMap = {};
    cols.forEach((colName, idx) => {
      colIndexMap[colName] = idx + 1;
    });

    const results = [];
    ws.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      const idCell = row.getCell(1).value;
      const parsedId = this._parseCellValue(idCell, 'id');
      // Auto-ignore rows without valid id
      if (!parsedId || typeof parsedId !== 'string' || parsedId.trim() === '') {
        return;
      }

      const item = { _rowNumber: rowNumber };
      cols.forEach((colName, idx) => {
        const cell = row.getCell(idx + 1);
        item[colName] = this._parseCellValue(cell.value, colName);
      });
      results.push(item);
    });

    return results;
  }

  // Public Methods wrapped with mutex
  async getAll(sheetName) {
    return this.mutex.runExclusive(async () => {
      return this._getRowsSync(sheetName);
    });
  }

  async getById(sheetName, id) {
    return this.mutex.runExclusive(async () => {
      const rows = this._getRowsSync(sheetName);
      return rows.find(r => r.id === id) || null;
    });
  }

  // Get Workbook overview stats
  async getStats() {
    return this.mutex.runExclusive(async () => {
      const stats = {};
      let totalRows = 0;
      SHEETS.forEach(sheetName => {
        const rows = this._getRowsSync(sheetName);
        stats[sheetName] = rows.length;
        totalRows += rows.length;
      });
      return {
        sheets: stats,
        totalSheets: SHEETS.length,
        totalRows,
        lastModified: this.lastModified,
        filePath: WORKBOOK_PATH
      };
    });
  }

  // Referential Integrity Validation
  _validateForeignKeys(sheetName, data) {
    const rules = {
      City: [{ field: 'countryId', targetSheet: 'Country', targetField: 'id' }],
      District: [{ field: 'cityId', targetSheet: 'City', targetField: 'id' }],
      PropertyTypeClassification: [
        { field: 'propertyTypeId', targetSheet: 'PropertyType', targetField: 'id' },
        { field: 'classificationId', targetSheet: 'PropertyClassification', targetField: 'id' }
      ],
      Property: [
        { field: 'propertyTypeClassificationId', targetSheet: 'PropertyTypeClassification', targetField: 'id' },
        { field: 'districtId', targetSheet: 'District', targetField: 'id' }
      ],
      PropertyRule: [{ field: 'propertyId', targetSheet: 'Property', targetField: 'id' }],
      BookableUnit: [
        { field: 'propertyId', targetSheet: 'Property', targetField: 'id' },
        { field: 'unitTypeId', targetSheet: 'BookableUnitType', targetField: 'id' }
      ],
      AttributeDefinition: [{ field: 'groupId', targetSheet: 'AttributeGroup', targetField: 'id' }],
      AttributeOption: [{ field: 'attributeId', targetSheet: 'AttributeDefinition', targetField: 'id' }],
      UnitTypeAttribute: [
        { field: 'unitTypeId', targetSheet: 'BookableUnitType', targetField: 'id' },
        { field: 'attributeId', targetSheet: 'AttributeDefinition', targetField: 'id' }
      ],
      BookableUnitAttributeValue: [
        { field: 'unitId', targetSheet: 'BookableUnit', targetField: 'id' },
        { field: 'attributeId', targetSheet: 'AttributeDefinition', targetField: 'id' },
        { field: 'optionId', targetSheet: 'AttributeOption', targetField: 'id', optional: true }
      ],
      Translation: [
        { field: 'languageCode', targetSheet: 'Language', targetField: 'code' }
      ]
    };

    const sheetRules = rules[sheetName] || [];
    for (const rule of sheetRules) {
      const val = data[rule.field];
      if (rule.optional && (!val || val === '')) continue;
      if (!val) {
        throw new Error(`Missing required foreign key '${rule.field}' in sheet '${sheetName}'.`);
      }
      const targetRows = this._getRowsSync(rule.targetSheet);
      const exists = targetRows.some(r => r[rule.targetField] === val);
      if (!exists) {
        throw new Error(`Foreign Key Violation: '${rule.field}' = '${val}' was not found in '${rule.targetSheet}.${rule.targetField}'.`);
      }
    }

    // Specific uniqueness constraints
    if (sheetName === 'PropertyTypeClassification') {
      const existing = this._getRowsSync('PropertyTypeClassification');
      const duplicate = existing.find(r => 
        r.propertyTypeId === data.propertyTypeId && 
        r.classificationId === data.classificationId &&
        r.id !== data.id
      );
      if (duplicate) {
        throw new Error(`Duplicate entry: Combination of propertyTypeId and classificationId already exists (ID: ${duplicate.id}).`);
      }
    }
  }

  // Check child dependencies before deleting
  _checkDependents(sheetName, id) {
    const dependencies = {
      Country: [{ sheet: 'City', fk: 'countryId' }],
      City: [{ sheet: 'District', fk: 'cityId' }],
      District: [{ sheet: 'Property', fk: 'districtId' }],
      PropertyType: [{ sheet: 'PropertyTypeClassification', fk: 'propertyTypeId' }],
      PropertyClassification: [{ sheet: 'PropertyTypeClassification', fk: 'classificationId' }],
      PropertyTypeClassification: [{ sheet: 'Property', fk: 'propertyTypeClassificationId' }],
      Property: [
        { sheet: 'BookableUnit', fk: 'propertyId' },
        { sheet: 'PropertyRule', fk: 'propertyId' }
      ],
      BookableUnitType: [
        { sheet: 'BookableUnit', fk: 'unitTypeId' },
        { sheet: 'UnitTypeAttribute', fk: 'unitTypeId' }
      ],
      BookableUnit: [{ sheet: 'BookableUnitAttributeValue', fk: 'unitId' }],
      AttributeGroup: [{ sheet: 'AttributeDefinition', fk: 'groupId' }],
      AttributeDefinition: [
        { sheet: 'AttributeOption', fk: 'attributeId' },
        { sheet: 'UnitTypeAttribute', fk: 'attributeId' },
        { sheet: 'BookableUnitAttributeValue', fk: 'attributeId' }
      ],
      AttributeOption: [{ sheet: 'BookableUnitAttributeValue', fk: 'optionId' }],
      Language: [{ sheet: 'Translation', fk: 'languageCode' }]
    };

    const depList = dependencies[sheetName] || [];
    const conflicts = [];
    for (const dep of depList) {
      const rows = this._getRowsSync(dep.sheet);
      const matching = rows.filter(r => r[dep.fk] === id);
      if (matching.length > 0) {
        conflicts.push({
          targetSheet: dep.sheet,
          foreignKey: dep.fk,
          count: matching.length,
          sampleIds: matching.slice(0, 3).map(m => m.id)
        });
      }
    }

    // Also check Translation table where entityId matches
    const translations = this._getRowsSync('Translation');
    const transMatches = translations.filter(t => t.entityId === id);
    if (transMatches.length > 0) {
      conflicts.push({
        targetSheet: 'Translation',
        foreignKey: 'entityId',
        count: transMatches.length,
        sampleIds: transMatches.slice(0, 3).map(m => m.id)
      });
    }

    return conflicts;
  }

  // Recalculate and synchronize filterAttributes JSON on BookableUnit
  _syncFilterAttributesSync(unitId) {
    if (!unitId) return;
    const units = this._getRowsSync('BookableUnit');
    const unit = units.find(u => u.id === unitId);
    if (!unit) return;

    const allAttrValues = this._getRowsSync('BookableUnitAttributeValue').filter(v => v.unitId === unitId);
    const attrDefs = this._getRowsSync('AttributeDefinition');
    const attrOpts = this._getRowsSync('AttributeOption');
    const unitTypeAttrs = this._getRowsSync('UnitTypeAttribute').filter(u => u.unitTypeId === unit.unitTypeId);

    const filterObj = {};

    for (const val of allAttrValues) {
      const def = attrDefs.find(d => d.id === val.attributeId);
      if (!def) continue;

      // Check filterable: either definition isFilterable or overridden in UnitTypeAttribute
      const uta = unitTypeAttrs.find(u => u.attributeId === val.attributeId);
      const isFilterable = uta && uta.isFilterable !== null && uta.isFilterable !== undefined
        ? Boolean(uta.isFilterable)
        : Boolean(def.isFilterable);

      if (!isFilterable) continue;

      let computedValue = null;
      switch (def.valueType) {
        case 'NUMBER':
          computedValue = val.valueNumber !== null ? Number(val.valueNumber) : null;
          break;
        case 'BOOLEAN':
          computedValue = val.valueBoolean === true ? true : null;
          break;
        case 'TEXT':
          computedValue = val.valueString ? String(val.valueString) : null;
          break;
        case 'DATE':
          computedValue = val.valueDate ? String(val.valueDate) : null;
          break;
        case 'JSON':
          if (val.valueJson) {
            try { computedValue = JSON.parse(val.valueJson); } catch (e) { computedValue = val.valueJson; }
          }
          break;
        case 'ENUM':
          if (val.optionId) {
            const opt = attrOpts.find(o => o.id === val.optionId);
            computedValue = opt ? opt.value : val.optionId;
          }
          break;
      }

      if (computedValue !== null && computedValue !== undefined && computedValue !== '') {
        filterObj[def.key] = computedValue;
      }
    }

    const filterJsonString = JSON.stringify(filterObj);

    // Update row in BookableUnit sheet
    const ws = this.workbook.getWorksheet('BookableUnit');
    const row = ws.getRow(unit._rowNumber);
    const filterAttrColIndex = SHEET_COLUMNS.BookableUnit.indexOf('filterAttributes') + 1;
    row.getCell(filterAttrColIndex).value = filterJsonString;
    row.commit();
  }

  // Save/Update embedded translations payload for an entity
  _upsertTranslationsSync(entityType, entityId, translationsObj) {
    if (!translationsObj || typeof translationsObj !== 'object') return;
    const ws = this.workbook.getWorksheet('Translation');
    const cols = SHEET_COLUMNS.Translation;
    const existing = this._getRowsSync('Translation');

    // translationsObj format: { ar: { name: '...', description: '...' }, en: { name: '...' } }
    for (const [langCode, fields] of Object.entries(translationsObj)) {
      if (!fields || typeof fields !== 'object') continue;
      for (const [fieldName, val] of Object.entries(fields)) {
        const textVal = val !== null && val !== undefined ? String(val).trim() : '';
        const match = existing.find(t => 
          t.entityType === entityType && 
          t.entityId === entityId && 
          t.languageCode === langCode && 
          t.field === fieldName
        );

        if (match) {
          if (textVal === '') {
            // Delete row if value cleared
            ws.spliceRows(match._rowNumber, 1);
          } else {
            // Update value cell
            const row = ws.getRow(match._rowNumber);
            const valColIdx = cols.indexOf('value') + 1;
            row.getCell(valColIdx).value = textVal;
            row.commit();
          }
        } else if (textVal !== '') {
          // Insert new Translation row
          const newId = this._generateId('Translation');
          const rowValues = [];
          cols.forEach(c => {
            if (c === 'id') rowValues.push(newId);
            else if (c === 'entityType') rowValues.push(entityType);
            else if (c === 'entityId') rowValues.push(entityId);
            else if (c === 'field') rowValues.push(fieldName);
            else if (c === 'languageCode') rowValues.push(langCode);
            else if (c === 'value') rowValues.push(textVal);
            else rowValues.push(null);
          });
          ws.addRow(rowValues);
        }
      }
    }
  }

  // Create record in sheet
  async create(sheetName, data, translations = null) {
    return this.mutex.runExclusive(async () => {
      const ws = this.workbook.getWorksheet(sheetName);
      if (!ws) throw new Error(`Sheet ${sheetName} not found`);
      const cols = SHEET_COLUMNS[sheetName];

      const id = data.id || this._generateId(sheetName);
      const recordData = { ...data, id };

      // Strictly format BookableUnitAttributeValue
      if (sheetName === 'BookableUnitAttributeValue') {
        const attrDefs = this._getRowsSync('AttributeDefinition');
        const def = attrDefs.find(d => d.id === recordData.attributeId);
        if (def) {
          ['valueString', 'valueNumber', 'valueBoolean', 'valueDate', 'valueJson', 'optionId'].forEach(col => {
            if (
              (def.valueType === 'TEXT' && col === 'valueString') ||
              (def.valueType === 'NUMBER' && col === 'valueNumber') ||
              (def.valueType === 'BOOLEAN' && col === 'valueBoolean') ||
              (def.valueType === 'DATE' && col === 'valueDate') ||
              (def.valueType === 'JSON' && col === 'valueJson') ||
              (def.valueType === 'ENUM' && col === 'optionId')
            ) {
              if (def.valueType === 'BOOLEAN' && col === 'valueBoolean') {
                recordData.valueBoolean = (recordData.valueBoolean === true || recordData.valueBoolean === 'true' || recordData.valueBoolean === 1) ? true : null;
              }
            } else {
              recordData[col] = null;
            }
          });
        }
      }

      this._validateForeignKeys(sheetName, recordData);

      const rowValues = [];
      cols.forEach(colName => {
        rowValues.push(this._formatCellValue(recordData[colName], colName));
      });

      ws.addRow(rowValues);

      // Handle translations if provided
      if (translations) {
        this._upsertTranslationsSync(sheetName.toUpperCase(), id, translations);
      }

      // Handle BookableUnit filterAttributes sync
      if (sheetName === 'BookableUnitAttributeValue' && recordData.unitId) {
        this._syncFilterAttributesSync(recordData.unitId);
      }

      await this._saveWorkbook();
      return recordData;
    });
  }

  // Update record in sheet
  async update(sheetName, id, data, translations = null) {
    return this.mutex.runExclusive(async () => {
      const ws = this.workbook.getWorksheet(sheetName);
      if (!ws) throw new Error(`Sheet ${sheetName} not found`);
      const cols = SHEET_COLUMNS[sheetName];

      const rows = this._getRowsSync(sheetName);
      const existing = rows.find(r => r.id === id);
      if (!existing) {
        throw new Error(`Record with ID ${id} not found in sheet ${sheetName}`);
      }

      const merged = { ...existing, ...data, id };

      // Strict single value column enforcement for BookableUnitAttributeValue
      if (sheetName === 'BookableUnitAttributeValue') {
        const attrDefs = this._getRowsSync('AttributeDefinition');
        const def = attrDefs.find(d => d.id === merged.attributeId);
        if (def) {
          ['valueString', 'valueNumber', 'valueBoolean', 'valueDate', 'valueJson', 'optionId'].forEach(col => {
            if (
              (def.valueType === 'TEXT' && col === 'valueString') ||
              (def.valueType === 'NUMBER' && col === 'valueNumber') ||
              (def.valueType === 'BOOLEAN' && col === 'valueBoolean') ||
              (def.valueType === 'DATE' && col === 'valueDate') ||
              (def.valueType === 'JSON' && col === 'valueJson') ||
              (def.valueType === 'ENUM' && col === 'optionId')
            ) {
              if (def.valueType === 'BOOLEAN' && col === 'valueBoolean') {
                merged.valueBoolean = (merged.valueBoolean === true || merged.valueBoolean === 'true' || merged.valueBoolean === 1) ? true : null;
              }
            } else {
              merged[col] = null;
            }
          });
        }
      }

      this._validateForeignKeys(sheetName, merged);

      const row = ws.getRow(existing._rowNumber);
      cols.forEach((colName, idx) => {
        const val = this._formatCellValue(merged[colName], colName);
        row.getCell(idx + 1).value = val;
      });
      row.commit();

      // Upsert translations if provided
      if (translations) {
        this._upsertTranslationsSync(sheetName.toUpperCase(), id, translations);
      }

      // Auto-sync filterAttributes if BookableUnitAttributeValue modified
      if (sheetName === 'BookableUnitAttributeValue') {
        this._syncFilterAttributesSync(merged.unitId);
      }

      await this._saveWorkbook();
      return merged;
    });
  }

  // Delete record from sheet
  async delete(sheetName, id, cascade = false) {
    return this.mutex.runExclusive(async () => {
      const ws = this.workbook.getWorksheet(sheetName);
      if (!ws) throw new Error(`Sheet ${sheetName} not found`);

      const rows = this._getRowsSync(sheetName);
      const existing = rows.find(r => r.id === id);
      if (!existing) {
        throw new Error(`Record with ID ${id} not found in sheet ${sheetName}`);
      }

      const dependents = this._checkDependents(sheetName, id);
      if (dependents.length > 0 && !cascade) {
        const msg = dependents.map(d => `${d.count} records in ${d.targetSheet} (FK: ${d.foreignKey})`).join(', ');
        throw new Error(`Cannot delete: Dependent records exist: ${msg}. Provide cascade=true to delete them.`);
      }

      // If cascade is requested, delete children recursively
      if (cascade && dependents.length > 0) {
        for (const dep of dependents) {
          const childWs = this.workbook.getWorksheet(dep.targetSheet);
          const childRows = this._getRowsSync(dep.targetSheet);
          const toDelete = childRows.filter(r => r[dep.foreignKey] === id);
          // Delete in reverse order of row numbers to preserve indices
          toDelete.sort((a, b) => b._rowNumber - a._rowNumber);
          for (const item of toDelete) {
            childWs.spliceRows(item._rowNumber, 1);
          }
        }
      }

      // Remember unitId for BookableUnitAttributeValue before deleting
      const affectedUnitId = sheetName === 'BookableUnitAttributeValue' ? existing.unitId : null;

      // Delete the row
      ws.spliceRows(existing._rowNumber, 1);

      // Delete associated translations
      const transWs = this.workbook.getWorksheet('Translation');
      const allTrans = this._getRowsSync('Translation');
      const transToDelete = allTrans.filter(t => t.entityId === id);
      transToDelete.sort((a, b) => b._rowNumber - a._rowNumber);
      for (const t of transToDelete) {
        transWs.spliceRows(t._rowNumber, 1);
      }

      // Resync filterAttributes if attribute value was deleted
      if (affectedUnitId) {
        this._syncFilterAttributesSync(affectedUnitId);
      }

      await this._saveWorkbook();
      return { success: true, deletedId: id };
    });
  }

  // Clean empty or corrupt rows across all 17 sheets (e.g. Translation row 16)
  async cleanOrphans() {
    return this.mutex.runExclusive(async () => {
      let cleanedCount = 0;
      const details = {};

      for (const sheetName of SHEETS) {
        const ws = this.workbook.getWorksheet(sheetName);
        if (!ws) continue;
        const rowsToRemove = [];
        ws.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return;
          const idVal = row.getCell(1).value;
          const parsedId = this._parseCellValue(idVal, 'id');
          if (!parsedId || typeof parsedId !== 'string' || parsedId.trim() === '') {
            rowsToRemove.push(rowNumber);
          }
        });

        // Splice in reverse row number order
        rowsToRemove.sort((a, b) => b - a);
        rowsToRemove.forEach(rn => {
          ws.spliceRows(rn, 1);
          cleanedCount++;
        });

        if (rowsToRemove.length > 0) {
          details[sheetName] = rowsToRemove.length;
        }
      }

      if (cleanedCount > 0) {
        await this._saveWorkbook();
      }

      return {
        cleanedCount,
        details,
        message: `Successfully cleaned ${cleanedCount} corrupted/empty rows.`
      };
    });
  }

  // Hot reload workbook from disk
  async reload() {
    return this.mutex.runExclusive(async () => {
      await this._loadWorkbook();
      return { success: true, message: 'Workbook hot-reloaded from disk.' };
    });
  }

  // Replace workbook file from uploaded buffer
  async replaceWorkbook(buffer) {
    return this.mutex.runExclusive(async () => {
      // Backup current file before replacement
      if (fs.existsSync(WORKBOOK_PATH)) {
        fs.copyFileSync(WORKBOOK_PATH, BACKUP_PATH);
      }
      fs.writeFileSync(WORKBOOK_PATH, buffer);
      await this._loadWorkbook();
      return { success: true, message: 'Workbook successfully replaced and reloaded.' };
    });
  }

  // Helper to fetch translations for an entity
  _getEntityTranslations(entityId) {
    const translations = this._getRowsSync('Translation');
    const matched = translations.filter(t => t.entityId === entityId);
    const result = {};
    matched.forEach(t => {
      if (!result[t.languageCode]) result[t.languageCode] = {};
      result[t.languageCode][t.field] = t.value;
    });
    return result;
  }

  // Enriched getters with human readable foreign key names
  async getEnrichedProperties() {
    return this.mutex.runExclusive(async () => {
      const properties = this._getRowsSync('Property');
      const ptClassifications = this._getRowsSync('PropertyTypeClassification');
      const pTypes = this._getRowsSync('PropertyType');
      const pClasses = this._getRowsSync('PropertyClassification');
      const districts = this._getRowsSync('District');
      const cities = this._getRowsSync('City');
      const countries = this._getRowsSync('Country');
      const units = this._getRowsSync('BookableUnit');
      const rules = this._getRowsSync('PropertyRule');

      return properties.map(p => {
        // Resolve PropertyTypeClassification
        const ptc = ptClassifications.find(x => x.id === p.propertyTypeClassificationId);
        const pType = ptc ? pTypes.find(t => t.id === ptc.propertyTypeId) : null;
        const pClass = ptc ? pClasses.find(c => c.id === ptc.classificationId) : null;
        const classificationLabel = pType && pClass 
          ? `${pType.code.toUpperCase()} - ${pClass.code.toUpperCase()}`
          : (p.propertyTypeClassificationId || 'Unclassified');

        // Resolve District -> City -> Country
        const dist = districts.find(d => d.id === p.districtId);
        const city = dist ? cities.find(c => c.id === dist.cityId) : null;
        const country = city ? countries.find(co => co.id === city.countryId) : null;
        const locationPath = [
          country ? country.name : null,
          city ? city.name : null,
          dist ? dist.name : null
        ].filter(Boolean).join(' -> ');

        // Unit count and Rules count
        const unitCount = units.filter(u => u.propertyId === p.id).length;
        const ruleCount = rules.filter(r => r.propertyId === p.id).length;

        const translations = this._getEntityTranslations(p.id);

        return {
          ...p,
          classificationLabel,
          propertyTypeCode: pType ? pType.code : null,
          classificationCode: pClass ? pClass.code : null,
          districtName: dist ? dist.name : null,
          cityName: city ? city.name : null,
          countryName: country ? country.name : null,
          locationPath,
          unitCount,
          ruleCount,
          translations
        };
      });
    });
  }

  async getEnrichedBookableUnits() {
    return this.mutex.runExclusive(async () => {
      const units = this._getRowsSync('BookableUnit');
      const properties = this._getRowsSync('Property');
      const unitTypes = this._getRowsSync('BookableUnitType');
      const attrValues = this._getRowsSync('BookableUnitAttributeValue');
      const attrDefs = this._getRowsSync('AttributeDefinition');
      const attrOpts = this._getRowsSync('AttributeOption');

      return units.map(u => {
        const prop = properties.find(p => p.id === u.propertyId);
        const uType = unitTypes.find(t => t.id === u.unitTypeId);
        const translations = this._getEntityTranslations(u.id);

        // Map attribute values
        const values = attrValues.filter(v => v.unitId === u.id).map(v => {
          const def = attrDefs.find(d => d.id === v.attributeId);
          const opt = v.optionId ? attrOpts.find(o => o.id === v.optionId) : null;
          return {
            ...v,
            attributeKey: def ? def.key : null,
            valueType: def ? def.valueType : null,
            unitCode: def ? def.unitCode : null,
            optionValue: opt ? opt.value : null
          };
        });

        // Parse filterAttributes if valid JSON
        let parsedFilterAttributes = {};
        if (u.filterAttributes) {
          try {
            parsedFilterAttributes = JSON.parse(u.filterAttributes);
          } catch (e) {
            parsedFilterAttributes = u.filterAttributes;
          }
        }

        return {
          ...u,
          propertyName: prop ? prop.name : 'Unknown Property',
          unitTypeCode: uType ? uType.code : 'Unknown Type',
          translations,
          attributeValues: values,
          parsedFilterAttributes
        };
      });
    });
  }

  async getEnrichedLocations() {
    return this.mutex.runExclusive(async () => {
      const countries = this._getRowsSync('Country').map(c => ({
        ...c,
        translations: this._getEntityTranslations(c.id)
      }));
      const cities = this._getRowsSync('City').map(c => {
        const country = countries.find(co => co.id === c.countryId);
        return {
          ...c,
          countryName: country ? country.name : 'Unknown Country',
          translations: this._getEntityTranslations(c.id)
        };
      });
      const districts = this._getRowsSync('District').map(d => {
        const city = cities.find(ci => ci.id === d.cityId);
        const country = city ? countries.find(co => co.id === city.countryId) : null;
        return {
          ...d,
          cityName: city ? city.name : 'Unknown City',
          countryName: country ? country.name : 'Unknown Country',
          translations: this._getEntityTranslations(d.id)
        };
      });

      return { countries, cities, districts };
    });
  }

  async getTaxonomy() {
    return this.mutex.runExclusive(async () => {
      const types = this._getRowsSync('PropertyType').map(t => ({
        ...t,
        translations: this._getEntityTranslations(t.id)
      }));
      const classifications = this._getRowsSync('PropertyClassification').map(c => ({
        ...c,
        translations: this._getEntityTranslations(c.id)
      }));
      const ptcRows = this._getRowsSync('PropertyTypeClassification');

      // Create full matrix mapping
      const matrix = [];
      types.forEach(t => {
        classifications.forEach(c => {
          const match = ptcRows.find(r => r.propertyTypeId === t.id && r.classificationId === c.id);
          matrix.push({
            propertyTypeId: t.id,
            propertyTypeCode: t.code,
            classificationId: c.id,
            classificationCode: c.code,
            isEnabled: Boolean(match && match.isActive),
            id: match ? match.id : null
          });
        });
      });

      return { types, classifications, propertyTypeClassifications: ptcRows, matrix };
    });
  }

  async getEAVSchema() {
    return this.mutex.runExclusive(async () => {
      const groups = this._getRowsSync('AttributeGroup').map(g => ({
        ...g,
        translations: this._getEntityTranslations(g.id)
      }));
      const definitions = this._getRowsSync('AttributeDefinition').map(d => ({
        ...d,
        translations: this._getEntityTranslations(d.id)
      }));
      const options = this._getRowsSync('AttributeOption').map(o => ({
        ...o,
        translations: this._getEntityTranslations(o.id)
      }));
      const unitTypes = this._getRowsSync('BookableUnitType').map(ut => ({
        ...ut,
        translations: this._getEntityTranslations(ut.id)
      }));
      const unitTypeAttributes = this._getRowsSync('UnitTypeAttribute');

      // Attach options to definitions where valueType === 'ENUM'
      const enrichedDefinitions = definitions.map(def => {
        const group = groups.find(g => g.id === def.groupId);
        const defOptions = def.valueType === 'ENUM' ? options.filter(o => o.attributeId === def.id) : [];
        return {
          ...def,
          groupCode: group ? group.code : null,
          options: defOptions
        };
      });

      return {
        groups,
        definitions: enrichedDefinitions,
        options,
        unitTypes,
        unitTypeAttributes
      };
    });
  }
}

module.exports = {
  db: new ExcelDatabase(),
  SHEETS,
  SHEET_COLUMNS,
  WORKBOOK_PATH
};
