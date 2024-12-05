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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>{message}</DialogHeader>
        <DialogFooter>
          <Button onClick={onConfirm} type="submit">
            Yes
          </Button>
          <DialogClose asChild>
            <Button type="submit"> No</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationWindow;
