'use client';

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { CommandIcon, LinkIcon, TriangleIcon } from "lucide-react";
import toast from "react-hot-toast";

export function Footer() {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
        <div className="flex items-center gap-3">
          <CommandIcon className="sm:block hidden w-5 h-5 text-muted-foreground" />
          <p className="text-center">
            لا تنسونا من دعائكم عن ظهر غيب{" "}
            .قل يارب آتهم من خير ما سألك به عبادك الصالحين{" "}
       
            .
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <FooterButtons />
        </div>
      </div>
    </footer>
  );
}

export function FooterButtons() {

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: 'موقع أذكار',
          url,
        });
        console.log('تمت المشاركة!');
      } catch (error) {
        // toast.error(`خطأ في المشاركة`);
        console.error('خطأ أثناء المشاركة:', error);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        toast.success(`تم النسخ`);
      } catch (error) {
        console.error('فشل في النسخ:', error);
        toast.error('المتصفح لا يدعم النسخ التلقائي.')
      }
    } else {
      // fallback أخير (للإصدارات القديمة)
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      toast.success(`تم النسخ`);
    }
  };
  return (
    <>
      <Link
        href="#"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <TriangleIcon className="h-[0.8rem] w-4 mr-2 text-primary fill-current" />
        نسألكم الدعاء
      </Link>
      <Link
        href="#"
        onClick={handleShare}
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <LinkIcon className="h-4 w-4 mr-2 text-red-600" />
        مشاركة
      </Link>
    </>
  );
}
