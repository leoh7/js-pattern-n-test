describe('Aop', () => {
  Aop = {
    around: function(fnName, advice, fnObj) {
      var originalFn = fnObj[fnName];
      fnObj[fnName] = function() {
        var targetContext = {};
        advice.call(targetContext, {fn: originalFn,
                                    args: arguments});
      };
    }
  }
  
  var targetObj,
      executionPoints,
      argPassingAdvice, // 타겟에 인자를 전달할 어드바이스
      argsToTarget;    // targetObj.targetFn에 전달할 인자들

  beforeEach(function() {
    executionPoints = [];
    targetObj = {
      targetFn: function () {
        executionPoints.push('targetFn');
        argsToTarget = Array.prototype.slice.call(arguments, 0);
      }
    }
    argsToTarget = [];
    argPassingAdvice = function(targetInfo) {
      targetInfo.fn.apply(this, targetInfo.args);
    }
  });

  describe('Aop.around(fnName, advice, targetObj)', () => {
    it('타깃 함수를 호출 시, 어드바이스를 실행하도록 한다', () => {
      // 테스트의 신호등 역할
      var excutedAdvice = false;
      var advice = function() {
        excutedAdvice = true;
      };
      Aop.around('targetFn', advice, targetObj);
      targetObj.targetFn();
      expect(excutedAdvice).toBe(true);
    });
    it('어드바이스가 타깃 호출을 래핑한다', () => {
      var wrappingAdvice = function(targetInfo) {
        executionPoints.push('wrappingAdvice - 처음');
        targetInfo.fn();
        executionPoints.push('wrappingAdvice - 끝');
      };
      Aop.around('targetFn', wrappingAdvice, targetObj);
      targetObj.targetFn();      
      expect(executionPoints).toEqual(
        ['wrappingAdvice - 처음', 'targetFn', 'wrappingAdvice - 끝']
      );
    });
    it('마지막 어드바이스가 기존 어드바이스에 대해 실행되는 방식으로 체이닝 할 수 있다', () => {
      var adviceFactory = function(adviceID) {
        return (function(targetInfo) {
          executionPoints.push('wrappingAdvice - 처음 ' + adviceID);
          targetInfo.fn();
          executionPoints.push('wrappingAdvice - 끝 ' + adviceID);
        });
      };
      Aop.around('targetFn', adviceFactory('안쪽'), targetObj);
      Aop.around('targetFn', adviceFactory('바깥쪽'), targetObj);
      targetObj.targetFn();
      
      expect(executionPoints).toEqual([
        'wrappingAdvice - 처음 바깥쪽',
        'wrappingAdvice - 처음 안쪽',
        'targetFn',
        'wrappingAdvice - 끝 안쪽',
        'wrappingAdvice - 끝 바깥쪽'
      ]);
    });
    it('어드바이스에서 타깃으로 일반 인자를 넘길 수 있다', () => {
      Aop.around('targetFn', argPassingAdvice, targetObj);
      targetObj.targetFn('a', 'b');
      expect(argsToTarget).toEqual(['a', 'b']);
    });
    xit('타깃의 반환값도 어드바이스에서 참조할 수 있다', () => {});
    xit('타깃 함수를 해당 객체의 콘텍스트에서 실행한다', () => {});
    xit('어드바이스를 타깃의 콘텍스트에서 실행한다', () => {});
  });
  describe('Aop.next(context, targetInfo)', () => {
    xit('targetInfo.fn에 있는 함수를 호출한다', () => {});
    xit('targetInfo.args에 인자를 전달한다', () => {});
    xit('targetInfo 함수에서 받은 값을 반환한다', () => {});
    xit('주어진 콘텍스트에서 타깃 함수를 실행한다', () => {});
  });
  describe('Aop.before(fnName, advice, targetObj)', () => {
    describe('어드바이스가 성공할 경우', () => {
      xit('타깃 함수를 호출하면 어드바이스를 타깃 다음에 실행한다', () => {});
      xit('어드바이스에 인자를 전달한다', () => {});
      xit('타깃 함수에 인자를 전달한다', () => {});
      xit('마지막 어드바이스를 제일 먼저 실행하는 식으로 체이닝이 가능하다', () => {});
      xit('타깃 함수를 호출하면 일반 값을 반환한다', () => {});
      xit('어드바이스를 타깃의 콘텍스트에서 실행한다', () => {});
    });
    describe('어드바이스에서 예외가 발생할 경우', () => {
      xit('다음 어드바이스는 실행되지 않는다', () => {});
      xit('타깃도 실행되지 않는다', () => {});
    });
  });
  describe('Aop.after(fnName, advice, targetObj)', () => {
    describe('타깃이 성공할 경우', () => {
      xit('타깃 직후에 실행한다', () => {});
      xit('타깃의 인자로 실행한다', () => {});
      xit('타깃의 콘텍스트로 실행한다', () => {});
      xit('타깃의 반환값을 반환한다', () => {});
      xit('최초의 어드바이스가 제일 먼저 실행되는 식으로 체이닝이 가능하다', () => {});
    });
    describe('타깃에서 예외가 발생할 경우', () => {
      xit('실행되지 않는다', () => {});
    });
  });
});
