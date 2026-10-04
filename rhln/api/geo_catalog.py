"""Catalog of supported jurisdictions across the 3 states and 10 cities."""

JURISDICTION_CATALOG = [
    # California
    {"id": "ca", "level": "state", "name": "California", "state": "CA", "in_scope": True},
    {"id": "ca-la", "level": "city", "name": "Los Angeles, CA", "state": "CA", "in_scope": True},
    {"id": "ca-sf", "level": "city", "name": "San Francisco, CA", "state": "CA", "in_scope": True},
    {"id": "ca-sd", "level": "city", "name": "San Diego, CA", "state": "CA", "in_scope": True},
    {"id": "ca-berkeley", "level": "city", "name": "Berkeley, CA", "state": "CA", "in_scope": True},
    {"id": "ca-santa-ana", "level": "city", "name": "Santa Ana, CA", "state": "CA", "in_scope": True},
    # New Jersey
    {"id": "nj", "level": "state", "name": "New Jersey", "state": "NJ", "in_scope": True},
    {"id": "nj-jersey-city", "level": "city", "name": "Jersey City, NJ", "state": "NJ", "in_scope": True},
    {"id": "nj-hoboken", "level": "city", "name": "Hoboken, NJ", "state": "NJ", "in_scope": True},
    {"id": "nj-newark", "level": "city", "name": "Newark, NJ", "state": "NJ", "in_scope": True},
    # Massachusetts
    {"id": "ma", "level": "state", "name": "Massachusetts", "state": "MA", "in_scope": True},
    {"id": "ma-boston", "level": "city", "name": "Boston, MA", "state": "MA", "in_scope": True},
    {"id": "ma-cambridge", "level": "city", "name": "Cambridge, MA", "state": "MA", "in_scope": True},
]
