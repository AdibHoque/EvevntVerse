import {Button} from "@/components/ui/button";
import BannerSkeleton from "@/components/ui/shared/BannerSkeleton";
import CategoryFilter from "@/components/ui/shared/CategoryFilter";
import Collection from "@/components/ui/shared/Collection";
import Search from "@/components/ui/shared/Search";
import {getAllEvents} from "@/lib/actions/event.actions";
import {SearchParams} from "@/types";
import Image from "next/image";
import Link from "next/link";
import {Suspense} from "react";

export default async function Home(props: {searchParams: SearchParams}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const query = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: query,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section
        id="hero"
        className="bg-dotted-pattern bg-primary-50 dark:bg-black/15 bg-contain py-5 md:py-10"
      >
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 justify-between 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold text-primary">
              Create & Connect: Your Event, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Host events or grab tickets to exclusive events, all in one place.
              Your go-to platform for events and unforgettable experiences.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Suspense fallback={<BannerSkeleton />}>
            <Image
              src="/assets/images/hero.png"
              alt="hero"
              width={1200}
              height={1000}
              className="max-h-[80vh] object-cover md:object-contain object-center lg:object-right 2xl:max-h-[50vh]"
            />
          </Suspense>
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trusted by<br></br>Thousands of Events
        </h2>

        <div className="flex flex-col w-full gap-5 md:flex-row">
          <Search placeholder="Search Event..." />
          <CategoryFilter />
        </div>
        <Collection
          data={events?.data}
          emptyTitle="No Event Found"
          emptyStateSubtext="Unable to fetch any Events"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
