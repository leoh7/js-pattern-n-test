MyApp = {};
MyApp.diContainer = new DiContainer();

MyApp.diContainer.register(
  'Service',      // 웹 서비스를 가리키는 DI 태그
  [],             // 의존성 없음
                  // 인스턴스를 반환하는 함수
  function() {
    return new ConferenceWebSvc();
  }
);

MyApp.diContainer.register(
  'Messenger',
  [],
  function() {
    return new Messenger();
  }
);

MyApp.diContainer.register(
  'AttendeeFactory',
  ['Service', 'Messenger'],
  function(service, messenger) {
    return new Attendee(service, messenger, attendeeId);
  }
);