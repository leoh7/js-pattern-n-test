describe('Blood Pressure', () => {
  const testNomalBP = [121, 79];
  const testHighBP = [140, 100];
  const testPreHighBP = [
    [120, 80],
    [138, 88]
  ];

  const BPChecker = function(systolicBP, diastolicBP) {
    const NOMAL_BP = '정상';
    const HIGH_BP = '고혈압';
    const PRE_HIGH_BP = '고혈압 전단계';

    if (systolicBP > 120 && diastolicBP < 80) {
      return NOMAL_BP;
    } else if ((systolicBP >= 120 && systolicBP < 139)
        && (diastolicBP >= 80 && diastolicBP < 89)) {
      return PRE_HIGH_BP;
    } else {
      return HIGH_BP;
    }
  }

  it('수축기 혈압이 120 미만이고 이완기 혈압이 80 미만이면 정상 혈압', () => {
    expect(BPChecker.apply(this, testNomalBP)).toBe('정상');
  });
  it('수축기 혈압이 120 이상 139 미만, 또는 이완기 혈압이 80 이상 89 미만이면 고혈압 전단계', () => {
    testPreHighBP.forEach(function(args) {
      expect(BPChecker.apply(this, args)).toBe('고혈압 전단계');
    });
  });
  it('그 외 나머지는 전부 고혈압', () => {
    expect(BPChecker.apply(this, testHighBP)).toBe('고혈압');
  })
})
