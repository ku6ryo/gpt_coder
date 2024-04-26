// Validators for the schema
// The spec is in the SchemaSpec.md file.

const validateSchema = (schema: any) => {
  if ("version" in schema === false || "structure" in schema === false) {
    return false;
  }
  if (typeof schema.version !== 'string' || !Array.isArray(schema.structure)) {
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

export const validateVersion = (version: string) => {
  return /^\d+\.\d+\.\d+$/.test(version);
};

const validateStructure = (items: any[]) => {
  return items.every(item => {
    if (typeof item.transform !== 'object' || typeof item.rotation !== 'object' || typeof item.transform.x !== 'number' || typeof item.transform.y !== 'number' || typeof item.transform.z !== 'number' || typeof item.rotation.x !== 'number' || typeof item.rotation.y !== 'number' || typeof item.rotation.z !== 'number') {
      return false;
    }
    if (item.assetId && typeof item.assetId !== 'string') {
      return false;
    }
    if (item.assetId && item.children) {
      return false;
    }
    if (!item.assetId && !item.children) {
      return false;
    }
    if (item.children && !validateStructure(item.children)) {
      return false;
    }
    return true;
  });
};

export { validateSchema, validateStructure };