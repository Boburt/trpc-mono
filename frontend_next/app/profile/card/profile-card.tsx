import React, { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@frontend_next/components/ui/card";
import { Separator } from "@frontend_next/components/ui/separator";
import { Button } from "@frontend_next/components/ui/button";
import {
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  Edit,
  Building,
  Globe,
  Hash,
  DollarSign,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Infer } from "next/dist/compiled/superstruct";
import { memberships, profiles } from "backend/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

const ProfileCard = () => {
  const queryClient = useQueryClient();
  const profile_info: any = queryClient.getQueryData(["profile_info"]);

  console.log("info from card", profile_info);

  const values = useMemo(() => {
    if (
      profile_info &&
      profile_info.data &&
      profile_info.data.profile_data &&
      profile_info.data.membership_data &&
      "email" in profile_info.data.profile_data &&
      "id" in profile_info.data.membership_data
    ) {
      return {
        profile: profile_info.data.profile_data,
        business: profile_info.data.membership_data,
      };
    }
  }, [profile_info]);

  console.log("values", values);

  const user = {
    name: "Иван Иванов",
    email: "ivan@example.com",
    location: "Москва, Россия",
    occupation: "Разработчик программного обеспечения",
    joinDate: "2023-01-15",
  };

  const businessInfo = {
    name: "ТехноИнновации ООО",
    short_name: "ТехИнно",
    description:
      "Ведущая компания в области разработки инновационного программного обеспечения",
    active: true,
    rating: 4.8,
    country: "Россия",
    type: "manufacturer",
    org_type: "company",
    city: "Москва",
    ein: 1234567890,
    address: "ул. Пушкина, д. 10",
    fact_address: "ул. Лермонтова, д. 15, офис 301",
    email: "info@techinnov.ru",
    web_site: "www.techinnov.ru",
    vat: true,
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5 text-muted-foreground" />
      <span className="text-sm font-medium">{label}:</span>
      <span className="text-sm">{value}</span>
    </div>
  );

  return (
    <div className="container mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.occupation}</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Редактировать
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={Mail} label="Email" value={user.email} />
            <InfoItem
              icon={MapPin}
              label="Местоположение"
              value={user.location}
            />
            <InfoItem
              icon={Briefcase}
              label="Должность"
              value={user.occupation}
            />
            <InfoItem
              icon={Calendar}
              label="Дата регистрации"
              value={new Date(user.joinDate).toLocaleDateString()}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Информация о компании</CardTitle>
          <CardDescription>{businessInfo.short_name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem
              icon={Building}
              label="Название"
              value={businessInfo.name}
            />
            <InfoItem
              icon={MapPin}
              label="Местоположение"
              value={`${businessInfo.city}, ${businessInfo.country}`}
            />
            <InfoItem icon={Mail} label="Email" value={businessInfo.email} />
            <InfoItem
              icon={Globe}
              label="Веб-сайт"
              value={businessInfo.web_site}
            />
            <InfoItem icon={Hash} label="EIN" value={businessInfo.ein} />
            <InfoItem
              icon={DollarSign}
              label="VAT"
              value={businessInfo.vat ? "Да" : "Нет"}
            />
            <InfoItem
              icon={Briefcase}
              label="Тип организации"
              value={businessInfo.org_type}
            />
            <InfoItem
              icon={MapPin}
              label="Адрес"
              value={businessInfo.address}
            />
          </div>
          <Separator className="my-4" />
          <div>
            <h3 className="font-semibold mb-2">Описание</h3>
            <p className="text-sm text-muted-foreground">
              {businessInfo.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
