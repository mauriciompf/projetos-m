import { useTimeGeoContext } from "../../context/TimeGeoContext";
export default function CurrentLocation() {
  const { geoData } = useTimeGeoContext();

  return (
    geoData && (
      <p>{`${geoData.city || "Unknown City"}, ${geoData.region || "Unknown Region"}, ${geoData.country || "Unknown Country"}`}</p>
    )
  );
}
