// {status: "INSUFFICIENT_FUNDS", change: []}
// {status: "CLOSED", change: [...]}
// {status: "OPEN", change: [...]}

function checkCashRegister(price, cash, cid) {
  // know sum of change by subtracting cashTakenFromCustomer from purchashPrice
  const changeRequired = parseFloat(cash - price).toFixed(2);
  const changeRequiredOriginal = changeRequired

  let change = [];
  let status = '';
  // sum of value in the drawer
  const showRegisterInDrawerCount = (changeInDrawer) => {
    const initialCount = 0;
    const changeInDrawerCount = changeInDrawer.reduce(
      (acc, cur) => acc + cur[1],
      initialCount
    );
    return changeInDrawerCount;
  };


  const cashInDrawer = cid.reverse();
  const changeInDrawerCount = showRegisterInDrawerCount(cid);

  const cashRegister = (
    changeRequired,
    changeInDrawer,
    changeInDrawerCount
  ) => {
    let change = [];
    const currencyUnits = {
      PENNY: 0.01,
      NICKEL: 0.05,
      DIME: 0.1,
      QUARTER: 0.25,
      ONE: 1.0,
      FIVE: 5.0,
      TEN: 10.0,
      TWENTY: 20.0,
      'ONE HUNDRED': 100.0,
    };

    cashInDrawer.forEach((curr) => {
      // count current currency
      let currencyInDrawerName = curr[0];
      let currencyInDrawerTotal = curr[1];
      let currencyCurrentValue = currencyUnits[currencyInDrawerName];
      // current amount of currency in the drawer
      let currencyAmount = (
        currencyInDrawerTotal / currencyCurrentValue
      ).toFixed(2);
      let currencyAmountToReturn = 0;

      // checking the change sum to Be (sufficent) or greater than the current change in drawer sum
      while (changeRequired >= currencyCurrentValue && currencyAmount > 0) {
        changeRequired -= currencyCurrentValue;
        changeRequired = changeRequired.toFixed(2);
        currencyAmount--;
        currencyAmountToReturn++;
      }
      if (currencyAmountToReturn > 0) {
        change.push([
          currencyInDrawerName,
          currencyAmountToReturn * currencyCurrentValue,
        ]);
        console.log('currencyCurrentValue: ', currencyCurrentValue);
      }
    });

    console.log('changeInDrawer: ', changeInDrawer);
    if (changeRequired > 0) {
      status = 'INSUFFICIENT_FUNDS';
      change = [];
    } else if (changeRequired == 0 && changeRequiredOriginal == changeInDrawerCount) {
      status = 'CLOSED';
      change = [...changeInDrawer];
    } else {
      status = 'OPEN';
    }

    const shouldBeReversed = status === 'OPEN' ? change : change.reverse();
    console.log('shouldBeReversed: ', shouldBeReversed);
    return { status: status, change: shouldBeReversed };
  };

  return cashRegister(changeRequired, cashInDrawer, changeInDrawerCount);
}

const foo = checkCashRegister(19.5, 20, [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0],
]);

console.log('foo: ', foo);
