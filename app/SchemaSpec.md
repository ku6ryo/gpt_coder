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
The structure has hierarchy like Unity. Each component has transform and might have asset ID.
The asset ID can be null for container. The container works as put multiple assets or containers.
Containers have children property even it is an empty array. Object that has assetId must not have children.
The transform consists of x, y, z properties and they MUST be numbers.
The rotation also consists of x, y, z properties representing rotation in degrees and they MUST be numbers.

```json
[{
    "transform": {
        "x": 0,
        "y": 1.0,
        "z": 0
    },
    "rotation": {
        "x": 0,
        "y": 90,
        "z": 180
    },
    "chlidren": [
        {
            "transform": {
                "x": 2.0,
                "y": -3.0,
                "z": 4.0,
            },
            "rotation": {
                "x": 45,
                "y": 30,
                "z": 90
            },
            "assetId": "12345",
        },
        {
            "transform": {
                "x": 2.4,
                "y": 5.0,
                "z": -4.5,
            },
            "rotation": {
                "x": 15,
                "y": 60,
                "z": 120
            },
            "children": []
        }
    ]
}]
```