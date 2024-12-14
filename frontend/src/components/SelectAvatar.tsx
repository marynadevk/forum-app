import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const options = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  imgSrc: `/images/avatars/avatar${index + 1}.svg`,
}));

type OptionItemProps = {
  option: { id: number; imgSrc: string };
  onSelect: (option: { id: number; imgSrc: string }) => void;
};

const OptionItem = ({ option, onSelect }: OptionItemProps) => {
  return (
    <div
      className="flex justify-center gap-2 px-4 py-2 hover:bg-neutral-50 cursor-pointer"
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onSelect(option);
      }}
    >
      <img
        src={option.imgSrc}
        alt={`avatar ${option.id}`}
        className="w-6 h-6 rounded-full"
      />
    </div>
  );
};

type Props = {
  setAvatar: (newAvatar: string) => void;
  selectedProps: string | undefined;
};

const SelectAvatar = ({ setAvatar, selectedProps }: Props) => {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: { id: number; imgSrc: string }) => {
    setSelected(option);
    setAvatar(option.imgSrc);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedProps) {
      const matchingOption = options.find((opt) => opt.imgSrc === selectedProps);
      if (matchingOption) {
        setSelected(matchingOption);
      }
    }
  }, [selectedProps]);

  return (
    <div className="relative w-64">
      <button
        className="flex items-center gap-2 justify-center w-28 px-4 py-2 border rounded-lg bg-accent shadow-md"
        onClick={toggleDropdown}
      >
        <img
          src={selected.imgSrc}
          className="w-6 h-6 rounded-full"
          alt="avatar"
        />
        <FaAngleDown />
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="absolute w-28 left-0 right-0 mt-2 bg-accent border rounded-lg shadow-md"
        >
          {options.map((option) => (
            <OptionItem key={option.id} option={option} onSelect={handleSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectAvatar;

