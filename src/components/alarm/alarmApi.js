import axios from "axios";


//알림 목록 가져오기기
async function fetchAlarms(userId) {
  const response = await fetch(`/api/alarm?userId=${userId}`);
  const alarms = await response.json();
  return alarms;
}

//새로운 알림 생성
async function createAlarm(userId, message, type) {
  const response = await fetch('/api/alarm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, message, type }),
  });
  const newAlarm = await response.json();
  return newAlarm;
}

//알림 읽음 상태 업데이트
async function markAlarmAsRead(alarmId) {
  const response = await fetch('/api/alarm', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ alarmId }),
  });
  const updatedAlarm = await response.json();
  return updatedAlarm;
}
