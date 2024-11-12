let dailyAmount = 0;
let totalDays = 0;
let currentDay = 0;
let totalSavings = 0;

// عرض نافذة الترحيب عند تحميل التطبيق
window.onload = function() {
    loadSavings(); // استرجاع البيانات المخزنة
    document.getElementById('welcomeModal').style.display = 'block';
}

// بدء عملية الادخار
function startSavings() {
    dailyAmount = parseFloat(document.getElementById('dailyAmount').value) || 0;
    totalDays = parseInt(document.getElementById('totalDays').value) || 0;

    // إعادة تعيين القيم
    currentDay = 0;
    totalSavings = 0;

    // حفظ القيم الجديدة
    saveSavings();
    updateDisplay();
    closeModal();
}

// إضافة المبلغ اليومي
function addSavings() {
    if (currentDay < totalDays) {
        currentDay++;
        totalSavings += dailyAmount;
        
        // حفظ البيانات بعد الإضافة
        saveSavings();
        updateDisplay();
        checkGoalCompletion();
    }
}

// تحديث العرض
function updateDisplay() {
    document.getElementById('day').innerText = currentDay;
    document.getElementById('totalSavings').innerText = totalSavings;
    document.getElementById('remainingAmount').innerText = Math.max(0, (dailyAmount * totalDays) - totalSavings);
    document.getElementById('progress').style.width = ((totalSavings / (dailyAmount * totalDays)) * 100) + '%';
}

// التحقق من إكمال الهدف
function checkGoalCompletion() {
    if (totalSavings >= dailyAmount * totalDays) {
        document.getElementById('celebrationMessage').classList.remove('hidden');
    }
}

// إعادة تعيين الادخار
function resetSavings() {
    dailyAmount = 0;
    totalDays = 0;
    currentDay = 0;
    totalSavings = 0;

    // حذف البيانات المخزنة
    localStorage.removeItem('savingsData');
    updateDisplay();
    document.getElementById('celebrationMessage').classList.add('hidden');
}

// حفظ البيانات
function saveSavings() {
    const savingsData = {
        dailyAmount: dailyAmount,
        totalDays: totalDays,
        currentDay: currentDay,
        totalSavings: totalSavings
    };
    localStorage.setItem('savingsData', JSON.stringify(savingsData));
}

// استرجاع البيانات المخزنة
function loadSavings() {
    const savedData = localStorage.getItem('savingsData');
    if (savedData) {
        const { dailyAmount: savedDailyAmount, totalDays: savedTotalDays, currentDay: savedCurrentDay, totalSavings: savedTotalSavings } = JSON.parse(savedData);
        dailyAmount = savedDailyAmount;
        totalDays = savedTotalDays;
        currentDay = savedCurrentDay;
        totalSavings = savedTotalSavings;

        updateDisplay();
    }
}

// إغلاق نافذة الترحيب
function closeModal() {
    document.getElementById('welcomeModal').style.display = 'none';
}
