const express = require('express');
const multer = require('multer');
const { db, SHEETS, SHEET_COLUMNS, WORKBOOK_PATH } = require('./db');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Error handler helper
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    console.error(`[API Error] ${req.method} ${req.url}:`, err);
    res.status(400).json({ success: false, error: err.message });
  });
};

/* ========================================================
   1. WORKBOOK & SYSTEM ENDPOINTS
   ======================================================== */
router.get('/workbook/stats', asyncHandler(async (req, res) => {
  const stats = await db.getStats();
  res.json({ success: true, data: stats });
}));

router.get('/workbook/download', (req, res) => {
  const downloadPath = (typeof db.getWorkbookPath === 'function') ? db.getWorkbookPath() : WORKBOOK_PATH;
  res.download(downloadPath, 'property_engine.xlsx', err => {
    if (err) {
      console.error('[Download Error]:', err);
      if (!res.headersSent) res.status(500).json({ error: 'Download failed' });
    }
  });
});

router.post('/workbook/upload', upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  const result = await db.replaceWorkbook(req.file.buffer);
  const stats = await db.getStats();
  res.json({ success: true, message: result.message, stats });
}));

router.post('/workbook/clean-orphans', asyncHandler(async (req, res) => {
  const result = await db.cleanOrphans();
  const stats = await db.getStats();
  res.json({ success: true, ...result, stats });
}));

router.post('/workbook/reload', asyncHandler(async (req, res) => {
  const result = await db.reload();
  const stats = await db.getStats();
  res.json({ success: true, ...result, stats });
}));

/* ========================================================
   2. GEO-LOCATION ENDPOINTS (Country -> City -> District)
   ======================================================== */
router.get('/locations', asyncHandler(async (req, res) => {
  const data = await db.getEnrichedLocations();
  res.json({ success: true, data });
}));

router.get('/countries', asyncHandler(async (req, res) => {
  const countries = await db.getAll('Country');
  res.json({ success: true, data: countries });
}));

router.post('/countries', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const created = await db.create('Country', data, translations);
  res.json({ success: true, data: created });
}));

router.put('/countries/:id', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const updated = await db.update('Country', req.params.id, data, translations);
  res.json({ success: true, data: updated });
}));

router.delete('/countries/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('Country', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

router.get('/cities', asyncHandler(async (req, res) => {
  const cities = await db.getAll('City');
  res.json({ success: true, data: cities });
}));

router.post('/cities', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const created = await db.create('City', data, translations);
  res.json({ success: true, data: created });
}));

router.put('/cities/:id', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const updated = await db.update('City', req.params.id, data, translations);
  res.json({ success: true, data: updated });
}));

router.delete('/cities/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('City', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

router.get('/districts', asyncHandler(async (req, res) => {
  const districts = await db.getAll('District');
  res.json({ success: true, data: districts });
}));

router.post('/districts', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const created = await db.create('District', data, translations);
  res.json({ success: true, data: created });
}));

router.put('/districts/:id', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const updated = await db.update('District', req.params.id, data, translations);
  res.json({ success: true, data: updated });
}));

router.delete('/districts/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('District', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

/* ========================================================
   3. PROPERTY TAXONOMY & MATRIX
   ======================================================== */
router.get('/taxonomy', asyncHandler(async (req, res) => {
  const data = await db.getTaxonomy();
  res.json({ success: true, data });
}));

router.post('/property-types', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const created = await db.create('PropertyType', data, translations);
  res.json({ success: true, data: created });
}));

router.put('/property-types/:id', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const updated = await db.update('PropertyType', req.params.id, data, translations);
  res.json({ success: true, data: updated });
}));

router.delete('/property-types/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('PropertyType', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

router.post('/property-classifications', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const created = await db.create('PropertyClassification', data, translations);
  res.json({ success: true, data: created });
}));

router.put('/property-classifications/:id', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const updated = await db.update('PropertyClassification', req.params.id, data, translations);
  res.json({ success: true, data: updated });
}));

