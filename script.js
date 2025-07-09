function getFixedRate(load) {
  if (load <= 2) return 20;
  if (load <= 5) return 50;
  if (load <= 15) return 100;
  if (load <= 25) return 200;
  return 250;
}

function calculateEnergyCharge(units) {
  let charge = 0;
  if (units <= 200) {
    charge += units * 3;
  } else if (units <= 400) {
    charge += 200 * 3 + (units - 200) * 4.5;
  } else if (units <= 800) {
    charge += 200 * 3 + 200 * 4.5 + (units - 400) * 6.5;
  } else if (units <= 1200) {
    charge += 200 * 3 + 200 * 4.5 + 400 * 6.5 + (units - 800) * 7.0;
  } else {
    charge += 200 * 3 + 200 * 4.5 + 400 * 6.5 + 400 * 7.0 + (units - 1200) * 8.0;
  }
  return charge;
}

function calculateBill() {
  const units = parseFloat(document.getElementById("units").value);
  const load = parseFloat(document.getElementById("load").value);
  const ppac = parseFloat(document.getElementById("ppac").value);
  const otherCharges = parseFloat(document.getElementById("other").value);

  if (isNaN(units) || isNaN(load) || isNaN(ppac) || isNaN(otherCharges)) {
    document.getElementById("result").innerText = "Please fill all fields correctly.";
    return;
  }

  const energyCharge = calculateEnergyCharge(units);
  const fixedRate = getFixedRate(load);
  const fixedCharge = load * fixedRate;

  const ppacEnergyCharge = energyCharge * (ppac / 100);
  const ppacFixedCharge = fixedCharge * (ppac / 100);

  const surcharge = (energyCharge + fixedCharge) * 0.08;
  const pensionSurcharge = (energyCharge + fixedCharge) * 0.07;
  const electricityTax = (energyCharge + fixedCharge + ppacEnergyCharge + ppacFixedCharge + surcharge) * 0.05;

  const total = energyCharge + fixedCharge + ppacEnergyCharge + ppacFixedCharge + surcharge + pensionSurcharge + electricityTax + otherCharges;

  document.getElementById("result").innerHTML = `
  <div class="bill-total">Estimated Bill: ₹${total.toFixed(2)}</div>
  <div class="bill-breakdown">
    <b>Breakdown:</b><br>
    Energy Charge: ₹${energyCharge.toFixed(2)}<br>
    Fixed Charge: ₹${fixedCharge.toFixed(2)}<br>
    PPAC on Energy: ₹${ppacEnergyCharge.toFixed(2)}<br>
    PPAC on Fixed: ₹${ppacFixedCharge.toFixed(2)}<br>
    Surcharge (8%): ₹${surcharge.toFixed(2)}<br>
    Pension Surcharge (7%): ₹${pensionSurcharge.toFixed(2)}<br>
    Electricity Tax (5%): ₹${electricityTax.toFixed(2)}<br>
    Other Charges: ₹${otherCharges.toFixed(2)}
  </div>
`;

}
