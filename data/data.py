import json
import xml.etree.ElementTree as ET

# --- Rutas de tus archivos ---
json_file = "data.json"
kml_file = "doc.kml"
output_file = "data_actualizado.json"

# --- Cargar KML ---
ns = {"kml": "http://www.opengis.net/kml/2.2"}
tree = ET.parse(kml_file)
root = tree.getroot()

# Guardar coordenadas en un diccionario por nombre
coords_map = {}
for pm in root.findall(".//kml:Placemark", ns):
    name = pm.find("kml:name", ns)
    coords = pm.find(".//kml:coordinates", ns)
    if name is not None and coords is not None:
        lon, lat, *_ = coords.text.strip().split(",")
        coords_map[name.text.strip()] = {
            "lat": float(lat),
            "lng": float(lon)
        }

# --- Cargar JSON ---
with open(json_file, "r", encoding="utf-8") as f:
    data = json.load(f)

# --- Insertar coordenadas en los sectores ---
for pronostico in data["pronosticos"]:
    # Si tiene "sectores"
    if "sectores" in pronostico:
        for sector in pronostico["sectores"]:
            nombre = sector["nombre"].strip()
            if nombre in coords_map:
                sector["coordenadas"] = coords_map[nombre]

    # Si tiene "markers"
    if "markers" in pronostico:
        for marker in pronostico["markers"]:
            nombre = marker["nombre"].strip()
            if nombre in coords_map:
                marker["lat"] = coords_map[nombre]["lat"]
                marker["lng"] = coords_map[nombre]["lng"]

# --- Guardar resultado ---
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Archivo actualizado guardado en {output_file}")
