import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Contact } from '../types';

interface ContactDetailProps {
  contacts: Contact[];
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contacts }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default ContactDetail;
