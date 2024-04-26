const requiredSchemaAttributes = ['version', 'structure'];

const validateSchema = (schema: object) => {
  if ("version" in schema === false || "structure" in schema === false) {
    return false;
  }
  if (typeof schema.version !== 'string' || typeof schema.structure !== 'object') {
    return false;
  }
  if (!validateVersion(schema.version)) {
    return false;
  }
  if (!validateStructure(schema.structure)) {
    return false;
  }
  return true;
};

const validateVersion = (version: string) => {
  return /^\d+\.\d+\.\d+$/.test(version);
};

const validateStructure = (items) => {
  return items.every(item => {
    if (typeof item.transform !== 'object' || !item.transform.x || !item.transform.y || !item.transform.z) {
      return false;
    }
    if (item.children && !validateStructure(item.children)) {
      return false;
    }
    return true;
  });
};

export { validateSchema, validateStructure };