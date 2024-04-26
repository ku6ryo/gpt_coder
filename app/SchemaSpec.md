This is the spec that this server accepts. The spec is for storing 3D contents.

# Overview

```json
{
    "version": "0.0.1",
    "structre": [...] // Hierarchy
}
```

# Version
Common version format in string. Mandatory correct format: x.y.z where x, y, and z are digits (e.g., 1.0.0, 0.0.1).

# 3D structure
The structure has hierarchy like Unity. Each component has transform.

```json
[{
    "transform": {
        "x": 0,
        "y": 1.0,
        "z": 0
    },
    "chlidren": [
        {
            "transform": {
                "x": 2.0,
                "y": -3.0,
                "z": 4.0,
            }
        }
    ]
}]
```