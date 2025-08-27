import json
import xml.etree.ElementTree as ET
from pathlib import Path
kml_path = Path("doc.kml")
json_path = Path("data.json")
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)
tree = ET.parse(kml_path)
root = tree.getroot()
ns = {'kml': 'http://www.opengis.net/kml/2.2'}
coords_map = {}
for placemark in root.findall('.//kml:Placemark', ns):
    name_elem = placemark.find('.//kml:name', ns)
    coords_elem = placemark.find('.//kml:coordinates', ns)

    if name_elem is not None and coords_elem is not None:
        name = name_elem.text.strip()
        coords = coords_elem.text.strip().replace('\n', ' ').split()
        coords = [c for c in coords if c.strip()]
        coords = coords[0].split(',')  # Asegurarse de que esté separado por coma
        if len(coords) >= 2:
            sector_id = name.split('_')[0]  # Extrae el ID, por ejemplo "CL06MJN02"
            coords_map[sector_id] = {
                "lng": float(coords[0]),
                "lat": float(coords[1]),
                "alt": float(coords[2]) if len(coords) > 2 else 0
            }
updated_count = 0
for pronostico in data.get("pronosticos", []):
    for sector in pronostico.get("sectores", []):
        sector_id = sector.get("id")
        if sector_id in coords_map:
            sector["coordenadas"] = coords_map[sector_id]
            updated_count += 1
            print(f"✅ Actualizado: {sector_id} -> {coords_map[sector_id]}")
        else:
            print(f"⚠️ No se encontró coordenada para: {sector_id}")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\n✅ Proceso completado. {updated_count} sectores actualizados.")