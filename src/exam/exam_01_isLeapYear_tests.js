describe('윤년 판정기', () => {
  var testLeapYear = true;
  var TestNomalYear = false;
  
  var isLeapYear = function(year) {
    var leapYear = true;
    var nomalYear = false;
    if( (year % 400 === 0)
      || (year % 4 === 0) 
      && (year % 100 !== 0) ) {      
      return leapYear;
    };
    return nomalYear;
  };

  it('4로 나누어 떨어지는 해는 윤년이다', () => {
    expect(isLeapYear(2020)).toBe(testLeapYear);
  });
  
  it('4로 나누어 떨어지지만 100으로 나누어 떨어지는 해는 평년이다', () => {
    expect(isLeapYear(200)).toBe(TestNomalYear);
  });

  it('단, 400으로 나누어 떨어지는 해는 윤년으로 한다', () => {
    expect(isLeapYear(400)).toBe(testLeapYear);
  });
});
