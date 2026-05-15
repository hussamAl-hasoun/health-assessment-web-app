/*hussam*/
function startCalculation() {
    var name = document.getElementById('userName').value.trim();
    var h = parseFloat(document.getElementById('height').value);
    var w = parseFloat(document.getElementById('weight').value);
    var age = parseInt(document.getElementById('age').value);
    var act = parseFloat(document.getElementById('activity').value);
    var isDiabetic = document.getElementById('isDiabetic').checked;

    var genders = document.getElementsByName('gender');
    var gender = '';
    for (var i = 0; i < genders.length; i++) {
        if (genders[i].checked) {
            gender = genders[i].value;
            break;
        }
    }

    if (!name || isNaN(h) || isNaN(w) || isNaN(age) || gender === '') {
        alert("Please fill all fields correctly.");
        return;
    }
    if (h <= 0 || w <= 0 || age <= 0 || h > 250 || w > 300 || age < 15 || age > 120) {
        alert("Enter logical values: Height (50-250 cm), Weight (20-300 kg), Age (15-120 years).");
        return;
    }

    var h_m = h / 100;
    var bmi = (w / (h_m * h_m)).toFixed(1);
    var water = (w * 0.033).toFixed(1);
    var cups = Math.round(water * 4);

    var bmr;
    if (gender === 'male') {
        bmr = 10 * w + 6.25 * h - 5 * age + 5;
    } else {
        bmr = 10 * w + 6.25 * h - 5 * age - 161;
    }

    var maintain = Math.round(bmr * act);
    var lose = maintain - 500;
    var gain = maintain + 500;

    document.getElementById('reportTitle').innerHTML = 'Health Report for ' + name;
    document.getElementById('resBMI').innerHTML = bmi;
    document.getElementById('resWater').innerHTML = water + ' L';
    document.getElementById('waterCups').innerHTML = '≈ ' + cups + ' cups';

    var badge = document.getElementById('bmiBadge');
    var dangerAlert = document.getElementById('dangerAlert');
    var bmiAdvice = document.getElementById('bmiAdvice');

    if (bmi < 18.5) {
        badge.innerHTML = 'Underweight';
        badge.style.backgroundColor = '#f39c12';
        badge.style.color = '#000';
        dangerAlert.style.display = 'none';
        bmiAdvice.innerHTML = 'Consider gaining weight healthily under professional guidance.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        badge.innerHTML = 'Normal Weight';
        badge.style.backgroundColor = '#27ae60';
        badge.style.color = '#fff';
        dangerAlert.style.display = 'none';
        bmiAdvice.innerHTML = 'Your weight is in the healthy range. Maintain your active lifestyle.';
    } else if (bmi >= 25 && bmi <= 29.9) {
        badge.innerHTML = 'Overweight';
        badge.style.backgroundColor = '#e67e22';
        badge.style.color = '#fff';
        dangerAlert.style.display = 'none';
        bmiAdvice.innerHTML = 'Caution! Excess weight increases the risk of chronic diseases. Seek advice.';
    } else {
        badge.innerHTML = 'Obesity';
        badge.style.backgroundColor = '#c0392b';
        badge.style.color = '#fff';
        dangerAlert.style.display = 'block';
        bmiAdvice.innerHTML = 'Urgent: Consult a doctor or dietitian to plan a treatment strategy.';
    }

    document.getElementById('calMaintain').innerHTML = maintain + ' kcal/day';
    document.getElementById('calLose').innerHTML = lose + ' kcal/day';
    document.getElementById('calGain').innerHTML = gain + ' kcal/day';

    var diabeticInfo = document.getElementById('diabeticAdvice');
    var gainDiv = document.getElementById('gainDiv');

    if (isDiabetic) {
        diabeticInfo.style.display = 'block';
        gainDiv.style.display = 'none';
    } else {
        diabeticInfo.style.display = 'none';
        gainDiv.style.display = 'list-item';
    }

    document.getElementById('input-section').style.display = 'none';
    document.getElementById('report-section').style.display = 'block';
}

function goBack() {
    document.getElementById('input-section').style.display = 'block';
    document.getElementById('report-section').style.display = 'none';

    document.getElementById('userName').value = '';
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('age').value = '';
    document.getElementById('activity').selectedIndex = 0;
    document.getElementById('isDiabetic').checked = false;

    var genders = document.getElementsByName('gender');
    for (var i = 0; i < genders.length; i++) {
        genders[i].checked = false;
    }
}