router.delete('/property-classifications/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('PropertyClassification', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

// One-click matrix toggle for PropertyTypeClassification
router.post('/property-type-classifications/toggle', asyncHandler(async (req, res) => {
  const { propertyTypeId, classificationId, isEnabled } = req.body;
  const ptcRows = await db.getAll('PropertyTypeClassification');
  const existing = ptcRows.find(r => r.propertyTypeId === propertyTypeId && r.classificationId === classificationId);

  if (existing) {
    if (isEnabled) {
      await db.update('PropertyTypeClassification', existing.id, { isActive: true });
    } else {
      // If disabled, toggle isActive: false (or delete if no properties use it)
      const properties = await db.getAll('Property');
      const inUse = properties.some(p => p.propertyTypeClassificationId === existing.id);
      if (inUse) {
        await db.update('PropertyTypeClassification', existing.id, { isActive: false });
      } else {
        await db.delete('PropertyTypeClassification', existing.id);
      }
    }
  } else if (isEnabled) {
    await db.create('PropertyTypeClassification', {
      propertyTypeId,
      classificationId,
      isActive: true
    });
  }

  const taxonomy = await db.getTaxonomy();
  res.json({ success: true, data: taxonomy });
}));

/* ========================================================
   4. CORE PROPERTIES & RULES
   ======================================================== */
router.get('/properties', asyncHandler(async (req, res) => {
  const properties = await db.getEnrichedProperties();
  res.json({ success: true, data: properties });
}));

router.get('/properties/:id', asyncHandler(async (req, res) => {
  const properties = await db.getEnrichedProperties();
  const property = properties.find(p => p.id === req.params.id);
  if (!property) return res.status(404).json({ success: false, error: 'Property not found' });
  res.json({ success: true, data: property });
}));

router.post('/properties', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  // Default ownerId if not supplied
  if (!data.ownerId) {
    data.ownerId = '018f3a3a-0000-7000-8000-000000000001';
  }
  const created = await db.create('Property', data, translations);
  res.json({ success: true, data: created });
}));

router.put('/properties/:id', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const updated = await db.update('Property', req.params.id, data, translations);
  res.json({ success: true, data: updated });
}));

router.delete('/properties/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('Property', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

// Property Rules
router.get('/properties/:id/rules', asyncHandler(async (req, res) => {
  const allRules = await db.getAll('PropertyRule');
  const translations = await db.getAll('Translation');
  const rules = allRules.filter(r => r.propertyId === req.params.id).map(rule => {
    const ruleTrans = {};
    translations.filter(t => t.entityId === rule.id && t.field === 'rule_text').forEach(t => {
      ruleTrans[t.languageCode] = t.value;
    });
    return {
      ...rule,
      translations: { rule_text: ruleTrans }
    };
  });
  res.json({ success: true, data: rules });
}));

router.post('/property-rules', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const created = await db.create('PropertyRule', data, translations);
  res.json({ success: true, data: created });
}));

router.put('/property-rules/:id', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const updated = await db.update('PropertyRule', req.params.id, data, translations);
  res.json({ success: true, data: updated });
}));

