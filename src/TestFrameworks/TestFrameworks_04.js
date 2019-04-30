function createReservation(passenger, flight, saver) {
  var reservation = {
    passengerInformation: passenger,
    flightInfomation: flight
  };
  
  saver.saveReservation(reservation);
  return reservation;
}