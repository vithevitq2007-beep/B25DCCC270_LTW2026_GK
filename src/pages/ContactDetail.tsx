import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Contact } from '../types';

interface ContactDetailProps {
  contacts: Contact[];
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contacts }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State phục vụ mô phỏng cuộc gọi (Mục 0 & 2.5)
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [callEndedMsg, setCallEndedMsg] = useState<string | null>(null);

  // Bộ đếm thời gian khi đang gọi, dừng hẳn khi rời khỏi trang
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isCalling) {
      timer = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isCalling]);

  const handleStartCall = () => {
    setSeconds(0);
    setIsCalling(true);
    setCallEndedMsg(null);
  };

  const handleEndCall = () => {
    setIsCalling(false);
    setCallEndedMsg(`Cuộc gọi kết thúc sau ${seconds} giây`);
  };

  const numericId = Number(id);
  const contact = contacts.find((c) => c.id === numericId);

  if (!contact) {
    return (
      <div>
        <p>Không tìm thấy liên hệ</p>
        <button type="button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  const { name, phone, email, group, favorite } = contact;

  return (
    <div>
      <h2>Chi tiết liên hệ</h2>
      <div className="detail-item">
        <strong>Họ tên:</strong> {name}
      </div>
      <div className="detail-item">
        <strong>Số điện thoại:</strong> {phone}
      </div>
      <div className="detail-item">
        <strong>Email:</strong> {email}
      </div>
      <div className="detail-item">
        <strong>Nhóm:</strong> {group}
      </div>
      <div className="detail-item">
        <strong>Yêu thích:</strong> {favorite ? 'Có' : 'Không'}
      </div>

      {/* Khu vực mô phỏng gọi điện */}
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        {!isCalling ? (
          <button type="button" onClick={handleStartCall}>
            Gọi
          </button>
        ) : (
          <div>
            <p>Đang gọi... {seconds} giây</p>
            <button type="button" onClick={handleEndCall}>
              Kết thúc
            </button>
          </div>
        )}

        {callEndedMsg && !isCalling && (
          <div style={{ marginTop: '10px', color: '#2e7d32', fontWeight: 'bold' }}>
            {callEndedMsg}
          </div>
        )}
      </div>

      <div>
        <button type="button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default ContactDetail;