router.delete('/property-rules/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('PropertyRule', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

/* ========================================================
   5. BOOKABLE UNITS & DYNAMIC ATTRIBUTE VALUES
   ======================================================== */
router.get('/bookable-units', asyncHandler(async (req, res) => {
  const units = await db.getEnrichedBookableUnits();
  res.json({ success: true, data: units });
}));

router.get('/bookable-units/:id', asyncHandler(async (req, res) => {
  const units = await db.getEnrichedBookableUnits();
  const unit = units.find(u => u.id === req.params.id);
  if (!unit) return res.status(404).json({ success: false, error: 'Bookable Unit not found' });
  res.json({ success: true, data: unit });
}));

// Helper to verify an attribute value has meaningful content (never save false or empty null values)
function hasMeaningfulAttributeValue(val) {
  if (!val || !val.attributeId) return false;
  if (val.isEnabled === false) return false;
  
  if (val.valueNumber !== null && val.valueNumber !== undefined && val.valueNumber !== '' && !isNaN(Number(val.valueNumber))) {
    return true;
  }
  // Boolean is meaningful only when true (unchecked amenities should not be stored as false in EAV)
  if (val.valueBoolean === true) {
    return true;
  }
  if (typeof val.valueString === 'string' && val.valueString.trim() !== '') {
    return true;
  }
  if (typeof val.valueDate === 'string' && val.valueDate.trim() !== '') {
    return true;
  }
  if (typeof val.valueJson === 'string' && val.valueJson.trim() !== '') {
    return true;
  }
  if (typeof val.optionId === 'string' && val.optionId.trim() !== '') {
    return true;
  }
  return false;
}

// Create or update a BookableUnit with its dynamic attribute values in one transaction
router.post('/bookable-units', asyncHandler(async (req, res) => {
  const { translations, attributeValues, ...unitData } = req.body;
  const createdUnit = await db.create('BookableUnit', unitData, translations);

  // If dynamic attribute values are provided, only save meaningful non-empty values
  if (Array.isArray(attributeValues)) {
    const validVals = attributeValues.filter(hasMeaningfulAttributeValue);
    for (const val of validVals) {
      await db.create('BookableUnitAttributeValue', {
        ...val,
        unitId: createdUnit.id
      });
    }
  }

  const enriched = (await db.getEnrichedBookableUnits()).find(u => u.id === createdUnit.id);
  res.json({ success: true, data: enriched });
}));

router.put('/bookable-units/:id', asyncHandler(async (req, res) => {
  const { translations, attributeValues, ...unitData } = req.body;
  const updatedUnit = await db.update('BookableUnit', req.params.id, unitData, translations);

  // Update attribute values if supplied
  if (Array.isArray(attributeValues)) {
    const validIncoming = attributeValues.filter(hasMeaningfulAttributeValue);
    const validIncomingAttrIds = new Set(validIncoming.map(v => v.attributeId));

    const existingVals = await db.getAll('BookableUnitAttributeValue');
    const unitVals = existingVals.filter(v => v.unitId === req.params.id);

    // 1. Delete any previous attribute values that are no longer assigned / included
    for (const existingVal of unitVals) {
      if (!validIncomingAttrIds.has(existingVal.attributeId)) {
        await db.delete('BookableUnitAttributeValue', existingVal.id);
      }
    }

    // 2. Upsert valid incoming attributes
    for (const val of validIncoming) {
      const match = unitVals.find(v => v.attributeId === val.attributeId);
      if (match) {
        await db.update('BookableUnitAttributeValue', match.id, {
          ...val,
          unitId: req.params.id
        });
      } else {
        await db.create('BookableUnitAttributeValue', {
          ...val,
          unitId: req.params.id
        });
      }
    }
  }

  const enriched = (await db.getEnrichedBookableUnits()).find(u => u.id === req.params.id);
  res.json({ success: true, data: enriched });
}));

router.delete('/bookable-units/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('BookableUnit', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

/* ========================================================
   6. DYNAMIC EAV SPECIFICATION ENGINE
   ======================================================== */
router.get('/eav-schema', asyncHandler(async (req, res) => {
  const schema = await db.getEAVSchema();
  res.json({ success: true, data: schema });
}));

// Attribute Groups
router.post('/attribute-groups', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const created = await db.create('AttributeGroup', data, translations);
  res.json({ success: true, data: created });
}));

router.put('/attribute-groups/:id', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const updated = await db.update('AttributeGroup', req.params.id, data, translations);
  res.json({ success: true, data: updated });
}));

