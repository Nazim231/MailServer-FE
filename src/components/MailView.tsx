import { makeGetRequest } from '@/utils/axios';
import { Mail, ApiSuccessResponse } from '@/utils/types';
import { Loader2, InboxIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function MailView({ mailId }: { mailId: number | null }) {
  const [mail, setMail] = useState<Mail | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!mailId) {
        setMail(null);
      } else {
        const apiResponse = await makeGetRequest(`/emails/${mailId}`);
        if (apiResponse.success) setMail((apiResponse as ApiSuccessResponse).data.email);
      }
      setLoading(false);
    })();
  }, [mailId]);

  return (
    <div className="w-[calc(4.5/6*100%)]">
      {isLoading ? (
        <div className="h-auto p-4 grid place-items-center">
          <Loader2 className="animate-spin text-gray-500" />
        </div>
      ) : mail ? (
        <div className="p-4">
          <h1 className="text-xl font-semibold">{mail.subject}</h1>
          <p className="text-sm text-gray-500">{mail.from_name}</p>
          <p className="text-xs text-gray-400">{new Date(mail.created_at).toDateString()}</p>
          <div className="mt-4">{mail.body_html}</div>
        </div>
      ) : (
        <div className="h-full w-full p-4 grid place-items-center">
          <div className='flex flex-col items-center justify-center'>
              <h1 className="text-gray-300">Select a mail to view</h1>
          </div>
        </div>
      )}
    </div>
  );
}
