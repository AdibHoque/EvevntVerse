import {Button} from "@/components/ui/button";
import Collection from "@/components/ui/shared/Collection";
import {getEventsByUser} from "@/lib/actions/event.actions";
import {auth} from "@clerk/nextjs/server";
import Link from "next/link";

export default async function ProfilePage() {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({userId, page: 1});

  return (
    <>
      <section className="bg-primary-50 dark:bg-black/15 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="flex wrapper items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button size="lg" asChild className="button hidden sm:flex">
            <Link href="/#events">Explore More</Link>
          </Button>
        </div>
      </section>

      {/* <section className="wrapper my-8">
        <Collection
          data={events?.data}
          emptyTitle="No Event tickets purcahsed yet"
          emptyStateSubtext="No worries - Discover & purchase events from plenty of options"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section> */}

      <section className="bg-primary-50 dark:bg-black/15 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="flex wrapper items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button size="lg" asChild className="button hidden sm:flex">
            <Link href="/events/create">Create Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No Event have been organized yet"
          emptyStateSubtext="You can create one anytime you want"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section>
    </>
  );
}