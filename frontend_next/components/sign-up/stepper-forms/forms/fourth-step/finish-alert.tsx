import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@frontend_next/components/ui/alert-dialog";

interface FinishAlertProps {
  isOpen: boolean;
  onFinish: () => void;
}

export const FinishAlert: React.FC<FinishAlertProps> = ({
  isOpen,
  onFinish,
}) => {
  useEffect(() => {
    let timer: number;
    if (isOpen) {
      timer = window.setTimeout(() => {
        onFinish();
      }, 2000);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [isOpen, onFinish]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Регистрация завершена</AlertDialogTitle>
          <AlertDialogDescription>
            Вы успешно завершили регистрацию. Сейчас вы будете перенаправлены на
            страницу профиля.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
