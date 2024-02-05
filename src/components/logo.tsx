import { GiftIcon } from '@heroicons/react/24/outline';

export default function Logo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <GiftIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[18px]">Handcrafted Heaven</p>
    </div>
  );
}
