import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';

type Props = {
  onConfirm?: () => void;
  message: string;
};

const ConfirmationWindow = ({ onConfirm, message }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>{message}</DialogHeader>
        <DialogFooter>
          <Button onClick={handleConfirm} type="submit">
            Yes
          </Button>
          <DialogClose asChild>
            <Button type="submit">No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationWindow;