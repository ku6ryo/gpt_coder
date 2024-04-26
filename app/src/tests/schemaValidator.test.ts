import { validateSchema, validateStructure, validateVersion } from '../utilities/schemaValidator';
import { describe, expect, test } from '@jest/globals';

describe('Schema Validator Tests', () => {
  test('validateVersion should validate versions correctly', () => {
    expect(validateVersion('1.0.0')).toBe(true);
    expect(validateVersion('0.1')).toBe(false);
    expect(validateVersion('1.0.0.0')).toBe(false);
    expect(validateVersion('abc')).toBe(false);
  });

  test('validateStructure should validate structure correctly', () => {
    const validStructure = [{
      transform: { x: 1, y: 1, z: 1 },
      children: []
    }];
    const invalidStructure = [{
      transform: { x: 1, y: 1 }
    }];

    expect(validateStructure(validStructure)).toBe(true);
    expect(validateStructure(invalidStructure)).toBe(false);
  });

  test('validateSchema should validate entire schema correctly', () => {
    const validSchema = {
      version: '1.0.0',
      structure: [{
        transform: { x: 1, y: 1, z: 1 },
        children: [{
          transform: { x: 2, y: 2, z: 2 },
          children: []
        }]
      }]
    };
    const invalidSchema = {
      version: '1.0',
      structure: []
    };

    expect(validateSchema(validSchema)).toBe(true);
    expect(validateSchema(invalidSchema)).toBe(false);
  });
});