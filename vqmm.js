// script.js
const startButton = document.getElementById('startButton');
const randomResultDisplay = document.getElementById('randomResult');
const alertMessage = document.getElementById('alertMessage');
const historyTableBody = document.getElementById('historyTableBody');
const remainingSpinsDisplay = document.getElementById('remainingSpins');
const spinInfo = document.getElementById('spinInfo');
let spins = 2; // Số lượt quay mặc định
const validCodes = ['ABC123', 'DEF456', 'GHI789']; // Mã hợp lệ
const codeUsed = {}; // Lưu trữ số lượt quay của từng mã người dùng
const rewardData = {
    "10": ["XPT123", "YGT456", "ZRT789"],
    "20": ["Chúc bạn may mắn lần sau!"],
    "30": ["Chúc bạn may mắn lần sau!"],
    "40": ["Chúc bạn may mắn lần sau!"],
    "50": ["Chúc bạn may mắn lần sau!"],
    "60": ["Chúc bạn may mắn lần sau!"],
    "70": ["Chúc bạn may mắn lần sau!"],
};

startButton.addEventListener('click', () => {
    const userId = document.getElementById('userId').value;
    const userCode = document.getElementById('userCode').value;

    const userIdPattern = /^\d{10}$/;
    const userCodePattern = /^[A-Za-z]{3}\d{3}$/;

    if (userIdPattern.test(userId) && userCodePattern.test(userCode)) {
        if (validCodes.includes(userCode)) {
            if (!codeUsed[userCode]) {
                codeUsed[userCode] = 0; // Nếu chưa có, tạo mới
            }

            if (codeUsed[userCode] < 2 && spins > 0) { // Mỗi mã chỉ được quay tối đa 2 lần và còn lượt quay
                codeUsed[userCode]++;
                spins--;
                remainingSpinsDisplay.textContent = spins; // Cập nhật số lượt quay còn lại
                spinInfo.classList.remove('hidden'); // Hiển thị phần số lượt quay còn lại
                const randomResult = getRandomResult();

                // Hiển thị kết quả quay
                randomResultDisplay.textContent = randomResult;

                // Lưu vào lịch sử quay
                addHistory(userId, randomResult);

            } else {
                alertMessage.classList.remove('hidden');
                setTimeout(() => {
                    alertMessage.classList.add('hidden');
                }, 3000);
            }
        } else {
            alertMessage.classList.remove('hidden');
            setTimeout(() => {
                alertMessage.classList.add('hidden');
            }, 3000);
        }
    } else {
        alertMessage.classList.remove('hidden');
        setTimeout(() => {
            alertMessage.classList.add('hidden');
        }, 3000);
    }
});

function getRandomResult() {
    const results = ["10", "20", "30", "40", "50", "60", "70"];  // Các số ngẫu nhiên tương ứng với phần thưởng
    const randomIndex = Math.floor(Math.random() * results.length);
    return results[randomIndex];
}

function addHistory(userId, result) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${userId}</td>
        <td>${result}</td>
        <td>${rewardData[result] ? rewardData[result][Math.floor(Math.random() * rewardData[result].length)] : 'Không có mã'}</td>
    `;
    historyTableBody.appendChild(newRow);
}
