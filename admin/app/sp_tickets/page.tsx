"use client";
import CanAccess from "@admin/components/can-access";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@admin/components/ui/card";
import Link from "next/link";

export default function SpTicketsPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Обращения</h2>
      </div>
      <div className="py-10 grid grid-cols-3 gap-3">
        <CanAccess permission="sp_ticket_categories.list">
          <Link href="/sp_tickets/sp_ticket_categories" legacyBehavior passHref>
            <Card className="cursor-pointer hover:shadow-lg">
              <CardHeader>
                <CardTitle>Категории обращений</CardTitle>
                <CardDescription>
                  Список категорий. Пользователь сможет выбирать одну из них при
                  добавлении обращения
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </CanAccess>
        <CanAccess permission="sp_ticket_statuses.list">
          <Link href="/sp_tickets/sp_ticket_statuses" legacyBehavior passHref>
            <Card className="cursor-pointer hover:shadow-lg">
              <CardHeader>
                <CardTitle>Статусы обращений</CardTitle>
                <CardDescription>
                  Список статусов обращений. Чтобы видеть на какой стадии
                  находится обращение
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </CanAccess>
      </div>
    </div>
  );
}
