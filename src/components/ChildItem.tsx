import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import { Child } from "../types";
import { useCallback, useState } from "react";
import { useCheckin, useCheckout } from "../hooks/child-hooks";
import classNames from "classnames";

export const ChildItem = ({ child }: { child: Child }) => {
  const [open, setOpen] = useState(false);
  const checkIn = useCheckin(child.childId);
  const checkOut = useCheckout(child.childId);

  const mutationHandler = useCallback(() => {
    const mutation = child.checkedIn ? checkOut : checkIn;
    mutation.mutate();
  }, [checkIn, checkOut, child.checkedIn]);

  const {
    name: { fullName },
  } = child;

  return (
    <Dialog.Root
      onOpenChange={() => {
        setOpen((open) => !open);
      }}
      open={open}
    >
      <Dialog.Trigger asChild>
        <li
          className={classNames(
            "shadow-md even:bg-gray-300 odd:bg-gray-200  px-6 py-4 flex items-center justify-between uppercase text-3xl text-gray-600 font-semibold rounded-lg border-gray-200 cursor-pointer border-solid border-2",
            child.checkedIn && "odd:bg-green-100/80 even:bg-green-200/80"
          )}
          aria-roledescription="button"
        >
          {fullName}
          {child.checkedIn && <span>CHECKED IN</span>}
        </li>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 fixed inset-0" />
        <Dialog.Content className="bg-white rounded-lg shadow-md fixed top-1/2 left-1/2 min-w-[360px] max-w-[1024px] max-h-[85vh] p-4 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="m-0 font-semibold text-gray-600 text-lg">
            {fullName}
          </Dialog.Title>
          <Dialog.Description className="mt-1 mb-2 mx-0 text-gray-600 text-md flex justify-between items-center">
            <span>Checked In: </span>
            <Switch.Root
              onCheckedChange={() => {
                mutationHandler();
              }}
              checked={child.checkedIn}
              className="w-[48px] h-[24px] bg-gray-700/75 rounded-full relative shadow-sm [&[data-state='checked']]:bg-green-500"
            >
              <Switch.Thumb className="block w-[22px] h-[22px] bg-white rounded-full shadow-sm translate-x-[2px] [&[data-state='checked']]:translate-x-[25px]" />
            </Switch.Root>
          </Dialog.Description>
          <Dialog.Close asChild>
            <button
              className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-blue-900 absolute top-[10px] right-[10px] text-lg pb-[2px] border-gray-600 pt-[-2px]"
              aria-label="Close"
            >
              &#10799;
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
