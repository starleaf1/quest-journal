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
    "photo",
    "price_level",
    "rating",
    "utc_offset_minutes",
    "type",
    "url"
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

export const getPlacesInBounds = (bounds, keywords) =>
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
      {
        location: searchCenter,
        radius,
        ...(keywords ? { keywords } : null),
      },
      (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK)
          reject(status);
        resolve(results);
      }
    );
  });

export const searchByText = (bounds, keywords) => new Promise((resolve, reject) => {
  const googleFormattedBounds = new google.maps.LatLngBounds(
    bounds._southWest,
    bounds._northEast
  );
  const searchCenter = googleFormattedBounds.getCenter();
  const edge = googleFormattedBounds.getNorthEast();

  const origin = new GeoPoint(searchCenter.lat(), searchCenter.lng());
  const destination = new GeoPoint(edge.lat(), edge.lng());

  const radius = origin.distanceTo(destination) * 1000;

  const request = {
    location: searchCenter,
    radius,
    query: keywords
  }

  service.textSearch(request, (results, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) reject(status)
    resolve(results)
  })
})
