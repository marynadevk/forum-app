import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const options = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  imgSrc: `/images/avatars/avatar${index + 1}.svg`,
}));

type OptionItemProps = {
  option: { id: number; imgSrc: string };
  setSelected: (option: { id: number; imgSrc: string }) => void;
  setIsOpen: (isOpen: boolean) => void;
};

const OptionItem = ({ option, setSelected, setIsOpen }: OptionItemProps) => {
  return (
    <div
      key={option.id}
      className="flex justify-center gap-2 px-4 py-2 hover:bg-neutral-50 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setSelected(option);
        setIsOpen(false);
      }}
    >
      <img
        src={option.imgSrc}
        alt={`avatar ${option.id}`}
        className="w-6 h-6 rounded-full"
      />
    </div>
  )
}

type Props = {
  setAvatar: (avatar: string) => void;
  selectedProps: string | undefined;
};

const SelectAvatar = ({ setAvatar, selectedProps }: Props) => {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  console.log(isOpen);

  useEffect(() => {
    if (selectedProps) {
      setSelected(options.find(opt => opt.imgSrc === selectedProps) || options[0]);
    }
    setAvatar(selected.imgSrc);
  }, [selectedProps, setAvatar]);

  return (
    <div className="relative w-64">
      <button
        className="flex items-center gap-2 justify-center w-28 px-4 py-2 border rounded-lg bg-accent shadow-md"
        onClick={handleClick}
      >
        <img
          src={selected.imgSrc}
          className="w-6 h-6 rounded-full"
          alt="avatar"
        />
        <FaAngleDown />
      </button>
      <div
        id="dropdown"
        className={`absolute w-28 left-0 right-0 mt-2 bg-accent border rounded-lg shadow-md ${
          isOpen ? '' : 'hidden'
        }`}
      >
        {options.map(option => (
          <OptionItem key={option.id} option={option} setSelected={setSelected} setIsOpen={setIsOpen} />
        ))}
      </div>
    </div>
  );
};

export default SelectAvatar;