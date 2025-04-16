import { useEffect, useState } from 'react';
import AllMail from './AllMail';
import { MailView } from './MailView';
import { Toaster } from '@/components/shadcn/sonner';

export default function Inbox() {
  const [selectedMail, setSelectedMail] = useState<number | null>(null);

  useEffect(() => {
  }, [selectedMail]);

  return (
    <div className="w-5/6 flex">
      <AllMail setSelectedMail={(selectedMailId) => setSelectedMail(selectedMailId)} />
      <MailView mailId={selectedMail}  />
      <Toaster richColors className='z-40' />
    </div>
  );
}
