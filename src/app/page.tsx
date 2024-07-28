import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getHotels } from "./api/hotels/route";
import Pagination from "@/components/Pagination";
import Link from "next/link";

type SearchParams = {
  page: string;
};

type PageProps = {
  searchParams: SearchParams;
};

const LIMIT = 10;

export default async function Home({ searchParams }: PageProps) {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const currentPage = searchParams.page ?? "1";

  const { data, total, per_page } = await getHotels(currentPage, LIMIT);

  return (
    <div>
      <section className="grid grid-cols-1 gap-4 px-10 py-10 sm:grid-cols-2 sm:px-20 md:grid-cols-3 lg:grid-cols-4 xl:px-48 mt-20">
        {data.map((hotel) => {
          return (
            <Link href={`/hotel/${hotel.id}`} key={hotel.id}>
              <article className="flex flex-col">
                <div className="w-full h-48 sm:w-48">
                  <Image
                    src={hotel.image ? hotel.image : "/no-hotel.jpg"}
                    width={250}
                    height={250}
                    alt={`Foto do hotel ${hotel.name}`}
                    className="w-full h-48 sm:w-48 object-cover rounded-3xl"
                  />
                </div>

                <span className="font-bold mt-2">{hotel.name}</span>
                <span className="mt-2">{hotel.owner.name}</span>
                <span className="mt-2">{hotel.price}</span>
              </article>
            </Link>
          );
        })}
      </section>
      <section className="flex justify-center mt-4 mb-8">
        <Pagination
          currentPage={Number(currentPage)}
          destination="/"
          totalPages={Math.ceil(total / per_page)}
        />
      </section>
    </div>
  );
}
