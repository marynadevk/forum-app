import { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const options = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  imgSrc: `/images/avatars/avatar${index + 1}.svg`,
}));

type Props = {
  setAvatar: (avatar: string) => void;
  selected: string | undefined;
};

const SelectAvatar = ({ setAvatar }: Props) => {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setAvatar(selected.imgSrc);
  }, [selected, setAvatar]);

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
      <ul
        id="dropdown"
        className={`absolute w-28 left-0 right-0 mt-2 bg-accent border rounded-lg shadow-md ${
          isOpen ? '' : 'hidden'
        }`}
      >
        {options.map(option => (
          <li
            key={option.id}
            className="flex justify-center gap-2 px-4 py-2 hover:bg-neutral-50 cursor-pointer"
            onClick={() => {
              setSelected(option);
              setIsOpen(false);
            }}
          >
            <img
              src={option.imgSrc}
              alt={`avatar ${option.id}`}
              className="w-6 h-6 rounded-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectAvatar;
