import { useTimeGeoContext } from "../../context/TimeGeoContext";

export default function CurrentLocation() {
  const { geoData, geoIsLoading } = useTimeGeoContext();

  return (
    !geoIsLoading &&
    geoData && <p>{`${geoData.city}, ${geoData.region}, ${geoData.country}`}</p>
  );
}
