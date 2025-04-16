import { useEffect, useState } from 'react';
import AllMail from './AllMail';
import { MailView } from './MailView';

export default function Inbox() {
  const [selectedMail, setSelectedMail] = useState<number | null>(null);

  useEffect(() => {
    console.log('Selected Mail ID: ', selectedMail);
  }, [selectedMail]);

  return (
    <div className="w-5/6 flex">
      <AllMail setSelectedMail={(selectedMailId) => setSelectedMail(selectedMailId)} />
      <MailView mailId={selectedMail}  />
    </div>
  );
}
