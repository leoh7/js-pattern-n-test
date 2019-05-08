// http://fredrik.appelberg.me/2010/05/07/aop-js.html
// 프레드릭 아펠버그(Fredrik Appelberg)와 데이브 클레이턴(Dave Clayton)의 우아한 프레임워크
// (https://github.com/davedx/aop)

Aop = {
  // 주어진 이름공간에 매칭되는 모든 함수 주변(around)에 어드바이스를 적용한다.
  around: function(pointcut, advice, namespaces) {
    // 이름공간이 없으면 전역 이름공간을 찾아낸다
    if (namespaces == undefined || namespaces.length == 0)
      namespaces = [ (function() {return this;}).call() ];
    // 이름공간을 전부 순회한다
    for (var i in namespaces) {
      var ns = namespaces[i];
      for(var member in ns) {
        if (typeof ns[member] =='function' && member.match(pointcut)) {
          (function(fn, fnName, ns) {
            // member fn 슬롯을 'advice' 함수를 호출하는 래퍼로 교체한다.
            ns[fnName] = function() {
              return advice.call(this, { fn: fn,
                                         fnName: fnName,
                                         arguments: arguments });
            };
          })(ns[member], member, ns);
        }
      }
    }
  },
  next: function(f) {
    return f.fn.apply(this, f.arguments);
  }
};