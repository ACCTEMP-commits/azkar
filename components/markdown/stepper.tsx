"use client";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import React, { Children, PropsWithChildren, useState } from "react";
import toast from "react-hot-toast";
// type StepperProps = PropsWithChildren<{
//   maxClicks: number; // اختيارية، بقيمة افتراضية مثلاً 3
// }>;
export function Stepper({
  children,
  // maxClicks, // default value
}: PropsWithChildren) {
  const length = Children.count(children);
  
  // const [isOpen, setIsOpen] = useState(() => {
  //   return true;
  // });
  const [clickCounts, setClickCounts] = useState<number[]>(Array(length).fill(0));
  // const maxClicks = 3; // عدد الضغطات المطلوبة لتغيير اللون

  const handleClick = (index: number, requiredClicks: number,isActive:boolean) => {
    if (isActive) {
      return null;
    }
    const updated = [...clickCounts];
    updated[index] = updated[index] + 1;
    if ("vibrate" in navigator) {
      navigator.vibrate(100); // اهتزاز لمدة 200ms
    }

    if (updated[index] >= requiredClicks) {
      toast.success(`أكملت الذكر`);
    }
    setClickCounts(updated);
  };

  return (
    <div className="flex flex-col" 
      >
      {Children.map(children, (child, index) => {
         if (!React.isValidElement(child)) return null;

         const requiredClicks = child.props.clicksRequired
         const isActive = clickCounts[index] >= requiredClicks;
        return (
          <div
            className={cn(
              "border-l pl-12 ml-3 relative pb-1 pr-2 py-3",
              clsx({
                "pb-5 ": index < length - 1,
              })
            )}  onClick={() => handleClick(index,requiredClicks,isActive)}
          >
             <div
              className={cn(
                "w-8 h-8 text-xs font-medium rounded-md border flex items-center justify-center absolute -left-4 font-code",
                isActive ? "bg-green-500 text-white" : "bg-muted"
              )}
            >
              {/* {index + 1} */}
              {Math.max(requiredClicks - clickCounts[index], 0)}
            </div>
            <div className="prose-headings:mt-0 prose-p:mb-3 prose-p:mt-3 last:prose-p:mb-0">
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function StepperItem({
  children,
  title,
  clicksRequired = 3,
}: PropsWithChildren & { title?: string; clicksRequired?: number }) {
  return (
    <div data-clicks-required={clicksRequired} className="pt-0.5">
      <h5 className="mt-0 font-semibold">{title}</h5>
      <div>{children}</div>
    </div>
  );
}