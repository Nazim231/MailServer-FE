import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/dialog';
import { toast } from 'sonner';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from './shadcn/button';
import { useState } from 'react';
import { ApiErrorResponse, ComposeMail, ComposeMailPayload, Errors } from '@/utils/types';
import { validateComposeMailData } from '@/utils/validator';
import { Input } from '@/components/shadcn/input';
import { makePostRequest } from '@/utils/axios';
import { Loader2 } from 'lucide-react';

export default function Compose({ trigger }: { trigger?: React.ReactNode }) {
  const mailDataInitialState: ComposeMail = { to: '', cc: '', bcc: '', subject: '', body: '' };
  const [mailData, setMailData] = useState<ComposeMail>(mailDataInitialState);
  const [error, setError] = useState<Errors<ComposeMail>>({});
  const [isSending, setIsSending] = useState(false);

  const getToastOptions = () => {
    return {
      className: '!bg-white !border-gray-200',
      classNames: {
        description: '!text-gray-400',
        error: '!text-red-500',
        success: '!text-green-500',
      },
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setMailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMailSend = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setError({});

    const validationResult = validateComposeMailData(mailData);

    if (!validationResult.success) {
      setError(validationResult.error);
      setIsSending(false);
      return;
    }

    // Transforming composed mail to the payload
    const payload: ComposeMailPayload = {
      to_emails: mailData.to.split(',').map((email) => email.trim()),
      cc_emails: mailData.cc ? mailData.cc.split(',').map((email) => email.trim()) : [],
      bcc_emails: mailData.bcc ? mailData.bcc.split(',').map((email) => email.trim()) : [],
      subject: mailData.subject,
      body_html: mailData.body,
      body_text: mailData.body,
    };

    const apiResponse = await makePostRequest('/emails/send', payload);
    if (!apiResponse.success) {
      const description = (apiResponse as ApiErrorResponse).error;
      toast.error('Error sending mail', { description, ...getToastOptions() });
      setIsSending(false);
      return;
    }

    toast.success('Mail Sent', { description: 'Mail Sent Successfully', ...getToastOptions() });
    setMailData(mailDataInitialState);
    setIsSending(false);
    setError({});
  };

  return (
    <Dialog>
      <DialogTrigger className="!focus:outline-none">{trigger}</DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-4">
          <DialogTitle>Compose New Mail</DialogTitle>
          <DialogDescription className="text-sm"></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col text-sm">
          <Input
            type="text"
            value={mailData.to}
            onChange={handleInputChange}
            name="to"
            placeholder="To"
            className="rounded-none border-0 border-t focus-visible:ring-0 focus-visible:border-b !shadow-none"
            aria-invalid={!!error.to}
          />
          {error.to && <span className="text-destructive border-t border-destructive px-2 text-xs">{error.to}</span>}
          <Input
            type="text"
            value={mailData.cc}
            onChange={handleInputChange}
            name="cc"
            placeholder="CC"
            className="rounded-none border-0 border-t focus-visible:ring-0 focus-visible:border-b !shadow-none"
            aria-invalid={!!error.cc}
          />
          {error.cc && <span className="text-destructive border-t border-destructive px-2 text-xs">{error.cc}</span>}
          <Input
            type="text"
            value={mailData.bcc}
            onChange={handleInputChange}
            name="bcc"
            placeholder="BCC"
            className="rounded-none border-0 border-t focus-visible:ring-0 focus-visible:border-b !shadow-none"
            aria-invalid={!!error.bcc}
          />
          {error.bcc && <span className="text-destructive border-t border-destructive px-2 text-xs">{error.bcc}</span>}
          <Input
            type="text"
            value={mailData.subject}
            onChange={handleInputChange}
            name="subject"
            placeholder="Enter subject"
            className="rounded-none border-0 border-t focus-visible:ring-0 focus-visible:border-b !shadow-none"
            aria-invalid={!!error.subject}
          />
          {error.subject && <span className="text-destructive border-t border-destructive px-2 text-xs">{error.subject}</span>}
          <textarea
            name="body"
            value={mailData.body}
            onChange={handleInputChange}
            rows={5}
            placeholder="Enter message body"
            className={`border-t ${error.body && 'border-destructive'} border-b p-2 outline-none focus:outline-none focus:border-gray-400`}
          />
          {error.body && <span className="text-destructive px-2 text-xs">{error.body}</span>}
        </div>
        <DialogFooter className="p-4 flex !justify-between">
          <DialogClose asChild>
            <Button variant={'ghost'}>Cancel</Button>
          </DialogClose>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button
                variant={'secondary'}
                onClick={() => {
                  setMailData(mailDataInitialState);
                  setError({});
                }}
                className="text-destructive"
              >
                Discard
              </Button>
            </DialogClose>
            <Button variant={'default'} onClick={handleMailSend} className="w-32">
              {isSending ? <Loader2 strokeWidth={2} className="text-white animate-spin" /> : 'Send Mail'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
