import React from 'react';
import { Contact } from '../types';

interface HomeProps {
  contacts: Contact[];
}

const Home: React.FC<HomeProps> = ({ contacts }) => {
  const totalContacts = contacts.length;

  // Tính số lượng yêu thích bằng reduce() theo yêu cầu bắt buộc
  const favoriteContacts = contacts.reduce(
    (count, contact) => (contact.favorite ? count + 1 : count),
    0
  );

  // Tính số lượng dùng Gmail bằng reduce()
  const gmailContacts = contacts.reduce(
    (count, contact) =>
      contact.email && contact.email.endsWith('@gmail.com')
        ? count + 1
        : count,
    0
  );

  return (
    <div>
      <h1>Danh bạ</h1>
      <div className="detail-item">
        <strong>Tổng số liên hệ:</strong> {totalContacts}
      </div>
      <div className="detail-item">
        <strong>Số liên hệ yêu thích:</strong> {favoriteContacts}
      </div>
      <div className="detail-item">
        <strong>Số liên hệ dùng Gmail:</strong> {gmailContacts}
      </div>
    </div>
  );
};

export default Home;
