function checkCashRegister(price, cash, cid) {
  var total;
  var newVal = 0;
  var moneyArray = [];
  var vari = (cid[1][1] / 0.05).toFixed(2);
  moneyArray.push([cid[0][1] / 0.01, 0.01]);
  moneyArray.push([parseInt(vari), 0.05]);
  moneyArray.push([cid[2][1] / 0.10, 0.10]);
  moneyArray.push([cid[3][1] / 0.25, 0.25]);
  moneyArray.push([cid[4][1] / 1, 1]);
  moneyArray.push([cid[5][1] / 5, 5]);
  moneyArray.push([cid[6][1] / 10, 10]);
  moneyArray.push([cid[7][1] / 20, 20]);
  moneyArray.push([cid[8][1] / 100, 100]);
  var changeOBJ = {
    status: "OPEN", change: []
  };
  var total = 0;
  var status = "";
  for (var i = 0; i < cid.length; i++) {
    total = total + cid[i][1];
  }
  total = total.toFixed(2);
  var changeDiff = cash - price;
  newVal = changeDiff;
  if (changeDiff > total) {
    status = "INSUFFICIENT_FUNDS";
  } else if (changeDiff < total) {
    status = "OPEN";
  } else {
    status = "CLOSED";
  }

  switch (status) {
    case "INSUFFICIENT_FUNDS":
      changeOBJ["status"] = "INSUFFICIENT_FUNDS";
      changeOBJ["change"] = [];
      break;
    case "CLOSED":
      changeOBJ["status"] = "CLOSED";
      changeOBJ["change"] = [...cid];
      break;
    case "OPEN":
      changeOBJ["status"] = "OPEN";
      var req = 0;
      var have = 0;

      for (var i = cid.length - 1; i >= 0; i--) {

        if (newVal > moneyArray[i][1]) {
          req = Math.trunc(newVal / moneyArray[i][1]);
          have = moneyArray[i][0];
          if (have <= req && have !== 0) {
            changeOBJ["change"].push([cid[i][0], have * moneyArray[i][1]]);
            newVal = newVal - have * moneyArray[i][1];
            newVal = newVal.toFixed(2);

          } else if (have >= req && have !== 0) {

            changeOBJ["change"].push([cid[i][0], req * moneyArray[i][1]]);
            newVal = newVal - req * moneyArray[i][1];
            newVal = newVal.toFixed(2);
          } else {
            changeOBJ["status"] = "INSUFFICIENT_FUNDS";
            changeOBJ["change"] = [];
            break;
          }

        }
      }


      break;
  }
  console.log(changeOBJ);
  return changeOBJ;
}

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