router.delete('/attribute-groups/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('AttributeGroup', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

// Attribute Definitions (with optional inline options if ENUM)
router.post('/attribute-definitions', asyncHandler(async (req, res) => {
  const { translations, options, ...data } = req.body;
  const createdDef = await db.create('AttributeDefinition', data, translations);

  // If ENUM and options provided, create options
  if (data.valueType === 'ENUM' && Array.isArray(options)) {
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      if (opt.value) {
        await db.create('AttributeOption', {
          attributeId: createdDef.id,
          value: opt.value,
          icon: opt.icon || null,
          sortOrder: opt.sortOrder !== undefined ? opt.sortOrder : i + 1,
          isActive: opt.isActive !== undefined ? opt.isActive : true
        }, opt.translations || null);
      }
    }
  }

  const schema = await db.getEAVSchema();
  const enriched = schema.definitions.find(d => d.id === createdDef.id);
  res.json({ success: true, data: enriched });
}));

router.put('/attribute-definitions/:id', asyncHandler(async (req, res) => {
  const { translations, options, ...data } = req.body;
  const updatedDef = await db.update('AttributeDefinition', req.params.id, data, translations);

  // If ENUM and options provided, synchronize
  if (data.valueType === 'ENUM' && Array.isArray(options)) {
    const existingOpts = await db.getAll('AttributeOption');
    const curOpts = existingOpts.filter(o => o.attributeId === req.params.id);

    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      if (!opt.value) continue;
      const match = curOpts.find(o => o.id === opt.id || o.value === opt.value);
      if (match) {
        await db.update('AttributeOption', match.id, {
          attributeId: req.params.id,
          value: opt.value,
          icon: opt.icon || null,
          sortOrder: opt.sortOrder !== undefined ? opt.sortOrder : i + 1,
          isActive: opt.isActive !== undefined ? opt.isActive : true
        }, opt.translations || null);
      } else {
        await db.create('AttributeOption', {
          attributeId: req.params.id,
          value: opt.value,
          icon: opt.icon || null,
          sortOrder: opt.sortOrder !== undefined ? opt.sortOrder : i + 1,
          isActive: opt.isActive !== undefined ? opt.isActive : true
        }, opt.translations || null);
      }
    }
  }

  const schema = await db.getEAVSchema();
  const enriched = schema.definitions.find(d => d.id === req.params.id);
  res.json({ success: true, data: enriched });
}));

router.delete('/attribute-definitions/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('AttributeDefinition', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

// Attribute Options
router.post('/attribute-options', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const created = await db.create('AttributeOption', data, translations);
  res.json({ success: true, data: created });
}));

router.put('/attribute-options/:id', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const updated = await db.update('AttributeOption', req.params.id, data, translations);
  res.json({ success: true, data: updated });
}));

router.delete('/attribute-options/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('AttributeOption', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

// Bookable Unit Types
router.get('/bookable-unit-types', asyncHandler(async (req, res) => {
  const types = await db.getAll('BookableUnitType');
  res.json({ success: true, data: types });
}));

router.post('/bookable-unit-types', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const created = await db.create('BookableUnitType', data, translations);
  res.json({ success: true, data: created });
}));

router.put('/bookable-unit-types/:id', asyncHandler(async (req, res) => {
  const { translations, ...data } = req.body;
  const updated = await db.update('BookableUnitType', req.params.id, data, translations);
  res.json({ success: true, data: updated });
}));

