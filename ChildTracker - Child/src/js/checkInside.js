export default checkInside = () => {
  boolean checkInside(Circle circle, double longitude, double latitude) {
    return calculateDistance(
        circle.getLongitude(), circle.getLatitude(), longitude, latitude
    ) < circle.getRadius();}
}