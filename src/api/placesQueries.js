import GeoPoint from "geopoint";

const google = window.google;

const service = new google.maps.places.PlacesService(
  document.createElement("div")
);

export const getPlaceDetails = (
  placeId,
  fields = [
    "address_components",
    "formatted_address",
    "business_status",
    "formatted_phone_number",
    "opening_hours",
    "utc_offset_minutes",
    "type",
  ]
) =>
  new Promise((resolve, reject) => {
    console.log(
      "[fetch-place-details] Fetching details from Places API",
      placeId
    );
    service.getDetails({ placeId, fields }, (result, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) reject(result);
      resolve(result);
    });
  });

export const getPlacesInBounds = (bounds) =>
  new Promise((resolve, reject) => {
    const googleFormattedBounds = new google.maps.LatLngBounds(
      bounds._southWest,
      bounds._northEast
    );
    const searchCenter = googleFormattedBounds.getCenter();
    const edge = googleFormattedBounds.getNorthEast();

    const origin = new GeoPoint(searchCenter.lat(), searchCenter.lng());
    const destination = new GeoPoint(edge.lat(), edge.lng());

    const radius = origin.distanceTo(destination) * 1000;

    service.nearbySearch(
      { location: searchCenter, radius },
      (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK)
          reject(status);
        resolve(results);
      }
    );
  });