router.delete('/bookable-unit-types/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('BookableUnitType', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

// Unit Type Attribute Mapper
router.post('/unit-type-attributes/save-matrix', asyncHandler(async (req, res) => {
  const { unitTypeId, attributes } = req.body; // attributes: array of { attributeId, isRequired, isFilterable, isDisplayable, sortOrder, isAssigned }
  const existing = await db.getAll('UnitTypeAttribute');
  const unitMappings = existing.filter(m => m.unitTypeId === unitTypeId);

  for (const attr of attributes) {
    const match = unitMappings.find(m => m.attributeId === attr.attributeId);
    if (attr.isAssigned) {
      const payload = {
        unitTypeId,
        attributeId: attr.attributeId,
        isRequired: Boolean(attr.isRequired),
        isFilterable: attr.isFilterable !== undefined ? Boolean(attr.isFilterable) : null,
        isDisplayable: attr.isDisplayable !== undefined ? Boolean(attr.isDisplayable) : true,
        sortOrder: attr.sortOrder || 0
      };
      if (match) {
        await db.update('UnitTypeAttribute', match.id, payload);
      } else {
        await db.create('UnitTypeAttribute', payload);
      }
    } else if (match) {
      await db.delete('UnitTypeAttribute', match.id);
    }
  }

  const schema = await db.getEAVSchema();
  res.json({ success: true, data: schema.unitTypeAttributes });
}));

/* ========================================================
   7. LOCALIZATION & TRANSLATIONS
   ======================================================== */
router.get('/languages', asyncHandler(async (req, res) => {
  const langs = await db.getAll('Language');
  res.json({ success: true, data: langs });
}));

router.post('/languages', asyncHandler(async (req, res) => {
  const created = await db.create('Language', req.body);
  res.json({ success: true, data: created });
}));

router.put('/languages/:id', asyncHandler(async (req, res) => {
  const updated = await db.update('Language', req.params.id, req.body);
  res.json({ success: true, data: updated });
}));

router.delete('/languages/:id', asyncHandler(async (req, res) => {
  const cascade = req.query.cascade === 'true';
  const result = await db.delete('Language', req.params.id, cascade);
  res.json({ success: true, ...result });
}));

router.get('/translations', asyncHandler(async (req, res) => {
  const translations = await db.getAll('Translation');
  const { entityType, entityId, languageCode } = req.query;

  let filtered = translations;
  if (entityType) filtered = filtered.filter(t => t.entityType === entityType);
  if (entityId) filtered = filtered.filter(t => t.entityId === entityId);
  if (languageCode) filtered = filtered.filter(t => t.languageCode === languageCode);

  res.json({ success: true, data: filtered });
}));

router.post('/translations', asyncHandler(async (req, res) => {
  const created = await db.create('Translation', req.body);
  res.json({ success: true, data: created });
}));

router.put('/translations/:id', asyncHandler(async (req, res) => {
  const updated = await db.update('Translation', req.params.id, req.body);
  res.json({ success: true, data: updated });
}));

router.delete('/translations/:id', asyncHandler(async (req, res) => {
  const result = await db.delete('Translation', req.params.id);
  res.json({ success: true, ...result });
}));

/* ========================================================
   8. RAW GENERIC SHEET EXPLORER
   ======================================================== */
router.get('/sheets/:sheetName', asyncHandler(async (req, res) => {
  const { sheetName } = req.params;
  if (!SHEETS.includes(sheetName)) {
    return res.status(404).json({ success: false, error: `Invalid sheet name: ${sheetName}` });
  }
  const rows = await db.getAll(sheetName);
  res.json({
    success: true,
    sheetName,
    columns: SHEET_COLUMNS[sheetName],
    rowCount: rows.length,
    data: rows
  });
}));

router.post('/sheets/:sheetName', asyncHandler(async (req, res) => {
  const { sheetName } = req.params;
  if (!SHEETS.includes(sheetName)) {
    return res.status(404).json({ success: false, error: `Invalid sheet name: ${sheetName}` });
  }
  const { translations, ...data } = req.body;
  const created = await db.create(sheetName, data, translations);
  res.json({ success: true, data: created });
}));

router.put('/sheets/:sheetName/:id', asyncHandler(async (req, res) => {
  const { sheetName, id } = req.params;
  if (!SHEETS.includes(sheetName)) {
    return res.status(404).json({ success: false, error: `Invalid sheet name: ${sheetName}` });
  }
  const { translations, ...data } = req.body;
  const updated = await db.update(sheetName, id, data, translations);
  res.json({ success: true, data: updated });
}));

router.delete('/sheets/:sheetName/:id', asyncHandler(async (req, res) => {
  const { sheetName, id } = req.params;
  if (!SHEETS.includes(sheetName)) {
    return res.status(404).json({ success: false, error: `Invalid sheet name: ${sheetName}` });
  }
  const cascade = req.query.cascade === 'true';
  const result = await db.delete(sheetName, id, cascade);
  res.json({ success: true, ...result });
}));

module.exports = router;
