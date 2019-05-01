/**
 * 항공권 할인 운임 조회 웹 서비스
 * 웹 서비스 호출에 시간이 걸리는 점을
 * 고객이 공항을 바꾸지 않는 한 해당 항공권 정보를 캐시하기로 함.
 * 여기선 캐싱이 횡단 관심사이자 애스팩트 지향 프로그래밍의 유력한 후보자임.
 */

// 콘퍼런스에 해당하는 파라미터를 제공하여
// 여행사의 원래 웹 서비스를 래핑한다.
TravelService = (function(rawWebService) {
  var conferenceAirport = 'BOS';
  var maxArrival = new Date(/* 날짜 */);
  var minDeparture = new Date(/* 날짜 */);

  return {
    getSuggestedTicket: function(homeAirport) {
      // 고객이 전체 콘퍼런스에 참가할 수 있게
      // 해당 지역의 공항에서 가장 저렴한 항공권을 조회한다.
      return rawWebService.getCheapestRoundTrip(
        homeAirport, conferenceAirport,
        maxArrival, minDeparture
      );
    }
  };
})();

// 광고 정보를 가져온다
TravelService.getSuggestedTicket(attendee.homeAirport);