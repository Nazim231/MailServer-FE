import { ApiSuccessResponse, MailList } from '@/utils/types';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/shadcn/scroll-area';
import { InboxIcon, Loader2Icon } from 'lucide-react';
import { makeGetRequest } from '@/utils/axios';

export default function AllMail() {
  const [mails, setMails] = useState<MailList[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const apiResponse = await makeGetRequest('/emails');
      if (apiResponse.success) setMails((apiResponse as ApiSuccessResponse).data.emails);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="border-r h-screen w-[calc(1.5/6*100%)]">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold py-1 border border-transparent">Inbox</h1>
      </div>
      {!isLoading ? (
        mails.length > 0 ? (
          <ScrollArea className="p-2">
            {mails.map((mail) => (
              <button className="border rounded-md p-2 w-full hover:bg-gray-50 cursor-pointer mb-2" key={mail.id} data-mail-id={mail.id}>
                <div className="flex items-center justify-between w-full">
                  <p className="font-medium text-sm">{mail.from_name}</p>
                  <p className="text-gray-400 text-xs">{new Date(mail.created_at).toDateString()}</p>
                </div>
                <p className="text-xs text-gray-400 text-left pt-2">{mail.snippet.substring(0, 150)}</p>
              </button>
            ))}
          </ScrollArea>
        ) : (
          <div className="h-[-webkit-fill-available] grid place-items-center">
            <div className="flex gap-2 items-center">
              <InboxIcon size={64} className="text-gray-200" />
              <div>
                <h1 className="font-semibold">No Mails</h1>
                <p className="text-gray-500 text-sm">You have no mails in your inbox.</p>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="h-auto p-4 grid place-items-center">
          <Loader2Icon size={24} className="animate-spin text-gray-200" />
        </div>
      )}
    </div>
  );
}
