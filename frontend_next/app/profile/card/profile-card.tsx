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
  Phone,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Profile = {
  first_name: string;
  last_name: string;
  sur_name: string;
  job_title: string;
  phone: string;
  email: string;
  extra_first_name: string;
  extra_last_name: string;
  extra_sur_name: string;
  extra_job_title: string;
  extra_email: string;
  extra_phone: string;
};

type Membership = {
  name: string;
  short_name: string;
  description: string;
  active: boolean;
  rating: number;
  country: string;
  type: string;
  org_type: string;
  city: string;
  ein: number;
  address: string;
  fact_address: string;
  email: string;
  web_site: string;
  vat: boolean;
};

type ProfileInfo = {
  data: {
    profile_data: Profile;
    membership_data: Membership;
  };
};

const defaultProfileInfo: ProfileInfo = {
  data: {
    profile_data: {
      first_name: "",
      last_name: "",
      sur_name: "",
      job_title: "",
      phone: "",
      email: "",
      extra_first_name: "",
      extra_last_name: "",
      extra_sur_name: "",
      extra_job_title: "",
      extra_email: "",
      extra_phone: "",
    },
    membership_data: {
      name: "",
      short_name: "",
      description: "",
      active: false,
      rating: 0,
      country: "",
      type: "",
      org_type: "",
      city: "",
      ein: 0,
      address: "",
      fact_address: "",
      email: "",
      web_site: "",
      vat: false,
    },
  },
};

type InfoItemProps = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string | number;
};
const ProfileCard = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const profile_info: ProfileInfo =
    queryClient.getQueryData(["profile_info"]) || defaultProfileInfo;

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

  const user = {
    name:
      values?.profile?.last_name +
      " " +
      values?.profile?.first_name +
      " " +
      values?.profile?.sur_name,
    email: values?.profile?.email,
    phone: values?.profile?.phone,
    occupation: values?.profile?.job_title,
  };

  const businessInfo = {
    name: values?.business?.name ?? "",
    short_name: values?.business?.short_name ?? "",
    description: values?.business?.description ?? "",
    active: values?.business?.active ?? false,
    rating: values?.business?.rating ?? 0,
    country: values?.business?.country ?? "",
    type: values?.business?.type ?? "",
    org_type: values?.business?.org_type ?? "",
    city: values?.business?.city ?? "",
    ein: values?.business?.ein ?? 0,
    address: values?.business?.address ?? "",
    fact_address: values?.business?.fact_address ?? "",
    email: values?.business?.email ?? "",
    web_site: values?.business?.web_site ?? "",
    vat: values?.business?.vat ?? false,
  };

  const InfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
    value: string | number | boolean | undefined;
  }) => (
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
            <Button
              onClick={() => router.push("/sign-up")}
              variant="outline"
              size="sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              Редактировать
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem icon={Mail} label="Email" value={user.email} />
            <InfoItem icon={Phone} label="номер Телефона" value={user.phone} />
            <InfoItem
              icon={Briefcase}
              label="Должность"
              value={user.occupation}
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
              value={`${businessInfo.city ?? ""} ${businessInfo.country}`}
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
              label="Плательщик НДС"
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
            <InfoItem
              icon={MapPin}
              label="Фактический адрес"
              value={businessInfo.fact_address}
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
