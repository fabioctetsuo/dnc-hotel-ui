import { getHotelDetail } from "@/app/api/hotels/action";
import DetailPage from "@/components/DetailPage";
import { getFormattedPrice } from "@/helpers/format/money";
import Image from "next/image";
import HotelBookingForm from "./HotelBookingForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DetailPageProps } from "@/types/DetailPage";

const HotelDetail = async ({ params }: DetailPageProps) => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const hotel = await getHotelDetail(Number(params.id));

  return (
    <DetailPage
      previousPage="/"
      title={hotel.name}
      image={{
        src: hotel.image ?? "/no-hotel.jpg",
        alt: `Foto do hotel ${hotel.name}`,
      }}
      asideContainer={{
        title: <>{getFormattedPrice(hotel.price)}&nbsp;noite</>,
        children: <HotelBookingForm hotel={hotel} />,
      }}
    >
      <div className="mt-4 flex">
        <Image
          src={hotel.owner.avatar ?? "/default-profile.jpg"}
          alt={`Foto do anfitrão ${hotel.owner.name}`}
          width={56}
          height={56}
          className="rounded-full w-14 h-14 object-cover"
        />
        <div className="flex flex-col ml-2 justify-center">
          <b>Anfitriã(o): {hotel.owner.name}</b>
          <span className="font-medium">
            Desde {new Date(hotel.owner.createdAt).getFullYear()}
          </span>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-2xl">Endereço</h3>
        <span className="mt-4">{hotel.address}</span>
      </div>
      <div className="mt-4 flex flex-col">
        <h3 className="font-bold text-2xl">Sobre este espaço</h3>
        <span className="mt-4">{hotel.description}</span>
      </div>
    </DetailPage>
  );
};

export default HotelDetail;
