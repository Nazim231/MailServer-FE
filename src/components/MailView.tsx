import { makeGetRequest } from '@/utils/axios';
import { Mail, ApiSuccessResponse } from '@/utils/types';
import { Loader2, Reply, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './shadcn/button';

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
        <div>
          <div className="flex justify-end items-center border-b px-8 py-4.5 gap-2">
            <Button variant={'ghost'} className="p-1 border size-8 cursor-pointer mb-0.5">
              <Reply size={16} />
            </Button>
            <Button variant={'ghost'} className="p-1 border size-8 cursor-pointer mb-0.5">
              <Trash2 size={16} className="text-destructive" />
            </Button>
          </div>
          <div className="flex justify-between items-center px-4 py-2 gap-8 border-b">
            <h1 className="text-lg font-medium">{mail.subject}</h1>
            <div className="flex justify-left items-center gap-1">
              <p className="text-sm text-gray-500">
                From: {mail.from_name}
                <span className="text-xs italic"> &lt;{mail.from_email}&gt;</span>
              </p>
              <p className="text-xs text-gray-400">at {new Date(mail.created_at).toDateString()}</p>
            </div>
          </div>
          <div className="mt-4 px-4 overflow-y-scroll" dangerouslySetInnerHTML={{ __html: mail.body_html }} />
        </div>
      ) : (
        <div className="h-full w-full p-4 grid place-items-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-gray-300">Select a mail to view</h1>
          </div>
        </div>
      )}
    </div>
  );
}
