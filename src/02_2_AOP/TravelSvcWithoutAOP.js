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

  // 간단한 캐싱: 인덱스는 공항이고 객체는 티켓이다.
  var cache = [];

  return {
    getSuggestedTicket: function(homeAirport) {
      // 고객이 전체 콘퍼런스에 참가할 수 있게
      // 해당 지역의 공항에서 가장 저렴한 항공권을 조회한다.
      var ticket;

      // 공항이 바뀌지 않으면 이전에 캐싱해 둔 정보를 찾을 수 있다.
      if (cache[homeAirport]) {
        return cache[homeAirport];
      }

      ticket = rawWebService.getCheapestRoundTrip(
        homeAirport, conferenceAirport,
        maxArrival, minDeparture
      );

      cache[homeAirport] = ticket;

      return ticket;
    }
  };
})();

// 광고 정보를 가져온다
TravelService.getSuggestedTicket(attendee.homeAirport);

/**
 * 작동은 되지만 getSuggestedTicket 코드가 갑절로 불어났다.
 * 핵심 기능과 전혀 무관한 코드가 많이 보인다.
 * 만약 10분 후 캐시한 결과를 만료시키는 식으로 캐싱 전략이 바뀌면?
 * 만약 추가기능(사용자가 원하는 옵션을 쿠키에 저장)이 방해받는 방향으로 연결되면?
 * 이런 일들을 애스팩트 지향 프로그래밍으로 할 수 있다.
 * AOP 프레임워크로 개발하면 원본 코드를 건드리지 않은 채 애플리케이션 시동 로직에 코드를 넣을 수 있다.
 *  Aop.around('getSuggestedTicket', cacheAspectFactory());
 * cacheAspectFactory() 는 모든 호출을 가로챌 수 있는,
 * 완전히 재사용 가능한 캐싱 함수를 반환하며 똑같은 인자가 들어오면 똑같은 결과를 반환한다.
 */